const jwt = require('jsonwebtoken');

export const getuser = (token: string) => {

    const { role, uid } = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );

    return { role, uid }
}
