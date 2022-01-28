import bcrypt from 'bcrypt'

export const hashPass = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 8)

  return hashedPassword
}
