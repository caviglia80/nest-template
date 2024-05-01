<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Nest Template

1. Instalar dependencias
```npm i```
2. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
3. Cambiar las variables de entorno y recompilar imagen
```
docker-compose -f docker-compose.yaml up --build -d   // Archivo docker especifico
docker-compose down                                   // Detener y remover los contenedores actuales
docker-compose down -v                                // Detener y remover los contenedores actuales y los volumenes
docker-compose up -d db
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Levantar: ```npm run start:dev```
