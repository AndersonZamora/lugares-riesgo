/**
 * Extiende la interfaz `Request` de Express para incluir propiedades adicionales
 * que pueden ser utilizadas en los middlewares o controladores para acceder a la información
 * del usuario autenticado. Estas propiedades pueden ser útiles, por ejemplo, para almacenar
 * el identificador de usuario (`uid`), el nombre del usuario (`name`), y su rol (`role`),
 * que pueden ser establecidos en el middleware de autenticación y utilizados posteriormente
 * en la aplicación.
 * 
//  * @namespace Express
//  * @extends {Request}
//  * 
//  * @property {string} [uid] - El identificador único del usuario. Este valor puede ser asignado
//  *                             cuando el usuario se autentica y se adjunta a la solicitud.
//  * @property {string} [name] - El nombre del usuario. También asignado durante la autenticación.
//  * @property {string} [role] - El rol del usuario (por ejemplo, 'admin', 'user'). Se asigna
//  *                              durante la autenticación y se usa para determinar los permisos
 *                              del usuario en la aplicación.
 */

// declare global {
//   namespace Express {
//     interface Request {
//       uid?: string;
//       name?: string;
//       role?: string;
//     }
//   }
// }
