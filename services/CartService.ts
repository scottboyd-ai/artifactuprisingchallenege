import $ from 'jquery';


export const clearCart = (setCart, setCartCount, setMenuOpen) => {
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        success: (response) => {
            setCart({});
            setCartCount(0);
        }
    })
    setMenuOpen(false);
}