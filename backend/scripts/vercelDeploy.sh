# Instalar Vercel CLI globalmente
npm install -g vercel

# Ir al directorio del backend
cd backend

# Iniciar sesión en Vercel
vercel login

# Configurar las variables de entorno en Vercel
vercel env add DB_HOST
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add DB_NAME
vercel env add JWT_SECRET
vercel env add EMAIL_USER
vercel env add EMAIL_PASS

# Desplegar el backend
vercel --prod

# Ir al directorio del frontend
cd ../frontend

# Actualizar la variable VITE_API_URL en .env con la URL del backend desplegado
echo "VITE_API_URL=https://tu-backend-url.vercel.app/api" > .env

# Desplegar el frontend
vercel --prod