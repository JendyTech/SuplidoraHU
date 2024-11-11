import bcrypt from 'bcrypt'

interface IHashConfig {
  salt: number
}

export const hashPassword = async (
  password: string,
  config: IHashConfig = { salt: 15 },
) => {
  const { salt } = config
  const salts = await bcrypt.genSalt(salt)
  const result = await bcrypt.hash(password, salts)

  return result
}

interface ICompareHash {
  password: string
  hash: string
}

export const compareHash = async ({ hash, password }: ICompareHash) => {
  const result = await bcrypt.compare(password, hash)
  return result
}
