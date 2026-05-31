import re
from html.parser import HTMLParser

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Extract HTML part
html_start = html_content.find("<!DOCTYPE html>")
if html_start != -1:
    html_content = html_content[html_start:]

class SimpleHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_title = False
        self.headings = []
        self.current_tag = None
        self.current_attrs = {}
        self.classes = set()
        self.in_heading = False
        self.text_buffer = []

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        self.current_attrs = dict(attrs)
        
        # Track classes
        if 'class' in self.current_attrs:
            cls_val = self.current_attrs['class']
            for c in cls_val.split():
                if any(x in c for x in ['anim', 'grid', 'service', 'stagger', 'card', 'process']):
                    self.classes.add(c)
                    
        if tag == 'title':
            self.in_title = True
        elif tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.in_heading = True
            self.text_buffer = []

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.in_heading = False
            text = "".join(self.text_buffer).strip()
            self.headings.append((tag, text))
        self.current_tag = None

    def handle_data(self, data):
        if self.in_title:
            print("=== Page Title ===")
            print(data.strip())
        elif self.in_heading:
            self.text_buffer.append(data)

parser = SimpleHTMLParser()
parser.feed(html_content)

print("\n=== All Headings ===")
for tag, text in parser.headings:
    print(f"- [{tag.upper()}] {text}")

print(f"\nRelevant classes found: {sorted(list(parser.classes))}")
