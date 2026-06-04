import bcrypt from 'bcryptjs';

export async function hashPassword(plainTextPassword) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        return hash;
    } catch (error) {
        console.error(error);
        throw error;
    }
}