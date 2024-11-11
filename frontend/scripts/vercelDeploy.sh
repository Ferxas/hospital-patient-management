# Instalar Vercel CLI globalmente (si no está instalado)
npm install -g vercel

# Ir al directorio del frontend
cd frontend

# Iniciar sesión en Vercel (si no se ha hecho antes)
vercel login

# Configurar la variable de entorno del API_URL
vercel env add VITE_API_URL

# Desplegar el frontend
vercel --prod