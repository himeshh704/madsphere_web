import re

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

html_start = html.find("<!DOCTYPE html>")
if html_start != -1:
    html = html[html_start:]

# We'll use a simple HTML parser logic to find parent elements that have exactly 4 child elements of a certain type
# Since bs4 wasn't installed, let's write a regex-based or manual list search
# Let's search for classes and see their occurrence counts
classes = re.findall(r'class="([^"]+)"', html)
cls_counts = {}
for c_str in classes:
    for c in c_str.split():
        cls_counts[c] = cls_counts.get(c, 0) + 1

print("=== Class counts (top 30) ===")
for c, count in sorted(cls_counts.items(), key=lambda x: x[1], reverse=True)[:30]:
    print(f"- {c}: {count}")

# Let's print sections in html that have grid/cards/flex layouts
print("\n=== Searching for grids/cards layout ===")
# Look for structures that repeat 4 times or mention 'four' or have 4 divs
# Let's print out lines containing grid or list structures
lines = html.split('>')
grid_lines = [l for l in lines if 'grid' in l or 'card' in l]
print(f"Found {len(grid_lines)} elements with 'grid' or 'card' in tag definition.")
