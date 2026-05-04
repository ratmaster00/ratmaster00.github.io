# AI Watermark Studio

Single-file HTML tool for adding AI watermarks to images.

## Setup

Open this website in a browser. No server needed.

## Usage

### Simple mode
Pick an AI source, upload your image, download.

- **Gemini** — overlays a Gemini logo at 55px from the bottom-right corner
- **ChatGPT** — applies a `#fcba03` yellow-orange tint (adjustable, min 5%)
- **Grok** — nothing (it's bad anyway)

### Advanced mode
Everything in simple mode, plus:
- Upload a custom watermark image
- Adjust X/Y offset from edges (px)
- Adjust opacity and scale

## Watermark sizing

The Gemini mark scales with image width — 46px base at 1000px wide, proportionally larger above that, minimum 46px below. The edge offset (55px) scales the same way.

## Output

Downloaded files are named `originalname-watermarked-XXXXX.ext` where `XXXXX` is a random 5-character string.

Videos are not supported.
