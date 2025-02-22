```bash
npm install -g @nestjs/cli
npx npm-check-updates "/nestjs*/" -u 
```

## Dev

1. Clonar el repositrio
2. Instalar dependencias
3. Crear un archivo `.env` en base al .`env.template`
4. Tener levantados los microservicios a consultar
5. Levantar el proyecto

## Nats 
```bash
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```