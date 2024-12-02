// utils/validators.ts
export const validateYear = (year: string): string | null => {
    const currentYear = new Date().getFullYear();
    const numericYear = Number(year);

    if (!year) return "El campo año es obligatorio.";
    if (isNaN(numericYear) || numericYear < 1900 || numericYear > currentYear) {
        return `El año debe estar entre 1900 y ${currentYear}.`;
    }

    return null;
};

export const validatePlate = (plate: string): string | null => {
    if (!plate) return "El campo placa es obligatorio.";

    // Validar que la placa tenga exactamente 6 caracteres
    if (plate.length !== 6) {
        return "La placa debe tener exactamente 6 caracteres.";
    }

    // Validar que los primeros 3 caracteres sean letras
    const letters = plate.slice(0, 3);
    if (!/^[A-Za-z]+$/.test(letters)) {
        return "Los primeros 3 caracteres de la placa deben ser letras.";
    }

    // Validar que los últimos 3 caracteres sean números
    const numbers = plate.slice(3);
    if (!/^[0-9]+$/.test(numbers)) {
        return "Los últimos 3 caracteres de la placa deben ser números.";
    }

    return null;
}
