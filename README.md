# 🎉 Galería de Fotos de Chabi 📸

¡Hola! Este es un proyecto súper cool para crear tu propia galería de fotos en internet. ¡Es como tener tu propio Instagram pero hecho por ti!

## 🤔 ¿Qué es esto?

Es una aplicación web donde puedes:
- 📤 Subir tus fotos favoritas
- 👀 Ver todas las fotos en una galería bonita
- 🎨 Tiene colores y animaciones geniales
- 📱 Funciona en computadoras y celulares

## 🚀 ¿Cómo lo hago funcionar?

### Paso 1: Descarga el proyecto 📦

Primero, necesitas copiar este proyecto a tu computadora:

```bash
git clone https://github.com/blissito/chabi-gallery.git
cd chabi-gallery
```

### Paso 2: Instala las herramientas necesarias 🔧

Es como cuando instalas un juego, pero para programar:

```bash
npm install
```

### Paso 3: Configura tu almacén de fotos en la nube ☁️

Necesitas un lugar especial en internet para guardar las fotos. Se llama S3 (es como un disco duro gigante en la nube).

1. Crea un archivo llamado `.env` (es un archivo secreto 🤫)
2. Copia esto dentro y cambia las palabras en MAYÚSCULAS por tus datos reales:

```
BUCKET_NAME=TU_NOMBRE_DEL_BALDE
AWS_ACCESS_KEY_ID=TU_LLAVE_SECRETA
AWS_SECRET_ACCESS_KEY=TU_SUPER_LLAVE_SECRETA
AWS_ENDPOINT_URL_S3=https://tu-direccion-s3.com
AWS_REGION=auto
PORT=3000
```

⚠️ **¡IMPORTANTE!** Nunca compartas estas llaves secretas con nadie. ¡Son como las contraseñas de tu videojuego favorito!

### Paso 4: ¡Enciende el servidor! 🎮

```bash
npm start
```

### Paso 5: ¡A jugar! 🎉

Abre tu navegador (Chrome, Firefox, Safari) y ve a:

```
http://localhost:3000/sdk/example
```

¡Listo! Ya puedes subir fotos y verlas en tu galería.

## 📱 ¿Cómo uso la galería?

1. **Para subir una foto:**
   - Haz clic en el botón azul "📷 Seleccionar Foto"
   - Escoge una foto de tu computadora
   - Verás una vista previa de tu foto
   - Haz clic en "Subir Imagen" (el botón verde)
   - ¡Espera un poquito y listo!

2. **O también puedes arrastrar:**
   - Toma una foto desde tu carpeta
   - Arrástrala hasta la caja punteada
   - ¡Suéltala ahí!

3. **Ver tus fotos:**
   - Todas las fotos aparecen abajo automáticamente
   - Se ven en cuadritos bonitos
   - Pasa el mouse encima y se mueven un poquito

## 🛠️ ¿Qué necesito en mi computadora?

Antes de empezar, asegúrate de tener:

1. **Node.js** (versión 18 o más nueva)
   - Es como el motor que hace funcionar todo
   - Descárgalo de: https://nodejs.org/

2. **Git** (para copiar el proyecto)
   - Descárgalo de: https://git-scm.com/

3. **Un editor de código** (para ver y cambiar el código)
   - Te recomiendo Visual Studio Code: https://code.visualstudio.com/

## 🎨 ¿Puedo cambiar los colores?

¡Claro que sí! Abre el archivo `index.html` y busca esta parte:

```css
:root {
  --chabi-color-verde: #10B981;    /* Verde */
  --chabi-color-rosa: #F472B6;     /* Rosa */
  --chabi-color-azul: #3B82F6;     /* Azul */
  --chabi-color-amarillo: #FCD34D; /* Amarillo */
  --chabi-color-morado: #A78BFA;   /* Morado */
}
```

Cambia los códigos de colores (los que empiezan con #) por tus favoritos. Puedes buscar códigos de colores en: https://htmlcolorcodes.com/

## 🌍 ¿Cómo lo pongo en internet para que todos lo vean?

### Opción 1: Usar Fly.io (Gratis para empezar) 🦋

1. Crea una cuenta en https://fly.io
2. Instala flyctl (su herramienta)
3. En la carpeta del proyecto escribe:

```bash
fly launch
fly deploy
```

### Opción 2: Usar Netlify (Súper fácil) 🚀

Solo necesitas subir la carpeta a Netlify.com arrastrándola. ¡Así de fácil!

## 🆘 ¡Ayuda! Algo no funciona

Si algo sale mal, aquí hay algunos trucos:

1. **El servidor no inicia:**
   - Asegúrate de haber hecho `npm install`
   - Revisa que el archivo `.env` esté bien escrito

2. **No puedo subir fotos:**
   - Verifica que tu S3 esté configurado correctamente
   - Revisa que las llaves secretas estén bien

3. **La página se ve rara:**
   - Prueba con otro navegador
   - Recarga la página con Ctrl+F5 (o Cmd+Shift+R en Mac)

## 📚 ¿Qué tecnologías usa?

Para los curiosos, este proyecto usa:

- **Express.js**: Es como el cerebro del servidor
- **AWS S3**: El lugar donde guardamos las fotos
- **JavaScript**: El lenguaje de programación
- **HTML y CSS**: Para hacer que se vea bonito

## 🤝 ¿Puedo ayudar a mejorar el proyecto?

¡Por supuesto! Si tienes ideas geniales:

1. Haz un "fork" del proyecto (es como hacer tu propia copia)
2. Mejora lo que quieras
3. Envía tus cambios con un "pull request"

## 🎮 Retos extras para programadores novatos

¿Te gusta programar? Intenta estos retos:

- [ ] Cambia el mensaje de bienvenida
- [ ] Agrega más emojis animados
- [ ] Cambia el color del botón de subir
- [ ] Haz que las fotos sean más grandes o más pequeñas
- [ ] Agrega un sonido cuando se sube una foto
- [ ] Crea un botón para borrar fotos

## 📜 Licencia

Este proyecto es libre y puedes usarlo para lo que quieras. ¡Diviértete!

## 🌟 Agradecimientos especiales

- A Chabi, por ser genial 🎂
- A todos los que suben fotos bonitas 📸
- A ti, por querer aprender a programar 💻

---

¿Tienes preguntas? ¡No tengas miedo de preguntar! Todos empezamos sin saber nada. Lo importante es divertirse mientras aprendes. 

**¡Feliz programación!** 🚀✨