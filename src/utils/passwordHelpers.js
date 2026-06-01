export function generateTemporaryPassword(length = 12) {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (n) => chars[n % chars.length]).join('')
}

export function validatePasswordPair(password, confirmPassword) {
  if (password.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères.'
  }
  if (password !== confirmPassword) {
    return 'Les mots de passe ne correspondent pas.'
  }
  return null
}
