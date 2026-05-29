import re

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\1542\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for "section-core-value" and grab its surrounding text (say, 5000 characters)
match = re.search(r'class="[^"]*section-core-value[^"]*"', content)
if match:
    idx = match.start()
    print("Found section-core-value at index:", idx)
    snippet = content[idx:idx+8000]
    print("--- HTML SNIPPET ---")
    print(snippet)
    print("--------------------")
else:
    print("Not found section-core-value")
