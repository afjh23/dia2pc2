#Sistema de Autenticación con JWT y Expiración

Descripción
Este proyecto implementa un sistema de autenticación utilizando JSON Web Tokens (JWT) en una aplicación Node.js con Express.js. La aplicación incluye la funcionalidad de expiración de tokens para mejorar la seguridad del sistema.

##Instalación
###1. Instalar dependencias necesarias
 - npm install express jsonwebtoken bcryptjs dotenv
 Configuración del archivo .env
JWT_SECRET=mi_clave_secreta
JWT_EXPIRES_IN=30m

###2. Implementación del Controlador de Autenticación
-Verificación de Credenciales y Generación de Token:
Se creó un endpoint POST /login que recibe un nombre de usuario y una contraseña. Si las credenciales son válidas, se genera un token JWT con el id del usuario como payload y una fecha de expiración definida.

const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});


-Expiración del Token:
La expiración se maneja configurando la opción expiresIn al momento de generar el token. Este valor, tomado de process.env.JWT_EXPIRES_IN, asegura que el token caduque automáticamente después del periodo especificado.

###3. Ruta de Verificación del Token
Verificación de Token:
Se creó una ruta GET /verify que recibe el token en el encabezado de autorización. Esta ruta verifica si el token es válido y si no ha expirado.

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).json({ message: 'Token inválido o ha expirado' });
    }
    res.status(200).json({ message: 'Token válido', userId: decoded.id });
});

Si el token es válido y no ha expirado, se devuelve un mensaje de confirmación. Si no, se responde con un código de estado 401 y un mensaje de error.


4. Consideraciones de Seguridad
Almacenamiento Seguro de Contraseñas:
Las contraseñas se encriptan utilizando bcryptjs para evitar que se almacenen en texto claro. Esto asegura que, en caso de una filtración de datos, las contraseñas no puedan ser fácilmente comprometidas.

Expiración de Tokens:
La implementación de la expiración de tokens asegura que incluso si un token es interceptado, solo será válido por un tiempo limitado, reduciendo el riesgo de uso indebido.

Manejo de Errores:
El sistema está diseñado para manejar tokens expirados o inválidos de manera segura, rechazando solicitudes no autorizadas con los mensajes de error apropiados.


Memoria actualizada
Aquí tienes un ejemplo de cómo documentar el proceso de implementación del sistema de autenticación con JWT en el archivo README.md, siguiendo la consigna dada:

markdown
Copiar código
# Sistema de Autenticación con JWT y Expiración de Tokens

Este proyecto implementa un sistema de autenticación utilizando JSON Web Tokens (JWT) en una aplicación Node.js con Express.js. El sistema incluye la funcionalidad de expiración de tokens para mejorar la seguridad.

## Pasos para Implementar el Sistema de Autenticación

### 1. Configuración del Entorno

- **Instalación de dependencias:**
  ```bash
  npm install express jsonwebtoken bcryptjs dotenv
Estas bibliotecas son esenciales para configurar el servidor Express, manejar tokens JWT, encriptar contraseñas, y gestionar variables de entorno.

Configuración del archivo .env:
Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:
makefile
Copiar código
JWT_SECRET=mi_clave_secreta
JWT_EXPIRES_IN=30m
JWT_SECRET: Esta clave se utiliza para firmar los tokens JWT.
JWT_EXPIRES_IN: Define el tiempo de expiración de los tokens, en este caso, 30 minutos.
2. Implementación del Controlador de Autenticación
Verificación de Credenciales y Generación de Token:
Se creó un endpoint POST /login que recibe un nombre de usuario y una contraseña. Si las credenciales son válidas, se genera un token JWT con el id del usuario como payload y una fecha de expiración definida.

javascript
Copiar código
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});
Expiración del Token:
La expiración se maneja configurando la opción expiresIn al momento de generar el token. Este valor, tomado de process.env.JWT_EXPIRES_IN, asegura que el token caduque automáticamente después del periodo especificado.

###3. Ruta de Verificación del Token
Verificación de Token:
Se creó una ruta GET /verify que recibe el token en el encabezado de autorización. Esta ruta verifica si el token es válido y si no ha expirado.

javascript
Copiar código
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).json({ message: 'Token inválido o ha expirado' });
    }
    res.status(200).json({ message: 'Token válido', userId: decoded.id });
});
Si el token es válido y no ha expirado, se devuelve un mensaje de confirmación. Si no, se responde con un código de estado 401 y un mensaje de error.

###4. Consideraciones de Seguridad
Almacenamiento Seguro de Contraseñas:
Las contraseñas se encriptan utilizando bcryptjs para evitar que se almacenen en texto claro. Esto asegura que, en caso de una filtración de datos, las contraseñas no puedan ser fácilmente comprometidas.

Expiración de Tokens:
La implementación de la expiración de tokens asegura que incluso si un token es interceptado, solo será válido por un tiempo limitado, reduciendo el riesgo de uso indebido.

Manejo de Errores:
El sistema está diseñado para manejar tokens expirados o inválidos de manera segura, rechazando solicitudes no autorizadas con los mensajes de error apropiados.

###5. Pruebas
Utiliza herramientas como Thunder Client o Postman para probar los endpoints:

/login: Enviar una solicitud POST con las credenciales del usuario para obtener un token JWT.
/verify: Enviar una solicitud GET con el token JWT en el encabezado de autorización para verificar su validez.