import bcrypt, { hash } from 'bcrypt';

const SALT_RANDOMS = 12;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS);

  const hashPassword = await hash(password, SALT_RANDOMS);

  return await hash(password, saltGenerated);
};

const veryfyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const PassWordCrypto = {
  encrypt: (password: string): string => {
    return bcrypt.hashSync(password, 10);
  },
};
function genSalt(SALT_RANDOMS: number): Promise<string> {
  return bcrypt.genSalt(SALT_RANDOMS);
}
