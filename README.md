# PixelPerfect

An AI image studio: generate images from text prompts, caption and summarize
them, and sharpen photos.

**Live demo:** https://pixelperfect-nu.vercel.app
**API:** https://r1ch3rd-pixelperfect-api.hf.space

## Features

| Feature | How it works |
|---|---|
| **Generate** | Text prompt to image |
| **Caption** | ViT-GPT2 (`nlpconnect/vit-gpt2-image-captioning`) produces a short caption |
| **Summarize** | Gemini vision writes a detailed description of the image |
| **Enhance** | OpenCV unsharp-mask sharpening |

## Architecture

- **Frontend** — React + Vite + Tailwind, deployed on Vercel
- **Backend** — FastAPI on a Hugging Face Space (Docker, CPU); the Gemini key is
  a Space secret.

### Demo scope vs. original

The hackathon build ran **Stable Diffusion v1.4 on GPU** for generation and used
a **Firebase-backed, searchable image library** (upload images, then find them by
natural-language description via ORB/SSIM duplicate detection and Gemini search).

To fit a $0 hosting budget on CPU, the public demo:

- generates images through a free keyless image API instead of local Stable
  Diffusion (Gemini image output has no meaningful free quota), and
- disables the Firebase library/search (those endpoints return 503).

Caption, summary, and enhance are unchanged and run on the Space.

## Run locally

```bash
# backend
pip install -r requirements-space.txt
API_KEY=<your-gemini-key> uvicorn api:app --reload --port 8000

# frontend
cd client
npm install
VITE_API_URL=http://localhost:8000 npm run dev
```

## Notes

- The demo backend sleeps after ~48h idle on the free tier; the first request
  after a quiet spell takes ~30s to wake.
- Built with a team during a hackathon.
