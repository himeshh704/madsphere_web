import urllib.request
import re

url = "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/css/metaminds-app-1-f263b6f12-051238f702a6a.webflow.shared.c13318ecb.min.css"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

try:
    print("Downloading CSS...")
    with urllib.request.urlopen(req) as response:
        css = response.read().decode('utf-8')
    print("Downloaded successfully. Parsing...")

    classes = [
        'glowing-component-2', 'div-block-428', 'ios-div', 'feature_card-content',
        'apple-grid', 'cards-sa', 'div-block-429', 'steathy-fit', 'sentra-world'
    ]

    for cls in classes:
        # Search for .classname in CSS
        matches = [m.start() for m in re.finditer(r'\.' + re.escape(cls), css)]
        print(f"\n==================== Matches for '{cls}': {len(matches)} ====================")
        for idx in matches[:5]:
            start = max(0, idx - 50)
            end = min(len(css), idx + 250)
            print(css[start:end])
            print("-" * 30)

except Exception as e:
    print("Error:", e)
