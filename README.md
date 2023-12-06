# Inventory App

## Objetivo del Proyecto

Este proyecto tiene como objetivo principal la creación de un E-Commerce robusto utilizando Node.js, MongoDB y Express. A lo largo de este desafío, se aplicaron los conocimientos del curso para desarrollar una aplicación completa, desde la gestión de usuarios hasta la implementación de un proceso de compra eficiente. Se utiliza la potencia de Node.js para la programación del lado del servidor, MongoDB para asegurar la persistencia de datos y Express para simplificar el desarrollo de API. Este proyecto no solo consolida las habilidades en el desarrollo de aplicaciones web modernas, sino que también te proporcionará una valiosa experiencia en la construcción de un E-Commerce funcional y escalable.


## Tecnologías Utilizadas

- **Node.js:** Versión X.X.X
- **Express:** Versión X.X.X
- **MongoDB:** Versión X.X.X

## Paquetes de Node.js Utilizados

A continuación se detallan los paquetes de Node.js utilizados en este proyecto y su propósito.

- **@faker-js/faker:** Librería para generar datos de prueba realistas.
- **bcrypt:** Biblioteca para el hashing de contraseñas.
- **chai:** Biblioteca de aserciones para realizar pruebas (testing) en la aplicación.
- **connect-mongo:** Almacena sesiones de Express en MongoDB.
- **cross-env:** Establece variables de entorno de forma consistente en diferentes plataformas.
- **dotenv:** Carga variables de entorno desde un archivo .env.
- **express:** Framework web para Node.js que facilita la creación de API.
- **express-handlebars:** Motor de plantillas para Express.js.
- **express-session:** Middleware para gestionar sesiones en Express.
- **handlebars-helpers:** Conjunto de ayudantes para Handlebars.
- **mocha:** Marco de prueba (testing) para Node.js.
- **mongodb:** Controlador oficial de MongoDB para Node.js.
- **mongoose:** Biblioteca de modelado de objetos MongoDB para Node.js.
- **mongoose-paginate-v2:** Paginación para Mongoose.
- **morgan-body:** Middleware de registro de solicitudes HTTP y respuestas para Express.
- **multer:** Middleware para manejar datos de formulario en la carga de archivos.
- **nodemailer:** Librería para enviar correos electrónicos desde Node.js.
- **nodemon:** Herramienta para reiniciar automáticamente la aplicación al detectar cambios en los archivos.
- **passport:** Middleware de autenticación para Node.js.
- **passport-github2:** Estrategia de Passport para la autenticación GitHub.
- **passport-local:** Estrategia de Passport para la autenticación local.
- **postcss-cli:** Herramienta para procesar CSS con JavaScript plugins.
- **socket.io:** Biblioteca para la comunicación en tiempo real mediante WebSocket.
- **socket.io-client:** Cliente de Socket.IO para el lado del cliente.
- **supertest:** Marco de prueba de extremo a extremo (E2E) para Node.js.
- **swagger-jsdoc:** Genera automáticamente la documentación Swagger a partir de JSDoc.
- **swagger-ui-express:** Middleware de Express para Swagger UI.
- **tailwindcss:** Marco de trabajo de utilidad CSS de baja nivel.
- **winston:** Biblioteca de registro (logging) para Node.js.

## Enlace al Proyecto

