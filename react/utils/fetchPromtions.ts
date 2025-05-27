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

export const deletePromotionModule = async (documentId: string) => {
    try {
        const response = await fetch('/_v/deletePromotionModule', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ documentId })
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
            return await response.json();
        } else {
            // Manejo seguro de texto plano (como el que te está mandando el backend)
            return await response.text();
        }

    } catch (error) {
        console.error("Error al eliminar el tag del producto:", error);
        return null;
    }
};

export const postPromotionModule = async (dataTag: any) => {
    try {
        const response = await fetch('/_v/postPromotionModule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataTag)
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar el tag del producto:", error);
        return null;
    }
};

export const updatePromotionModule = async (body: any) => {
    try {
        const response = await fetch('/_v/patchPromotionModule', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar el tag del producto:", error);
        return null;
    }
};

export const promoCheck = async (data:any) => {
    try {

        const response = await fetch("/_v/promo-check", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        return await response.json();
    } catch (error) {
        console.log(error, "error")
    }
}