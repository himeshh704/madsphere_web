import urllib.request
import re

url = "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/css/metaminds-app-1-f263b6f12-051238f702a6a.webflow.shared.c13318ecb.min.css"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        css = response.read().decode('utf-8')
        
    queries = ['text-circle', 'div-block-60', 'div-block-59', 'section-create']
    for q in queries:
        matches = [m.start() for m in re.finditer(q, css)]
        print(f"Matches for '{q}': {len(matches)}")
        for idx in matches[:5]:
            start = max(0, idx - 100)
            end = min(len(css), idx + 200)
            print(f"--- MATCH {q} ---")
            print(css[start:end])
            print("-----------------")
except Exception as e:
    print("Error:", e)
