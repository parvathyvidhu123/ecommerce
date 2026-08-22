import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

reels = [
    ('reel_1', 'DZe-8VHy_Ef'),
    ('reel_2', 'DbN15AgS_Ny'),
    ('reel_3', 'DbIxpCbh1JV'),
    ('reel_4', 'DZhG4JTyB33')
]

for name, code in reels:
    embed_url = f'https://www.instagram.com/reel/{code}/embed/'
    try:
        req = urllib.request.Request(embed_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8')
            # Look for EmbeddedMediaImage or img src
            match = re.search(r'class="EmbeddedMediaImage" src="([^"]+)"', html)
            if not match:
                match = re.search(r'<img[^>]+class="[^"]*EmbeddedMediaImage[^"]*"[^>]+src="([^"]+)"', html)
            if not match:
                match = re.search(r'src="(https://[^"]+cdninstagram\.com/[^"]+)"', html)
            
            if match:
                img_url = match.group(1).replace('&amp;', '&')
                print(f'{name} found image: {img_url[:60]}...')
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req, timeout=10) as img_resp:
                    with open(f'public/images/{name}_cover.jpg', 'wb') as f:
                        f.write(img_resp.read())
                print(f'Saved public/images/{name}_cover.jpg')
            else:
                print(f'{name}: no image found in embed html')
    except Exception as e:
        print(f'{name} error:', e)