El proyecto está desplegado en el servidor Render. Puedes acceder a él desde [aca](https://inventoryapp-ekc2.onrender.com/).


## Configuración

Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias. Puedes encontrar un ejemplo en `.env.example`.

## Funcionalidades

### Autenticación (Login)
Para acceder a la aplicación, puedes utilizar los siguientes usuarios de prueba:

1. **Usuario Normal:**
   - **Usuario:** ivan.bravo@gmail.com
   - **Contraseña:** asd
   - **Rol:** user

2. **Usuario Administrador:**
   - **Usuario:** jfk@gmail.com
   - **Contraseña:** jfk
   - **Rol:** admin
   
![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/ccee7711-1d5d-461c-83b5-12430da59551)

## Funcionalidad de Recuperación de Contraseña
![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/0f2fab38-3ddc-4d3d-b1a0-bbf2b96a39bb)

Si has olvidado tu contraseña, la aplicación proporciona una funcionalidad de recuperación de contraseña. Sigue los pasos a continuación:

1. En la página de inicio de sesión, haz clic en el enlace "¿Olvidaste tu contraseña?".

2. Serás redirigido a una página donde puedes ingresar tu dirección de correo electrónico asociada a tu cuenta.

3. Después de ingresar tu correo electrónico, haz clic en el botón de enviar.

4. La aplicación enviará automáticamente un correo electrónico de recuperación de contraseña a la dirección proporcionada.

5. Verifica tu bandeja de entrada y sigue las instrucciones del correo electrónico para restablecer tu contraseña.

6. Una vez que hayas completado el proceso de recuperación de contraseña, serás redirigido de nuevo a la página de inicio de sesión.

Este proceso asegura que los usuarios tengan la capacidad de recuperar sus contraseñas de manera segura en caso de olvido. Si tienes algún problema durante este proceso, no dudes en contactar con el soporte técnico.

Siendo que se utilizan servicios de envio de mail de prueba aca hay un ejemplo del correo y mail generado con el link para reestablecer la contraseña

![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/abc27074-d896-4280-8e8e-6ce6f10b00f4)
Para restablecer tu contraseña, haz clic en el siguiente enlace: https://inventoryapp-ekc2.onrender.com/login/reset/e218678a9d29bfdbfdd261a41785e116179d0991

![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/d533f0bf-4fff-4b44-92e3-45f4b7b6ab9a)

## Pantalla Principal y Barra de Navegación

![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/7ee37f01-e2c5-49aa-a9d6-1c8f9b0e47aa)

La pantalla principal ofrece un completo dashboard donde puedes visualizar todos los productos disponibles. Además, la barra de navegación proporciona acceso a diversas opciones:

- **Dashboard:** Presenta una visión general de todos los productos disponibles en la plataforma. Se podran ver los detalles de los productos clickeando en **View** o agregarlos al carrito clickeando en **Add to Cart**.

- **Profile:** Permite revisar la información de tu perfil. Desde aqui podremos acceder al **Admin Panel** donde se encontraran funcionalidades especiales.

- **Add Products:** Ofrece la posibilidad de agregar nuevos productos al inventario.

- **Cart:** Muestra el contenido actual de tu carrito de compras. Puedes visualizar los productos seleccionados y proceder al pago.

- **Tickets:** Permite acceder a una sección donde puedes revisar el historial de tus pedidos anteriores. Aquí encontrarás detalles sobre cada transacción realizada.

- **Chat:** Implementa un pequeño chat en tiempo real utilizando WebSockets. Podrás comunicarte con otros usuarios.

- **Logout:** Te redirige a la página de inicio de sesión para cerrar tu sesión actual y garantizar la seguridad de tu cuenta.

# Admin Panel

Creado para administrar y supervisar el sistema. Aquí encontrarás varias opciones para gestionar usuarios, productos y más.

![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/8fe3b9fc-92c6-4868-8848-9a3c6a4a646d)

## View All Users

En esta sección, puedes visualizar todos los usuarios en una tabla. Además, puedes revisar los detalles de cada usuario y realizar acciones como eliminar o actualizar su rol desde el menú de detalles.

![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/5054ac5a-4af9-450a-8683-8bf0bf8c3216)

## Reset User Password

Permite restablecer la contraseña de un usuario específico. Este proceso se explica en detalle en la sección de "Funcionalidad de Recuperación de Contraseña" del README.

## View All Products

Accede a una tabla detallada que muestra todos los productos disponibles. Puedes ver los detalles de cada producto y eliminarlos con la opción "Eliminar Producto" en la tabla.
![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/6824d983-a1c7-483e-825c-3ffe7d58a002)

## Delete Inactive Users

Esta opción realiza una búsqueda de usuarios que no se hayan logueado en los últimos dos días y les elimina. Se proporciona un usuario de prueba con la última conexión mayor a 2 días que será eliminado. Revisar primero **View All Users**

## Swagger Docs

Accede a la documentación de la API mediante Swagger Docs. Aquí encontrarás información detallada sobre las rutas y funciones de la API para facilitar el desarrollo y la integración.

![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/59dce0ab-5a18-4495-8b25-234890594b07)

## Mock Data

Genera automáticamente 10 productos utilizando el módulo de datos simulados. Útil para pruebas y desarrollo. 
![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/15825654-ee8a-4ae1-96cd-407113bf7d4a)

## Home

Regresa al panel de inicio.

# Proceso de Compra

El proceso de compra en nuestra aplicación es sencillo y eficiente, diseñado para proporcionar una experiencia fluida para los usuarios. Aquí se describe paso a paso:

1. Pantalla Principal

Comienza explorando la pantalla principal, donde puedes visualizar una lista completa de productos disponibles. Utiliza esta vista para revisar y seleccionar los productos que deseas comprar y agregar productos a tu carrito de compras con un simple clic.

2. Ver Carrito

Dirígete al botón "Cart" en la barra de navegación para revisar los productos que has agregado al carrito. Por implementar ajustar las cantidades o eliminar productos según sea necesario.

4. Checkout

Una vez estés satisfecho con la selección en tu carrito, presiona el botón "Checkout". Esto generará automáticamente un ticket de compra basado en los productos en tu carrito.

![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/c64e0c86-b6c0-460d-9806-3aa088eacaba)

5. Ver Ticket

Después de realizar el checkout, aparecerá el botón "Ticket". Al hacer clic en este botón, podrás visualizar el ticket recién creado. Este ticket contiene detalles como la lista de productos, precios y codigo del ticket. Simultáneamente, cuando se genera el ticket, tu carrito se vaciará automáticamente.

![image](https://github.com/IvanBravoAM/inventory-app/assets/67069501/432a8483-5559-4f8c-999d-20c262bcdaa1)

# Conclusión

A lo largo de este curso, se ha aplicado con éxito un conjunto sólido de conocimientos para desarrollar una aplicación completa de E-Commerce. La utilización de tecnologías clave como Node.js, MongoDB y Express ha permitido construir un sistema robusto y funcional.

Durante el proceso de desarrollo, se han identificado numerosas oportunidades de mejora y posibles implementaciones futuras que enriquecerán aún más el sistema. Estas mejoras, que se agregarán próximamente, no solo ampliarán las capacidades de la aplicación, sino que también añadirán un valor significativo al proporcionar una experiencia aún más completa para los usuarios.

En este punto, me siento satisfecho con el proceso de aprendizaje y emocionado por continuar mi trayectoria en el desarrollo backend. La construcción de una aplicación tan robusta ha sido un desafío gratificante, y la perspectiva de seguir aplicando actualizaciones y mejoras a este proyecto me motiva a continuar mi proceso de aprendizaje y crecimiento en esta área del desarrollo de software.



