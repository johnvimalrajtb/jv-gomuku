import jwt, { SignOptions } from 'jsonwebtoken'

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = process.env.accessTokenPrivateKey as string
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'HS256',
    expiresIn: '8h',
  })
}

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = process.env.accessTokenPublicKey as string
    return jwt.verify(token, publicKey, { algorithms: ["HS256", "none"] }) as T
  } catch (error) {
    return null
  }
}
