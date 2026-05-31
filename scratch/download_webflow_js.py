import urllib.request
import re

urls = [
    "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/js/webflow.schunk.f2efb3c5440a81cf.js",
    "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/js/webflow.schunk.33a084a00fbd7fdb.js",
    "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/js/webflow.6e30800a.f1d0d98480a48e5c.js"
]

target_id = "1282cd37-3f8e-c5c3-c737-accfee095182"
headers = {'User-Agent': 'Mozilla/5.0'}

for url in urls:
    print(f"Scanning {url}...")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            content = response.read().decode('utf-8')
        print("  Size:", len(content))
        matches = [m.start() for m in re.finditer(target_id, content)]
        print(f"  Matches for ID '{target_id}': {len(matches)}")
        for idx in matches:
            start = max(0, idx - 200)
            end = min(len(content), idx + 2000)
            print("--- SNIPPET ---")
            print(content[start:end])
            print("---------------")
            
        # Also look for circle-value
        c_matches = [m.start() for m in re.finditer("circle-value", content)]
        print(f"  Matches for 'circle-value': {len(c_matches)}")
    except Exception as e:
        print("  Error:", e)
