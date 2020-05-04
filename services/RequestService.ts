import $ from 'jquery';

export const getCart = (cartSetter?, cartCountSetter?) => {
    $.ajax({
        url: '/cart',
        type: 'GET',
        success: (response) => {
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
    });
}

export const getProducts = (productSetter) => {
    $.ajax({
        url: '/products',
        type: 'GET',
        success: (response) => {
            productSetter(response);
        }
    })
}

export const saveCart = (newCart) => {
    $.ajax({
        url: '/cart',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({cart: newCart})
    })
}

export const getCategories = (setCategories) => {
    $.ajax({
        url: '/categories',
        type: 'GET',
        success: (response) => {
            setCategories(response);
        }
    })
}

export const filterProducts = (categoryId, setProducts) => {
    const path = categoryId ? '/products/' + categoryId : '/products';
    $.ajax({
        url: path,
        type: 'GET',
        success: (response) => {
            setProducts(response)
        }
    })
}