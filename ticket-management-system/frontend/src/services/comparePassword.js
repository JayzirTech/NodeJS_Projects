import bcrypt from 'bcryptjs';

export async function comparePassword(passwordIngresada, hashAlmacenado) {
    try {
        const access = await bcrypt.compare(passwordIngresada, hashAlmacenado);
        return access;
    } catch (error) {
        console.error(error);
        throw error;
    }
}