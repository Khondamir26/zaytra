// Удаляет null, undefined, пустые строки, {}, но оставляет массивы
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanitizePayload(obj: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleaned: Record<string, any> = {};

    for (const key in obj) {
        const value = obj[key];

        // Удаляем: null, undefined, пустые строки
        if (
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim() === "")
        ) {
            continue;
        }

        // Удаляем: пустые объекты ({}), но не массивы
        if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            !(value instanceof File) &&
            Object.keys(value).length === 0
        ) {
            continue;
        }

        cleaned[key] = value;
    }

    return cleaned;
}
