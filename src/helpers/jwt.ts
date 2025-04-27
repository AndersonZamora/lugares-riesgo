import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_JWT_SEED || 'default_secret';

interface JWTPayload {
  uid: string;
  name: string;
  role: string;
}

export const generarJWT = (
  uid: string,
  name: string,
  role: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload: JWTPayload = { uid, name, role };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
      if (err || !token) {
        reject('No se puede generar el token');
      } else {
        resolve(token);
      }
    });
  });
};

export const comprobarJWT = (
  token: string = ''
): [boolean, string | null, string | null] => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      uid: string;
      role: string;
    };

    return [true, decoded.uid, decoded.role];
  } catch (error) {
    return [false, null, null]; // ← corregido el bug (antes devolvía true incluso con error)
  }
};
