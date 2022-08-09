## Desafío: clase 38: Arquitectura de capas
#### Como ejecutar el programa en su computadora:

Ejecutar "npm install" para instalar las dependecias.

En archivo .env se define la conexion a MongoDB Atlas y se almacena como ejemplo
en la base de datos llamado 'serverprocess' la info del sistema

Ejecutar "npm start" para iniciar el server.

#### Consignas del desafío y las respuestas

* De acuerdo al enunciado del desafío se agruparon las funcionalidades del sistema siguiendo la arquitectura Modelo-Vista-Controlador (MVC) teniendo en cuenta que la carpeta `routes` concentra el ruteo, la carpeta `controllers` agrupa la lógica de negocio y la carpeta de `models` define el esquema a seguir para que los datos persistan en la base de datos. Cabe aclarar que las carpetas `container` y `dao` siguen el patrón de diseño DAO.
También en la carpeta `views` se definen los templates engines que se renderizan en el browser.

<img src="/public/images/screenshots/folders.jpg" alt="folders"/>



