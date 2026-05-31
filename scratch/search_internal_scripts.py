import re

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\1542\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find all script tags
scripts = re.findall(r'<script[^>]*>([\s\S]*?)</script>', content)

for i, script in enumerate(scripts):
    if any(k in script for k in ['circle', 'value', 'whoweare', 'core', 'scroll', 'animation']):
        print(f"--- Script {i} ---")
        print(script[:1000])
        print("------------------")
