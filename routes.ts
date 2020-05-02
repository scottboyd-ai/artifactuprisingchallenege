import {v4 as uuidv4} from 'uuid';
import {Product} from "./models/Product";

export const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            const sessionId = request.state.data ? request.state.data.sessionId : uuidv4();
            h.state('data', {...request.state.data, sessionId: sessionId});
            return h.view('index.html');
        }
    },
    {
        method: 'GET',
        path: '/products',
        handler: (request, h) => {
            return Product.find();
        }
    },
    {
        method: 'GET',
        path: '/cart',
        handler: (request, h) => {
            return request.state.data.cart ? request.state.data.cart : '';
        }
    },
    {
        method: 'POST',
        path: '/cart',
        handler: (request, h) => {
            return h.response('').state('data', {...request.state.data, cart: request.payload.cart});
        }
    },
    {
        method: 'DELETE',
        path: '/cart',
        handler: (request, h) => {
            return h.response('').state('data', {...request.state.data, cart: {}});
        }
    },
    {
        method: 'GET',
        path: '/checkout',
        handler: (request, h) => {
            return h.view('checkout.html');
        }
    },
    {
        method: 'POST',
        path: '/purchase',
        handler: async (request, h) => {
            const cart = request.state.data.cart;
            const products: Product[] = await Product.findByIds(Object.keys(request.state.data.cart));
            products.map((product) => {
                if (cart[product.id] && product.quantity > 0 && (product.quantity - cart[product.id].quantity >= 0)) {
                    product.quantity -= cart[product.id].quantity;
                    product.save();
                }
            })
            h.state('data', {...request.state.data, cart: {}});
            return '';
        }
    },
    {
        method: 'GET',
        path: '/scripts/vendor',
        options: {
            auth: false
        },
        handler(request, h) {
            return h.file('dist/vendor.js');
        }
    },
    {
        method: 'GET',
        path: '/scripts/index',
        options: {
            auth: false
        },
        handler(request, h) {
            return h.file('dist/index.js');
        }
    },
    {
        method: 'GET',
        path: '/scripts/{path*}',
        handler(request, h) {
            return h.file('dist/' + request.params.path + '.js');
        }
    },
    {
        method: 'GET',
        path: '/styles/{path*}',
        handler(request, h) {
            return h.file('frontend/components/' + request.params.path + '/' + request.params.path + '.css');
        }
    },
    {
        method: 'GET',
        path: '/favicon.ico',
        handler: (request, h) => {
            return h.file('img/favicon.ico')
        }
    },
    {
        method: 'GET',
        path: '/fail',
        handler: (request, h) => {
            return h.view('fail.html');
        }
    }
];