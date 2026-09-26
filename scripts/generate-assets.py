# Generates the TrackBack-web image assets (logos, favicons, OG images).
# Run from the repository root: python scripts/generate-assets.py (requires Pillow).
# Sources live in design/, outputs go to public/. Fonts: Segoe UI (Windows).
from PIL import Image, ImageFilter, ImageDraw, ImageFont
import colorsys, os

SRC_LOGO = Image.open('design/trackback-logo-source.png').convert('RGBA')
SRC_FAV = Image.open('design/trackback-icon-source.png').convert('RGBA')
os.makedirs('public/images', exist_ok=True)

# ---------- 1. Logos ----------
logo = SRC_LOGO.crop(SRC_LOGO.getchannel('A').getbbox())


def brighten(img, amount=0.34, sat=0.96):
    px = img.load()
    out = img.copy()
    po = out.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
            l2 = l + (1 - l) * amount
            r2, g2, b2 = colorsys.hls_to_rgb(h, l2, min(1, s * sat))
            po[x, y] = (round(r2 * 255), round(g2 * 255), round(b2 * 255), a)
    return out


logo_dark = brighten(logo)
H2X = 72  # displayed at 36px high
w2x = round(logo.width * H2X / logo.height)
logo_dark.resize((w2x, H2X), Image.LANCZOS).save('public/images/trackback-logo-dark.webp', 'WEBP', quality=90, method=6)
lw = 600
lh = round(logo.height * lw / logo.width)
logo.resize((lw, lh), Image.LANCZOS).save('public/trackback_logo.png', optimize=True)
print('logo dark 2x:', (w2x, H2X), ' light:', (lw, lh))

# ---------- 2. Favicons ----------
icon = SRC_FAV.crop(SRC_FAV.getchannel('A').getbbox())


