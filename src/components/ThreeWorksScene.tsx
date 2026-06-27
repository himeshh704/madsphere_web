"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { works } from "@/data/site";

// Convert perspective height calculation (standard pixel Frustum mapping)
function getCameraZ(height: number) {
  // 45 degrees FOV frustum mapping
  return height / (2 * Math.tan((22.5 * Math.PI) / 180));
}

// Background snow/particle canvas component
function ParticleSnow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    let w = parent?.clientWidth || window.innerWidth;
    let h = parent?.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = parent?.clientWidth || window.innerWidth;
      h = parent?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    class Particle {
      x: number;
      y: number;
      radius: number;
      speed: number;
      wind: number;

      constructor(initRandomY = false) {
        this.x = Math.random() * w;
        this.y = initRandomY ? Math.random() * h : -(50 * Math.random());
        this.radius = Math.random() * 1.5 + 0.5; // size between 0.5 and 2
        this.speed = Math.random() * 0.2 + 0.1; // speed between 0.1 and 0.3
        this.wind = Math.random() * 0.6 - 0.3; // wind between -0.3 and 0.3
      }

      update() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > h + this.radius) {
          this.y = -this.radius - 10 * Math.random();
          this.x = Math.random() * w;
        }
        if (this.x > w + this.radius) {
          this.x = -this.radius;
        } else if (this.x < -this.radius) {
          this.x = w + this.radius;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ede9e8";
        ctx.fill();
        ctx.closePath();
      }
    }

    const particles = Array.from({ length: 120 }, () => new Particle(true));

    let frameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      frameId = window.requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

// Shader definitions
const cardVertexShader = `
  uniform float uBendThreshold;
  uniform float uBendRadius;
  uniform float uCardCenterY;
  uniform float uTime;

  varying vec2 vUv;
  varying float vFade;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // === Wave animation ===
    float waveFreqY = 0.012;
    float waveFreqX = 0.008;
    float waveSpeed = 0.8;
    float waveUnit = sin(pos.y * waveFreqY + pos.x * waveFreqX * 0.5 + uTime * waveSpeed);

    float worldY = pos.y + uCardCenterY;

    if (worldY > uBendThreshold) {
      float dist = worldY - uBendThreshold;
      float totalAngle = dist / uBendRadius;

      float seg1Max = 2.09;
      float straightLen = 0.95;
      float seg2Start = seg1Max + straightLen;
      float seg3Radius = uBendRadius * 0.6;

      float finalY, finalZ;
      float nY, nZ; // surface normal direction

      if (totalAngle <= seg1Max) {
        finalY = uBendThreshold + sin(totalAngle) * uBendRadius;
        finalZ = -(1.0 - cos(totalAngle)) * uBendRadius;
        nY = sin(totalAngle);
        nZ = cos(totalAngle);
      } else if (totalAngle <= seg2Start) {
        float s1EndY = uBendThreshold + sin(seg1Max) * uBendRadius;
        float s1EndZ = -(1.0 - cos(seg1Max)) * uBendRadius;
        float tanY = cos(seg1Max);
        float tanZ = -sin(seg1Max);
        float t = (totalAngle - seg1Max) * uBendRadius;
        finalY = s1EndY + tanY * t;
        finalZ = s1EndZ + tanZ * t;
        nY = sin(seg1Max);
        nZ = cos(seg1Max);
      } else {
        float s1EndY = uBendThreshold + sin(seg1Max) * uBendRadius;
        float s1EndZ = -(1.0 - cos(seg1Max)) * uBendRadius;
        float tanY = cos(seg1Max);
        float tanZ = -sin(seg1Max);
        float straightDist = straightLen * uBendRadius;
        float s2EndY = s1EndY + tanY * straightDist;
        float s2EndZ = s1EndZ + tanZ * straightDist;

        float seg3Angle = totalAngle - seg2Start;
        seg3Angle = min(seg3Angle, 2.5);

        float normY = sin(seg1Max);
        float normZ = cos(seg1Max);
        float centerY = s2EndY + normY * seg3Radius;
        float centerZ = s2EndZ - normZ * seg3Radius;

        float startArcAngle = atan(-normY, normZ);
        float curArcAngle = startArcAngle + seg3Angle;

        finalY = centerY + cos(curArcAngle) * seg3Radius;
        finalZ = centerZ + sin(curArcAngle) * seg3Radius;
        nY = -cos(curArcAngle);
        nZ = -sin(curArcAngle);
      }

      // Wave amplitude increases as cards curve backward
      float waveAmp = mix(10.0, 36.0, smoothstep(0.0, 1.5, totalAngle));
      float waveVal = waveUnit * waveAmp;
      finalY += nY * waveVal;
      finalZ += nZ * waveVal;

      pos.y = finalY - uCardCenterY;
      pos.z = finalZ;

      vFade = 1.0 - smoothstep(1.8, 5.0, totalAngle);
    } else {
      // Flat cards: very subtle wave
      pos.z += waveUnit * 3.0;
      vFade = 1.0;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const cardFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTransitionOpacity;
  varying vec2 vUv;
  varying float vFade;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    float a = tex.a * vFade * uTransitionOpacity;
    if (a < 0.005) discard;
    gl_FragColor = vec4(tex.rgb, a);
  }
`;

