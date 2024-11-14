export function SignUpFormValidator(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    lastname: string
) {

    const warnings = [];

    if (email.length === 0) {
        warnings.push('El correo electrónico es obligatorio');
    }

    if (password.length === 0) {
        warnings.push('La contraseña es obligatoria');
    }

    if (name.length === 0) {
        warnings.push('El nombre es obligatorio');
    }

    if (lastname.length === 0) {
        warnings.push('El apellido es obligatorio');
    }

    if (password !== confirmPassword) {
        warnings.push('Las contraseñas no coinciden');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        warnings.push('Formato de correo electrónico no válido');
    }

    if (password.length < 6) {
        warnings.push('La contraseña debe tener al menos 6 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
        warnings.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (!/[\W_]/.test(password)) {
        warnings.push('La contraseña debe contener al menos un carácter especial');
    }

    if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
        warnings.push('La contraseña no puede contener secuencias de tres números consecutivos');
    }

    return warnings;
}
