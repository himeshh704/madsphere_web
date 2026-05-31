import urllib.request
import re

url = "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/js/webflow.schunk.33a084a00fbd7fdb.js"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        
    target_id = "1282cd37-3f8e-c5c3-c737-accfee095151"
    matches = [m.start() for m in re.finditer(target_id, content)]
    print(f"Matches for ID '{target_id}': {len(matches)}")
    for idx in matches:
        start = max(0, idx - 200)
        end = min(len(content), idx + 2000)
        print("--- MATCH ---")
        print(content[start:end])
        print("-------------")
        
except Exception as e:
    print("Error:", e)