const archVertexShader = `
  uniform float uMobileBend;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vViewZ;

  void main() {
    vec3 pos = position;
    vNormal = normalize(normalMatrix * normal);
    
    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    
    if (uMobileBend > 0.0) {
      float zDepth = 300.0 - worldPosition.z;
      if (zDepth > 0.0) {
        float bendOffset = uMobileBend * pow(zDepth * 0.004, 2.0);
        if (worldPosition.x > 0.0) {
          worldPosition.x -= bendOffset;
        } else {
          worldPosition.x += bendOffset;
        }
      }
    }

    vWorldPos = worldPosition.xyz;
    vec4 mvPosition = viewMatrix * worldPosition;
    vViewZ = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const archFragmentShader = `
  uniform vec3 uColor;
  uniform float uFogDensity;
  uniform vec3 uFogColor;
  uniform vec3 uCameraPos;
  uniform vec3 uShineColor;
  uniform float uShineStrength;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vViewZ;

  void main() {
    vec3 N = normalize(vNormal);

    // Primary light from top
    vec3 topLight = normalize(vec3(-0.5, 0.8, 1.0));
    float diff = max(dot(N, topLight), 0.0);
    float ambient = 0.75;
    float light = ambient + diff * 0.25;
    vec3 col = uColor * light;

    // Floor bounce underside shine
    vec3 floorLight = normalize(vec3(0.0, -1.0, 0.3));
    float undersideFacing = max(dot(N, floorLight), 0.0);
    float floorDiff = pow(undersideFacing, 1.5);

    // Specular highlight on curve
    vec3 viewDir = normalize(uCameraPos - vWorldPos);
    vec3 floorReflect = reflect(floorLight, N);
    float spec = pow(max(dot(floorReflect, viewDir), 0.0), 24.0);

    float shine = floorDiff * 0.6 + spec * 1.4;

    float depthAtten = clamp(1.0 - vViewZ * 0.00015, 0.0, 1.0);
    shine *= depthAtten;

    col += uShineColor * shine * uShineStrength;

    // Fog
    float fogFactor = exp2(-uFogDensity * uFogDensity * vViewZ * vViewZ * 1.442695);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    vec3 finalCol = mix(uFogColor, col, fogFactor);

    gl_FragColor = vec4(finalCol, 1.0);
    gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0 / 2.2));
  }
