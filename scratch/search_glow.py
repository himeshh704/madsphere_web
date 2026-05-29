import re

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Search for card_glow_border function definition or references
pattern = re.compile(r'function\s+card_glow_border.*?<\/script>', re.DOTALL | re.IGNORECASE)
matches = list(pattern.finditer(html))

print(f"Found {len(matches)} matches for card_glow_border definition.")
for idx, m in enumerate(matches):
    print(f"\n--- MATCH {idx} ---")
    print(m.group(0)[:1500])

if not matches:
    # Just search for card_glow_border and print around it
    pattern2 = re.compile(r'card_glow_border', re.IGNORECASE)
    matches2 = list(pattern2.finditer(html))
    print(f"Found {len(matches2)} mentions of 'card_glow_border'.")
    for idx, m in enumerate(matches2):
        start = max(0, m.start() - 1000)
        end = min(len(html), m.end() + 2000)
        print(f"\n--- MENTION {idx} ---")
        print(html[start:end])
