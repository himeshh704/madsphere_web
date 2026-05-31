import re

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

print("File size:", len(content))

# Let's search for tags or headings
headings = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', content, re.IGNORECASE)
print(f"Found {len(headings)} headings:")
for h in headings[:30]:
    print("-", h[:100])

# Let's search for sections
sections = re.findall(r'class="[^"]*section[^"]*"', content)
print(f"Found {len(sections)} sections:")
for s in sections[:15]:
    print("-", s)
