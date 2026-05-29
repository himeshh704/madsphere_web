import re
from html.parser import HTMLParser

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Find occurrences of feature_card-content
pattern = re.compile(r'<div[^>]*class="[^"]*feature_card-content[^"]*"[^>]*>.*?</div>', re.DOTALL)
matches = pattern.finditer(html)

print("=== FOUND MATCHES FOR feature_card-content ===")
for i, m in enumerate(matches):
    start = max(0, m.start() - 200)
    end = min(len(html), m.end() + 200)
    print(f"\n--- MATCH {i} ---")
    print(html[start:end])
