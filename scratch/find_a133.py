import urllib.request
import re

url = "https://cdn.prod.website-files.com/6968c40c3d0877f59b6c1749/js/webflow.schunk.33a084a00fbd7fdb.js"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        
    print("Downloaded JS chunk successfully")
    
    # We want to find '"a-133":{id:"a-133"'
    idx = content.find('"a-133":{id:"a-133"')
    if idx == -1:
        idx = content.find('a-133')
        
    if idx != -1:
        print("Found a-133 at index:", idx)
        print(content[idx-100:idx+3000])
    else:
        print("a-133 not found")
        
except Exception as e:
    print("Error:", e)
