import re

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\1542\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

print("File length:", len(content))

# Look for script tags
script_tags = re.findall(r'<script[^>]*>([\s\S]*?)</script>', content)
print("Internal scripts:", len(script_tags))

# Look for external scripts
external_scripts = re.findall(r'<script[^>]+src="([^"]+)"', content)
print("External scripts:")
for s in external_scripts:
    print(" -", s)
