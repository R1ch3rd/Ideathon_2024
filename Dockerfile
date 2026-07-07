# PixelPerfect API — Hugging Face Space (Docker runtime, CPU)
FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements-space.txt .
RUN pip install --no-cache-dir -r requirements-space.txt

COPY api.py ./
COPY models ./models

# writable caches for HF Spaces' non-root user; the ViT-GPT2 caption
# model downloads here on first boot
ENV HOME=/tmp \
    HF_HOME=/tmp/hf \
    TORCH_HOME=/tmp/torch

EXPOSE 7860
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "7860"]
