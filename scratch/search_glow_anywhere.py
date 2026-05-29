import re

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

pattern = re.compile(r'glow-border', re.IGNORECASE)
matches = list(pattern.finditer(html))

print(f"Found {len(matches)} occurrences of 'glow-border' in the file.")
for idx, m in enumerate(matches):
    start = max(0, m.start() - 200)
    end = min(len(html), m.end() + 500)
    print(f"\n--- OCCURRENCE {idx} ---")
    print(html[start:end])
