import $ from 'jquery';

export const getCart = async (cartSetter?, cartCountSetter?) => {
    const response = await $.ajax({
        url: '/cart',
        type: 'GET',
        success: (response) => {
           return response;
        }
    });

    if (cartSetter) {
        cartSetter(response);
    }
    if (cartCountSetter) {
        let cartCount = 0;
        for (const productId of Object.keys(response)) {
            const countModifier = response[productId] ? response[productId].quantity : 0
            cartCount += countModifier;
        }
        cartCountSetter(cartCount);
    }
}

export const getProducts = async (productSetter) => {
    $.ajax({
        url: '/products',
        type: 'GET',
        success: (response) => {
            productSetter(response);
        }
    })
}