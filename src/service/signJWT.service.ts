import jwt from 'jsonwebtoken';

function signJwt(user: any, email: string ) {
    const jwtSecret = process.env.JWT_SECRET;
    console.log(user);
    if (!jwtSecret) {
        throw new Error('JWT secret is not defined. Please set the JWT_SECRET environment variable.');
    }
    
    return jwt.sign(
        {
            IDUser: user?._id,
            user: user,
            roles: user.Roles
        },
        jwtSecret,
        { expiresIn: '30d', algorithm: 'HS256' }
    );
}

export { signJwt }