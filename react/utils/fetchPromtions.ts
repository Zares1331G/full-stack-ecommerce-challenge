export const getPromotionModule = async () => {
    try {
        const response = await fetch('/_v/getPromotionModule');
        const data = await response.json();
        const result = data

        return result;
    } catch (error) {
        console.error("Error al obtener los datos del Store Locator:", error);
        return null;
    }
};