import re

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for blocks around the service headings
# We know the headings: Android App Development, iOS App Development, Flutter Mobile App Development
# Let's find tags like <h2> or <h3> containing them, and grab 1000 characters around them
keywords = ["Android App Development", "iOS App Development", "Flutter Mobile App Development"]

for kw in keywords:
    print(f"\n==================== SEARCH FOR: {kw} ====================")
    matches = [m.start() for m in re.finditer(kw, content)]
    for idx in matches:
        start = max(0, idx - 400)
        end = min(len(content), idx + 1000)
        snippet = content[start:end]
        print(snippet)
        print("-" * 50)
