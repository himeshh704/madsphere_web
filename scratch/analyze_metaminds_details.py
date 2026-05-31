import re
from html.parser import HTMLParser

file_path = r"C:\Users\choud\.gemini\antigravity-ide\brain\ab9bc799-44bf-41f7-b4a3-239d8a098c8f\.system_generated\steps\2048\content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Extract HTML part
html_start = html_content.find("<!DOCTYPE html>")
if html_start != -1:
    html_content = html_content[html_start:]

class DetailsParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags_stack = []
        self.interesting_elements = []
        self.collect_text = False
        self.text_buffer = []
        self.current_interest = None

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.tags_stack.append((tag, attrs_dict))

        # Check if this tag or any parent has an interesting class
        cls = attrs_dict.get('class', '')
        has_interest = any(x in cls for x in ['apple-grid', 'cards-sa', 'cards-wrapper-sa', 'feature_card-content', 'is-h-service'])
        
        if has_interest:
            self.current_interest = {
                'tag': tag,
                'attrs': attrs_dict,
                'text': [],
                'depth': len(self.tags_stack)
            }
            self.interesting_elements.append(self.current_interest)
            self.collect_text = True

    def handle_endtag(self, tag):
        if self.tags_stack:
            self.tags_stack.pop()

        if self.current_interest and len(self.tags_stack) < self.current_interest['depth']:
            # We exited the interesting element
            self.current_interest['full_text'] = " ".join(self.current_interest['text']).strip()
            self.current_interest = None
            self.collect_text = False

    def handle_data(self, data):
        if self.collect_text and self.current_interest:
            cleaned = data.strip()
            if cleaned:
                self.current_interest['text'].append(cleaned)

parser = DetailsParser()
parser.feed(html_content)

print(f"Found {len(parser.interesting_elements)} interesting elements.")
for idx, el in enumerate(parser.interesting_elements):
    print(f"\n[{idx}] Tag: {el['tag']}")
    print(f"Classes: {el['attrs'].get('class', '')}")
    text_preview = " ".join(el['text'])[:300]
    print(f"Text: {text_preview}...")