def square(img, pad_ratio, bg=(0, 0, 0, 0)):
    s = round(max(img.size) * (1 + 2 * pad_ratio))
    canvas = Image.new('RGBA', (s, s), bg)
    canvas.alpha_composite(img, ((s - img.width) // 2, (s - img.height) // 2))
    return canvas


sq = square(icon, 0.02)
sq.resize((512, 512), Image.LANCZOS).save('public/icon-512.png', optimize=True)
sq.resize((192, 192), Image.LANCZOS).save('public/icon-192.png', optimize=True)
sq.resize((40, 40), Image.LANCZOS).save('public/images/trackback-icon-40.webp', 'WEBP', quality=90, method=6)  # small UI icon
sq.resize((48, 48), Image.LANCZOS).save('public/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
apple = square(icon, 0.14, (255, 255, 255, 255)).resize((180, 180), Image.LANCZOS).convert('RGB')
apple.save('public/apple-touch-icon.png', optimize=True)
print('icons done')

# ---------- 3. OG images ----------
F_BOLD = 'C:/Windows/Fonts/segoeuib.ttf'
F_SEMI = 'C:/Windows/Fonts/seguisb.ttf'
F_REG = 'C:/Windows/Fonts/segoeui.ttf'
BG = (6, 10, 20)
INK = (238, 242, 249)
MUTED = (166, 178, 199)
BORDER = (29, 41, 64)
B300 = (110, 156, 255)
T300 = (63, 205, 222)
BRAND = (14, 93, 241)


def glow(base, center, radius, color, alpha):
    layer = Image.new('RGBA', base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x, y = center
    d.ellipse([x - radius, y - radius, x + radius, y + radius], fill=color + (alpha,))
    layer = layer.filter(ImageFilter.GaussianBlur(radius * 0.45))
    base.alpha_composite(layer)


def gradient_text(base, xy, text, font):
    x, y = xy
    bbox = font.getbbox(text)
    w, h = bbox[2], bbox[3]
    mask = Image.new('L', (w + 4, h + 8), 0)
    ImageDraw.Draw(mask).text((0, 0), text, font=font, fill=255)
    grad = Image.new('RGBA', mask.size)
    gd = ImageDraw.Draw(grad)
    for i in range(mask.width):
        t = i / max(1, mask.width - 1)
        c = tuple(round(B300[k] * (1 - t) + T300[k] * t) for k in range(3))
        gd.line([(i, 0), (i, mask.height)], fill=c + (255,))
    base.paste(grad, (x, y), mask)


def wrap(text, font, maxw):
    words = text.split()
    lines, cur = [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if font.getlength(t) <= maxw:
            cur = t
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


COPY = {
    'en': dict(
        h1a='Shopify returns', h1b='on autopilot.',
        sub='Branded EN/FR portal, exchanges, store credit, cash-on-delivery & mobile money refunds, EU withdrawal button.',
        chips=['Free plan', 'English & French', 'Shopify app'],
        store='Northwind Apparel', card_title='Return Center', q='How would you like to be refunded?',
        opts=[('Store credit', '$97.90 \u00b7 +10% bonus', True), ('Exchange', 'Size L \u00b7 in stock', False),
              ('Refund', 'Original payment \u00b7 $89.00', False)],
        cta='Continue'),
    'fr': dict(
        h1a='Les retours Shopify', h1b='en pilote automatique.',
        sub='Portail EN/FR \u00e0 votre marque, \u00e9changes, avoirs, remboursements \u00e0 la livraison et mobile money, bouton de r\u00e9tractation UE.',
        chips=['Plan gratuit', 'Fran\u00e7ais & anglais', 'App Shopify'],
        store='Northwind Apparel', card_title='Centre de retours', q='Comment souhaitez-vous \u00eatre rembours\u00e9 ?',
        opts=[('Avoir en boutique', '97,90 \u20ac \u00b7 +10 % offerts', True), ('\u00c9change', 'Taille L \u00b7 en stock', False),
              ('Remboursement', 'Moyen de paiement \u00b7 89,00 \u20ac', False)],
        cta='Continuer'),
}


def og(lang, path):
    T = COPY[lang]
    W, H = 1200, 630
    img = Image.new('RGBA', (W, H), BG + (255,))
    glow(img, (180, 90), 430, BRAND, 120)
    glow(img, (1080, 600), 420, (9, 151, 173), 105)
    d = ImageDraw.Draw(img)
    lg = logo_dark.resize((round(logo_dark.width * 54 / logo_dark.height), 54), Image.LANCZOS)
    img.alpha_composite(lg, (72, 64))
    f1 = ImageFont.truetype(F_BOLD, 62 if lang == 'en' else 54)
    maxw = 590
    y = 170
    for line in wrap(T['h1a'], f1, maxw):
        d.text((72, y), line, font=f1, fill=INK)
        y += int(f1.size * 1.14)
    for line in wrap(T['h1b'], f1, maxw):
        gradient_text(img, (72, y), line, f1)
        y += int(f1.size * 1.14)
    f2 = ImageFont.truetype(F_REG, 24)
    y += 22
    for line in wrap(T['sub'], f2, maxw):
        d.text((72, y), line, font=f2, fill=MUTED)
        y += 34
    fc = ImageFont.truetype(F_SEMI, 20)
    x, y = 72, H - 84
    for c in T['chips']:
        tw = fc.getlength(c)
        d.rounded_rectangle([x, y, x + tw + 36, y + 40], 20, fill=(12, 19, 34), outline=BORDER, width=2)
        d.ellipse([x + 14, y + 16, x + 22, y + 24], fill=T300)
        d.text((x + 28, y + 7), c, font=fc, fill=INK)
        x += tw + 50
    cx0, cy0, cx1, cy1 = 716, 92, 1128, 560
    shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle([cx0 + 6, cy0 + 18, cx1 + 6, cy1 + 22], 26, fill=(0, 0, 0, 170))
    img.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(18)))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([cx0, cy0, cx1, cy1], 24, fill=(255, 255, 255))
    ft = ImageFont.truetype(F_BOLD, 22)
    fs = ImageFont.truetype(F_REG, 16)
    fo = ImageFont.truetype(F_SEMI, 18)
    fo2 = ImageFont.truetype(F_REG, 15)
    d.text((cx0 + 26, cy0 + 22), T['store'], font=fs, fill=(107, 114, 133))
    d.text((cx0 + 26, cy0 + 44), T['card_title'], font=ft, fill=(16, 19, 28))
    sx = cx0 + 26
    sw = (cx1 - cx0 - 52 - 24) / 5
    for i in range(5):
        col = BRAND if i <= 3 else (221, 225, 236)
        d.rounded_rectangle([sx + i * (sw + 6), cy0 + 88, sx + i * (sw + 6) + sw, cy0 + 94], 3, fill=col)
    d.text((cx0 + 26, cy0 + 110), T['q'], font=fo, fill=(16, 19, 28))
    oy = cy0 + 146
    for title, sub, sel in T['opts']:
        d.rounded_rectangle([cx0 + 24, oy, cx1 - 24, oy + 62], 14, fill=(240, 245, 255) if sel else (255, 255, 255),
                            outline=BRAND if sel else (226, 229, 238), width=3 if sel else 2)
        d.ellipse([cx0 + 42, oy + 22, cx0 + 60, oy + 40], outline=BRAND if sel else (180, 186, 200), width=3)
        if sel:
            d.ellipse([cx0 + 47, oy + 27, cx0 + 55, oy + 35], fill=BRAND)
        d.text((cx0 + 74, oy + 10), title, font=fo, fill=(16, 19, 28))
        d.text((cx0 + 74, oy + 34), sub, font=fo2, fill=(91, 98, 117))
        oy += 74
    d.rounded_rectangle([cx0 + 24, cy1 - 64, cx1 - 24, cy1 - 20], 12, fill=BRAND)
    fb = ImageFont.truetype(F_SEMI, 18)
    tw = fb.getlength(T['cta'])
    d.text(((cx0 + cx1) / 2 - tw / 2, cy1 - 54), T['cta'], font=fb, fill=(255, 255, 255))
    img.convert('RGB').save(path, optimize=True)
    print(path, os.path.getsize(path) // 1024, 'KB')


og('en', 'public/og-image.png')
og('fr', 'public/og-image-fr.png')
for f in ['public/images/trackback-logo-dark.webp', 'public/trackback_logo.png', 'public/favicon.ico',
          'public/icon-192.png', 'public/icon-512.png', 'public/apple-touch-icon.png']:
    print(f, os.path.getsize(f), 'B')
