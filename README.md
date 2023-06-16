# Proyecto 4: Clinica Dental

Proyecto creado como ejercicio para GeeksHub Academy.

El objetivo del proyecto es crear el backend de un API REST de un sistema de gestión de usuarios y citas de una clínica dental

## Tecnologías:

Se ha realizado con MongoDB (mongoose), express y NodeJS. 

 ### Estructura:

La aplicación está dividida en un archivo principal (app.js) responsable del lanzamiento de la aplicación y dos entidades modularizadas (users y appointments), cada una con su modelo, su router y su controlador asociados dentro de su carpeta, de modo que resulte fácil encontrar y editar las partes del código necesarias sin que se vean afectadas otras secciones no relacionadas.


 * ### Model:
 
Contiene toda la estructura del modelo Mongoose que se usará para cada usuario, tanto paciente como doctor en el caso de los usuarios, y cada cita en el caso de las citas

 * ### Router:
 
 Aquí están todos los servicios disponibles en la API. Importan la lógica de los controladores y se exportan a App.ts
 
 * ### Controller:
 
 Toda la lógica se gestiona aquí. Es donde están todas las funciones, que reciben los parámetros pertinentes desde el router, gestionan la petición, y le devuelven la información que se deba retornar al usuario. Importa el Model, y exporta las funciones al Router.

 
 
 
