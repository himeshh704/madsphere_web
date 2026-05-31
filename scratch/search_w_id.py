import re
from html.parser import HTMLParser

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Extract HTML part
html_start = html.find("<!DOCTYPE html>")
if html_start != -1:
    html = html[html_start:]

class WebflowParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.animated_elements = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if 'data-w-id' in attrs_dict:
            self.animated_elements.append((tag, attrs_dict))

parser = WebflowParser()
parser.feed(html)

print(f"Total elements with data-w-id: {len(parser.animated_elements)}")
for i, (tag, attrs) in enumerate(parser.animated_elements[:20]):
    print(f"\n[{i}] Tag: <{tag}>")
    print(f"Class: {attrs.get('class', 'N/A')}")
    print(f"data-w-id: {attrs['data-w-id']}")
    # Print a few other attributes if present
    for k, v in attrs.items():
        if k not in ['data-w-id', 'class', 'style']:
            print(f"  {k}: {v}")