`;

// Helper to draw text and border inside dynamic 2D canvas texture
function createCardTexture(
  imgEl: HTMLImageElement | null,
  title: string,
  category: string,
  width: number,
  height: number,
  labelFrac: number,
  cardWidth: number
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const imgHeight = Math.round(height * (1 - labelFrac));
  const labelHeight = height - imgHeight;

  // Draw image
  if (imgEl) {
    const imgAspect = imgEl.width / imgEl.height;
    const canvasAspect = width / imgHeight;
    let sx = 0, sy = 0, sw = imgEl.width, sh = imgEl.height;

    if (imgAspect > canvasAspect) {
      sw = imgEl.height * canvasAspect;
      sx = (imgEl.width - sw) / 2;
    } else {
      sh = imgEl.width / canvasAspect;
      sy = (imgEl.height - sh) / 2;
    }
    ctx.drawImage(imgEl, sx, sy, sw, sh, 0, 0, width, imgHeight);
  } else {
    // Fallback gradient
    const grad = ctx.createLinearGradient(0, 0, width, imgHeight);
    grad.addColorStop(0, "#111");
    grad.addColorStop(0.5, "#222");
    grad.addColorStop(1, "#333");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, imgHeight);
  }

  // Draw vignette overlay
  const vig = ctx.createRadialGradient(width / 2, imgHeight / 2, width * 0.2, width / 2, imgHeight / 2, width * 0.8);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.25)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, width, imgHeight);

  // Label section Y center
  const labelY = imgHeight + 0.5 * labelHeight;

  // Draw white background for text section (to make it pop and look like high-end cards)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, imgHeight, width, labelHeight);

  // Text formatting
  ctx.fillStyle = "#111111";
  ctx.font = `700 ${Math.round((1024 / cardWidth) * 22)}px "Outfit", system-ui, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText(title.toUpperCase(), 30, labelY);

  ctx.fillStyle = "#333333";
  ctx.font = `300 ${Math.round(labelHeight * 0.4)}px system-ui, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "right";
  ctx.fillText("↗", width - 30, labelY);

  // Border between image and label
  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, imgHeight - 1);
  ctx.lineTo(width, imgHeight - 1);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

interface CardItem {
  mesh: THREE.Mesh;
  baseY: number;
  w: number;
  h: number;
}

interface ArchItem {
  mesh: THREE.Group;
  material: THREE.ShaderMaterial;
  baseY: number;
}

interface SceneState {
  scArches: THREE.Scene;
  scCards: THREE.Scene;
  cam: THREE.PerspectiveCamera;
  renArches: THREE.WebGLRenderer;
  renCards: THREE.WebGLRenderer;
  cards: CardItem[];
  arches: ArchItem[];
  scrollT: number;
  scrollC: number;
  maxScroll: number;
  vw: number;
  vh: number;
  raf: number;
}

interface ThreeWorksSceneProps {
  revealed: boolean;
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onShowLightbox: (img: string) => void;
}

export default function ThreeWorksScene({ revealed, selectedProjectId, onSelectProject, onShowLightbox }: ThreeWorksSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const archesCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardsCanvasRef = useRef<HTMLCanvasElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Keep a ref of selectedProjectId for access in resize handler without re-creating event listeners
  const selectedProjectIdRef = useRef(selectedProjectId);
  useEffect(() => {
    selectedProjectIdRef.current = selectedProjectId;
  }, [selectedProjectId]);

  // Layout sizing calculations
  const calculateLayout = useCallback((width: number, height: number, activeCount: number) => {
    const pad = width >= 1024 ? 0.055 * width : 0.045 * width;
    const gap = width >= 1024 ? 0.022 * width : 0.04 * width;
    const cardW = width >= 768 ? (width >= 1024 ? width / 2 - 2 * pad : width / 1.5 - 2 * pad) : width - 2 * pad;
    const cardH = (0.6 * cardW) / 0.86;
    const verticalGap = 1.2 * gap;
    const numCards = activeCount;

    const startYOffset = width >= 768 ? 0.1 * height : 0.2 * height;
    const startY = startYOffset - cardH / 2;

    const positions: { x: number; y: number }[] = [];
    for (let idx = 0; idx < numCards; idx++) {
      positions.push({ x: 0, y: startY - idx * (cardH + verticalGap) });
    }

    const maxScroll = Math.max(0, startYOffset - (startY - (numCards - 1) * (cardH + verticalGap) - cardH / 2) - 0.15 * height);

    return {
      pad,
      gap,
      cW: cardW,
      cH: cardH,
      lblFrac: 0.14,
      verticalGap,
      positions,
      maxScroll,
    };
  }, []);

  // Compute active items list for React rendering
  const activeItems = selectedProjectId
    ? (works.find((w) => w.id === selectedProjectId)?.items || []).map((item, idx) => ({
        ...item,
        id: `${selectedProjectId}-sub-${idx}`,
      }))
    : works;

  const onProjectChangeRef = useRef<((id: string | null) => void) | null>(null);

  useEffect(() => {
    if (onProjectChangeRef.current) {
      onProjectChangeRef.current(selectedProjectId);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    const container = containerRef.current;
    const archesCanvas = archesCanvasRef.current;
    const cardsCanvas = cardsCanvasRef.current;
    if (!container || !archesCanvas || !cardsCanvas) return;

    let vw = container.clientWidth;
    let vh = container.clientHeight;

    let state: SceneState;

    // Renderer 1 (Arches - Solid background pass)
    const renArches = new THREE.WebGLRenderer({
      canvas: archesCanvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
      precision: "highp",
    });
    renArches.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renArches.setSize(vw, vh);
    renArches.setClearColor(0xffffff, 1);

    // Renderer 2 (Cards - Transparent overlays pass)
    const renCards = new THREE.WebGLRenderer({
      canvas: cardsCanvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      precision: "highp",
    });
    renCards.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renCards.setSize(vw, vh);
    renCards.setClearColor(0x000000, 0);

    const cameraZ = getCameraZ(vh);
    const camera = new THREE.PerspectiveCamera(45, vw / vh, 1, cameraZ * 3);
    camera.position.set(0, 0, cameraZ);

    const scArches = new THREE.Scene();
    const scCards = new THREE.Scene();

    scArches.background = new THREE.Color(0xffffff);

    // Initial card setup
    const initialCount = selectedProjectIdRef.current
      ? (works.find((w) => w.id === selectedProjectIdRef.current)?.items || []).length
      : works.length;
    let layout = calculateLayout(vw, vh, initialCount);

    const cardList: CardItem[] = [];

    // Bending Threshold and Radius
    const bendThreshold = vw >= 768 ? (vw >= 1024 ? 0.15 * vh : 0.05 * vh) : 0.2 * vh;
    const bendRadius = vw >= 768 ? (vw >= 1024 ? 0.22 * vh : 0.18 * vh) : 0.1 * vh;

    // Define helper to load a list of items
    const loadCards = (items: any[]) => {
      // 1. Clean up existing cards
      cardList.forEach((c) => {
        scCards.remove(c.mesh);
        c.mesh.geometry.dispose();

        // Dispose texture to prevent GPU VRAM memory leaks
        const mat = c.mesh.material as THREE.ShaderMaterial;
        if (mat.uniforms && mat.uniforms.uTexture && mat.uniforms.uTexture.value) {
          mat.uniforms.uTexture.value.dispose();
        }

        if (Array.isArray(c.mesh.material)) {
          c.mesh.material.forEach((m) => m.dispose());
        } else {
          c.mesh.material.dispose();
        }
      });
      cardList.length = 0;

      // 2. Re-calculate layout based on the new count
      const activeCount = items.length;
      const currentLayout = calculateLayout(vw, vh, activeCount);
      layout = currentLayout;

      if (state) {
        state.maxScroll = currentLayout.maxScroll;
        state.scrollT = 0;
        state.scrollC = 0;
      }

      // 3. Create plane meshes
      items.forEach((item, idx) => {
        const pos = currentLayout.positions[idx];
        const geom = new THREE.PlaneGeometry(currentLayout.cW, currentLayout.cH, 30, 150);
        const mat = new THREE.ShaderMaterial({
          vertexShader: cardVertexShader,
          fragmentShader: cardFragmentShader,
          uniforms: {
            uTexture: { value: new THREE.Texture() },
            uTransitionOpacity: { value: 1.0 },
            uBendThreshold: { value: bendThreshold },
            uBendRadius: { value: bendRadius },
            uCardCenterY: { value: pos.y },
            uTime: { value: 0 },
          },
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: true,
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.renderOrder = idx;
        mesh.position.set(pos.x, pos.y, 0);
        scCards.add(mesh);

        cardList.push({
          mesh,
          baseY: pos.y,
          w: currentLayout.cW,
          h: currentLayout.cH,
        });

        // Load image
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          mat.uniforms.uTexture.value = createCardTexture(
            img,
            item.title,
            item.tags || "",
            1024,
            Math.round((1024 * currentLayout.cH) / currentLayout.cW),
            currentLayout.lblFrac,
            currentLayout.cW
          );
        };
        img.onerror = () => {
          mat.uniforms.uTexture.value = createCardTexture(
            null,
            item.title,
            item.tags || "",
            1024,
            Math.round((1024 * currentLayout.cH) / currentLayout.cW),
            currentLayout.lblFrac,
            currentLayout.cW
          );
        };
        img.src = item.img;
      });
    };

    // Load initial items
    const initialItems = selectedProjectIdRef.current
      ? (works.find((w) => w.id === selectedProjectIdRef.current)?.items || [])
      : works;
    loadCards(initialItems);

    // Arches Setup
    const archesList: ArchItem[] = [];
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/arch-dc.glb",
      (gltf) => {
        const sceneObj = gltf.scene;
        const box = new THREE.Box3().setFromObject(sceneObj);
        const size = new THREE.Vector3();
        box.getSize(size);

        // Scale arches based on view height
        const scaleVal = (vw >= 768 ? (vw >= 1024 ? 3.5 * vh : 2 * vh) : vh) / size.y;

        const archMat = new THREE.ShaderMaterial({
          vertexShader: archVertexShader,
          fragmentShader: archFragmentShader,
          uniforms: {
            uColor: { value: new THREE.Color(0xf6f6f6) }, // Soft museum-white color
            uFogColor: { value: new THREE.Color(0xffffff) },
            uFogDensity: vw >= 768 ? { value: 0.00065 } : { value: 0.001 },
            uCameraPos: { value: camera.position },
            uShineColor: { value: new THREE.Color(0xffdf00) }, // Golden reflection
            uShineStrength: { value: 1.6 },
            uMobileBend: { value: vw < 768 ? 50.0 : 0.0 },
          },
          side: THREE.DoubleSide,
          depthWrite: true,
        });

        const archCount = vw >= 768 ? 6 : 3;
        const stepDist = vw >= 768 ? (vw >= 1024 ? 0.479 * cameraZ : (0.479 * cameraZ) / 1.8) : (0.479 * cameraZ) / 3.495;

        for (let i = 0; i < archCount; i++) {
          const depthZ = 0.25 * cameraZ - i * stepDist * 1.4 - 100;
          const clone = sceneObj.clone();
          clone.scale.set(scaleVal, 3 * scaleVal, scaleVal);
          clone.traverse((node) => {
            if ((node as THREE.Mesh).isMesh) {
              (node as THREE.Mesh).material = archMat;
            }
          });

          // Offset the arch hallways slightly to the side to frame the center cards nicely
          clone.position.set(7.5, 0, depthZ);
          clone.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
          scArches.add(clone);

          archesList.push({
            mesh: clone,
            material: archMat,
            baseY: 0,
          });
        }
      },
      undefined,
      (err) => {
        console.error("Error loading GLTF arch model:", err);
      }
    );

    state = {
      scArches,
      scCards,
      cam: camera,
      renArches,
      renCards,
      cards: cardList,
      arches: archesList,
      scrollT: 0,
      scrollC: 0,
      maxScroll: layout.maxScroll,
      vw,
      vh,
      raf: 0,
    };

    // Define transition logic when project id changes
    const onProjectChange = (id: string | null) => {
      const targetItems = id
        ? (works.find((w) => w.id === id)?.items || [])
        : works;

      const duration = 250; // ms
      const startTime = performance.now();

      const fadeOutTick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);

        cardList.forEach((c) => {
          if (c.mesh.material && (c.mesh.material as THREE.ShaderMaterial).uniforms.uTransitionOpacity) {
            (c.mesh.material as THREE.ShaderMaterial).uniforms.uTransitionOpacity.value = 1.0 - t;
          }
        });

        if (t < 1) {
          requestAnimationFrame(fadeOutTick);
        } else {
          // Clear and recreate cards
          loadCards(targetItems);

          // Animate Fade In
          const startInTime = performance.now();
          const fadeInTick = (nowIn: number) => {
            const elapsedIn = nowIn - startInTime;
            const tIn = Math.min(1, elapsedIn / duration);

            cardList.forEach((c) => {
              if (c.mesh.material && (c.mesh.material as THREE.ShaderMaterial).uniforms.uTransitionOpacity) {
                (c.mesh.material as THREE.ShaderMaterial).uniforms.uTransitionOpacity.value = tIn;
              }
            });

            if (tIn < 1) {
              requestAnimationFrame(fadeInTick);
            }
          };
          requestAnimationFrame(fadeInTick);
        }
      };
      requestAnimationFrame(fadeOutTick);
    };

    onProjectChangeRef.current = onProjectChange;

    // Camera interactive panning variables
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -((e.clientY / window.innerHeight) * 2) + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Scroll handlers
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      state.scrollT = Math.max(0, Math.min(state.scrollT + 1.1 * e.deltaY, state.maxScroll));
    };
    container.addEventListener("wheel", onWheel, { passive: false });

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dist = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      state.scrollT = Math.max(0, Math.min(state.scrollT + 1.8 * dist, state.maxScroll));
    };
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    // Render loop
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth scroll inertia
      state.scrollC += (state.scrollT - state.scrollC) * 0.075;

      // Mouse interactive lookAt
      const lookX = 0.08 * state.vw;
      const lookY = 0.08 * state.vh;
      camera.position.x += (mouseX * lookX - camera.position.x) * 0.05;
      camera.position.y += (mouseY * lookY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Render cards & map coordinates to 2D CSS anchors
      state.cards.forEach((card, idx) => {
        const curY = card.baseY + state.scrollC;
        card.mesh.position.y = curY;
        (card.mesh.material as THREE.ShaderMaterial).uniforms.uCardCenterY.value = curY;
        (card.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = elapsed;

        // Visibility frustum check
        card.mesh.visible = curY > -1.2 * state.vh && curY < 1.5 * state.vh;

        const anchor = linksRef.current[idx];
        if (anchor) {
          if (card.mesh.visible) {
            anchor.style.display = "block";

            // Project 3D cylinder deformation onto 2D CSS position
            const cardX = state.vw / 2 + card.mesh.position.x - card.w / 2;
            const threshold = bendThreshold;
            const radius = bendRadius;
            let displayY = curY;
            let bendScale = 1.0;

            if (curY > threshold) {
              const angle = (curY - threshold) / radius;
              displayY = threshold + Math.sin(angle) * radius;
              bendScale = Math.max(0.2, Math.cos(angle));

              if (angle > 1.8) {
                anchor.style.pointerEvents = "none";
              } else {
                anchor.style.pointerEvents = "auto";
              }
            } else {
              anchor.style.pointerEvents = "auto";
            }

            const scaleH = card.h * bendScale;
            const cardTop = state.vh / 2 - displayY - scaleH / 2;

            anchor.style.transform = `translate3d(${cardX}px, ${cardTop}px, 0)`;
            anchor.style.width = `${card.w}px`;
            anchor.style.height = `${scaleH}px`;
          } else {
            anchor.style.display = "none";
          }
        }
      });

      // Render passes
      renArches.render(scArches, camera);
      renCards.render(scCards, camera);

      state.raf = requestAnimationFrame(tick);
    };

    state.raf = requestAnimationFrame(tick);

    // Resize handler
    const onResize = () => {
      vw = container.clientWidth;
      vh = container.clientHeight;
      state.vw = vw;
      state.vh = vh;

      renArches.setSize(vw, vh);
      renCards.setSize(vw, vh);

      const zHeight = getCameraZ(vh);
      camera.aspect = vw / vh;
      camera.position.z = zHeight;
      camera.far = 3 * zHeight;
      camera.updateProjectionMatrix();

      const activeCount = selectedProjectIdRef.current
        ? (works.find((w) => w.id === selectedProjectIdRef.current)?.items || []).length
        : works.length;

      const newLayout = calculateLayout(vw, vh, activeCount);
      layout = newLayout;
      state.maxScroll = newLayout.maxScroll;
      state.scrollT = Math.min(state.scrollT, state.maxScroll);

      const resizeThreshold = vw >= 768 ? (vw >= 1024 ? 0.15 * vh : 0.1 * vh) : 0.32 * vh;
      const resizeRadius = vw >= 768 ? (vw >= 1024 ? 0.22 * vh : 0.18 * vh) : 0.1 * vh;
      const resizeMobileBend = vw < 768 ? 50.0 : 0.0;

      state.arches.forEach((arch) => {
        arch.material.uniforms.uMobileBend.value = resizeMobileBend;
      });

      state.cards.forEach((card, idx) => {
        card.baseY = newLayout.positions[idx].y;
        card.w = newLayout.cW;
        card.h = newLayout.cH;
        card.mesh.position.x = newLayout.positions[idx].x;
        card.mesh.geometry.dispose();
        card.mesh.geometry = new THREE.PlaneGeometry(newLayout.cW, newLayout.cH, 30, 150);
        (card.mesh.material as THREE.ShaderMaterial).uniforms.uBendThreshold.value = resizeThreshold;
        (card.mesh.material as THREE.ShaderMaterial).uniforms.uBendRadius.value = resizeRadius;
      });
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(state.raf);

      renArches.dispose();
      renCards.dispose();
      dracoLoader.dispose();
      state.cards.forEach((c) => {
        c.mesh.geometry.dispose();

        const mat = c.mesh.material as THREE.ShaderMaterial;
        if (mat.uniforms && mat.uniforms.uTexture && mat.uniforms.uTexture.value) {
          mat.uniforms.uTexture.value.dispose();
        }

        if (Array.isArray(c.mesh.material)) {
          c.mesh.material.forEach((m) => m.dispose());
        } else {
          c.mesh.material.dispose();
        }
      });
    };
  }, [calculateLayout]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Background arches (White fog scene) */}
      <canvas
        ref={archesCanvasRef}
        style={{
          display: "block",
          position: "absolute",
          zIndex: 0,
        }}
      />

      {/* Floating particles scene */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <ParticleSnow />
      </div>

      {/* Foreground cards (WebGL cards + DOM Links) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: revealed ? "translateY(0)" : "translateY(100vh)",
          opacity: revealed ? 1 : 0,
          transition: "transform 0.8s ease-out, opacity 0.9s ease",
        }}
      >
        {/* Transparent WebGL cards overlay */}
        <canvas
          ref={cardsCanvasRef}
          style={{
            display: "block",
            position: "absolute",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* CSS Overlay for actual clickable links */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {activeItems.map((item: any, idx) => (
            <a
              key={item.id || idx}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!selectedProjectId) {
                  onSelectProject(item.id);
                } else {
                  onShowLightbox(item.img);
                }
              }}
              ref={(el) => {
                if (el) {
                  linksRef.current[idx] = el;
                }
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "auto",
                cursor: "pointer",
                display: "none",
                willChange: "transform",
              }}
              aria-label={item.title}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
