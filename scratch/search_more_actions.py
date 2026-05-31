import urllib.request
import re

url = "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/js/webflow.schunk.33a084a00fbd7fdb.js"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        
    # Find all pattern actionTypeId or selectors containing circle-value
    print("Searching for selectors in actions...")
    matches = re.findall(r'\{[^}]*selector:"\.circle-value[^"]*"[^}]*\}', content)
    print("Found circle-value matches:", len(matches))
    for m in matches:
        print(m)
        
    print("\nSearching for other actions targeting circle classes...")
    matches_inner = re.findall(r'\{[^}]*selector:"\.inner-circle[^"]*"[^}]*\}', content)
    print("Found inner-circle matches:", len(matches_inner))
    for m in matches_inner:
        print(m)

    # Let's search for actions that have circle in their titles/names
    matches_names = re.findall(r'id:"a-\d+",title:"[^"]*circle[^"]*"', content)
    print("\nFound action list titles containing 'circle':")
    for m in matches_names:
        print(m)
        
except Exception as e:
    print("Error:", e)
