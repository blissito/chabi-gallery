# 🎉 Galería de Fotos de Chabi 📸

¡Crea tu propia galería de fotos como Instagram!

## ✨ ¿Qué hace?

- 📤 Sube fotos arrastrándolas o con un botón
- 👀 Ve todas las fotos en una galería bonita  
- 📱 Funciona en computadoras y celulares

## 🚀 Cómo empezar

1. **Descarga el proyecto:**
```bash
git clone https://github.com/blissito/chabi-gallery.git
cd chabi-gallery
npm install
```

2. **Configura tu almacén de fotos (S3):**

Crea un archivo `.env` con tus datos secretos:
```
BUCKET_NAME=tu-nombre-del-balde
AWS_ACCESS_KEY_ID=tu-llave-secreta
AWS_SECRET_ACCESS_KEY=tu-super-llave-secreta
AWS_ENDPOINT_URL_S3=https://tu-direccion-s3.com
AWS_REGION=auto
```

⚠️ **¡Nunca compartas estas llaves con nadie!**

3. **Enciende el servidor:**
```bash
npm start
```

4. **¡Abre en tu navegador:**
```
http://localhost:3000/sdk/example
```

## 🎨 Personaliza colores

Cambia los colores en `index.html` buscando esta parte:
```css
--chabi-color-verde: #10B981;
--chabi-color-rosa: #F472B6;
--chabi-color-azul: #3B82F6;
```

## 🌍 Poner en internet

**Opción fácil:** Arrastra tu carpeta a [Netlify.com](https://netlify.com)

**Opción pro:** Usa [Fly.io](https://fly.io) con `fly launch`

## 🆘 Si algo no funciona

- ¿No inicia? → Haz `npm install` otra vez
- ¿No suben fotos? → Revisa tu archivo `.env`
- ¿Se ve raro? → Recarga con Ctrl+F5

## 🎮 Retos extras

- [ ] Cambia el mensaje de bienvenida
- [ ] Agrega más emojis
- [ ] Haz las fotos más grandes
- [ ] Cambia los colores de los botones

## 🔧 ¿Qué necesitas?

- [Node.js](https://nodejs.org/) (versión 18+)
- [Git](https://git-scm.com/)
- Una cuenta S3 (para guardar fotos)

---

**¡Que lo disfrutes!** 🚀 Si tienes dudas, ¡pregunta!