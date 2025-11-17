# 1. Imagen Base (Punto de partida)
FROM node:24-alpine

# 2. Directorio de Trabajo
WORKDIR /app

# 3. Copiar archivos de dependencias
COPY package*.json ./

# 4. Instalar Dependencias
# ¡IMPORTANTE! Ahora instalamos SOLO las dependencias de producción
# Nuestros tests ya se han ejecutado en la CI, no los necesitamos en la imagen final.
RUN npm ci --omit=dev --no-audit --no-fund

# 5. Copiar el resto del código
COPY . .

# 6. Exponer el puerto
# Informamos a Docker que nuestro servidor escucha en el puerto 3000
EXPOSE 3000

# 7. Comando por Defecto
# ¡IMPORTANTE! Cambiamos de "npm test" a "npm start"
# Esto ejecutará "node src/server.js"
CMD ["npm", "start"]