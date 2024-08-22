export const removeNomNumbersCharacters = (str: string): string => {
    return str.replace(/\D/g, '');
}