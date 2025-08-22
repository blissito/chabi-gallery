const express = require('express');
const cors = require('cors');
const { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración CORS abierta para permitir cualquier origen
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400
}));

app.use(express.json());
app.use(express.static('public'));

// Configuración S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'auto',
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const BUCKET_NAME = process.env.BUCKET_NAME;
const UPLOAD_PREFIX = 'chavy/uploads/';

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Hono Image Upload API with SDK',
    endpoints: {
      presigned_url: 'POST /api/uploads/presigned-url',
      download_url: 'POST /api/uploads/download-url',
      gallery: 'GET /api/gallery',
      images: 'GET /api/images/:uuid/:filename',
      sdk: 'GET /sdk/image-api.js',
      example: 'GET /sdk/example'
    }
  });
});

// GET /api/gallery - Listar todas las imágenes
app.get('/api/gallery', async (req, res) => {
  try {
    // Verificar configuración antes de hacer la llamada
    if (!BUCKET_NAME) {
      console.error('BUCKET_NAME not configured');
      return res.status(500).json({ 
        error: 'Server configuration error: BUCKET_NAME missing',
        details: 'Check environment variables'
      });
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS credentials not configured');
      return res.status(500).json({ 
        error: 'Server configuration error: AWS credentials missing',
        details: 'Check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY'
      });
    }

    console.log('Fetching gallery from bucket:', BUCKET_NAME, 'prefix:', UPLOAD_PREFIX);

    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: UPLOAD_PREFIX,
      MaxKeys: 1000
    });

    const response = await s3Client.send(command);
    console.log('S3 response received, objects found:', response.Contents?.length || 0);
    
    const images = await Promise.all(
      (response.Contents || [])
        .filter(obj => obj.Key !== UPLOAD_PREFIX)
        .map(async (obj) => {
          const filename = obj.Key.split('/').pop();
          const downloadUrl = await getSignedUrl(s3Client, new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: obj.Key
          }), { expiresIn: 3600 });

          return {
            key: obj.Key,
            url: downloadUrl,
            size: obj.Size,
            lastModified: obj.LastModified,
            filename: filename
          };
        })
    );

    console.log('Gallery processed successfully, returning', images.length, 'images');
    res.json({
      images,
      count: images.length
    });
  } catch (error) {
    console.error('Error listing gallery:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.$response?.statusCode,
      requestId: error.$response?.requestId
    });
    
    res.status(500).json({ 
      error: 'Failed to fetch gallery',
      details: error.message,
      type: error.name
    });
  }
});

// POST /api/uploads/presigned-url - Obtener URL presignada para subida
app.post('/api/uploads/presigned-url', async (req, res) => {
  try {
    const { filename, contentType } = req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Generar un ID único para el archivo
    const uniqueId = Math.random().toString(36).substring(2, 6).toUpperCase();
    const key = `${UPLOAD_PREFIX}${uniqueId}_${filename}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType || 'application/octet-stream'
    });

    const uploadUrl = await getSignedUrl(s3Client, uploadCommand, { expiresIn: 3600 });
    
    // También generar URL de descarga
    const downloadCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });
    const downloadUrl = await getSignedUrl(s3Client, downloadCommand, { expiresIn: 3600 });

    res.json({
      uploadUrl,
      downloadUrl,
      key,
      expiresIn: 3600
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate presigned URL' });
  }
});

// POST /api/uploads/download-url - Obtener URL de descarga
app.post('/api/uploads/download-url', async (req, res) => {
  try {
    const { key, expiresIn = 3600 } = req.body;
    
    if (!key) {
      return res.status(400).json({ error: 'Key is required' });
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });

    const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn });

    res.json({
      downloadUrl,
      expiresIn
    });
  } catch (error) {
    console.error('Error generating download URL:', error);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
});

// GET /api/images/:uuid/:filename - Obtener imagen específica (redirigir a S3)
app.get('/api/images/:uuid/:filename', async (req, res) => {
  try {
    const { uuid, filename } = req.params;
    const key = `${UPLOAD_PREFIX}${uuid}_${filename}`;

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });

    const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    res.redirect(downloadUrl);
  } catch (error) {
    console.error('Error redirecting to image:', error);
    res.status(404).json({ error: 'Image not found' });
  }
});

// GET /sdk/image-api.js - Servir el SDK
app.get('/sdk/image-api.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'image-api.js'));
});

// GET /sdk/example - Servir ejemplo de uso
app.get('/sdk/example', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'chabi-birthday.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Environment variables loaded:');
  console.log('- BUCKET_NAME:', BUCKET_NAME ? '✓' : '✗');
  console.log('- AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? '✓' : '✗');
  console.log('- AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '✓' : '✗');
  console.log('- AWS_ENDPOINT_URL_S3:', process.env.AWS_ENDPOINT_URL_S3 ? '✓' : '✗');
  console.log('- AWS_REGION:', process.env.AWS_REGION || 'auto');
});