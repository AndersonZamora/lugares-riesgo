# Citezen back

1. instalar dependencias `npm install`
2. Crear una copia del ```.env template ``` y renombrarlo a ```env```
3. Levantar la base de datos ```docker compose up -d```
4. Correr la migracion de prisma ```npx prisma migrate dev```
5. Levantar proyecto ``` npm run dev ```
6. Agregar nuevas tablas ``` npx prisma db push ```