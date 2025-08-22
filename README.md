# Chabi Gallery 📸

Galería de fotos con subida drag & drop y layout adaptativo para imágenes verticales.

## Setup Local

```bash
git clone https://github.com/blissito/chabi-gallery.git
cd chabi-gallery
npm install
```

Crea `.env`:
```
BUCKET_NAME=tu-bucket
AWS_ACCESS_KEY_ID=tu-key
AWS_SECRET_ACCESS_KEY=tu-secret
AWS_ENDPOINT_URL_S3=https://tu-s3-endpoint.com
AWS_REGION=auto
```

```bash
npm start
# Abre http://localhost:3000
```

## Deploy

Usa [Fly.io](https://fly.io):

```bash
fly launch
fly deploy
```

El deploy automático funciona con push a `main`. Los secrets se configuran via GitHub Actions.