import urllib.request
import re

url = "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/js/webflow.schunk.33a084a00fbd7fdb.js"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        
    print("Downloaded JS chunk successfully")
    
    # Search for actionList ID "a-131"
    queries = ['"a-131"']
    for q in queries:
        matches = [m.start() for m in re.finditer(q, content)]
        print(f"Matches for {q}: {len(matches)}")
        for idx in matches[:5]:
            start = max(0, idx - 500)
            end = min(len(content), idx + 2000)
            print(f"--- MATCH {q} ---")
            print(content[start:end])
            print("-----------------")
            
except Exception as e:
    print("Error:", e)
