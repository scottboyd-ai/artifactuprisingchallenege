'use strict';

import {createConnection} from "typeorm";

import {routes} from "./routes";
import {Product} from "./models/Product";
import {Purchase} from "./models/Purchase";
import {Category} from "./models/Category";

// tslint:disable-next-line:no-var-requires
const Hapi = require('@hapi/hapi');
// tslint:disable-next-line:no-var-requires
const handlebars = require('handlebars');
// tslint:disable-next-line:no-var-requires
const htmlUtils = require('./util/htmlUtil');

// tslint:disable-next-line:no-var-requires
require('source-map-support').install();

const server = Hapi.server({
    port: 3001,
    host: '0.0.0.0'
});

const init = async () => {

    console.log('Server init');

    console.log('Init good');

    await Promise.all([
        server.register({
            plugin: require('@hapi/good')
        }),
        server.register(require('inert')),
        server.register(require('vision'))
    ]);

    const defaultContext = {
        Title: 'Artifact Uprising',
        standardImports: htmlUtils.standardImports
        // imports: htmlHelpers.getImports,
        // standardPadding: htmlHelpers.standardPadding
    };

    console.log('Init handlebars');

    server.views({
        engines: {
            html: handlebars
        },
        context: defaultContext,
        relativeTo: '.',
        path: ['frontend/public/html'],
        layoutPath: 'frontend/public/templates',
        layout: 'default'
    });

    console.log('Init cookies');

    server.state('data', {
        // ttl: 1000 * 60 * 60 * 72, //3 days
        ttl: null, // Kill when browser is closed
        isSecure: false,
        isHttpOnly: true,
        encoding: 'base64json',
        clearInvalid: true,
        strictHeader: true
    });

    console.log('Init routes');

    server.route(routes);

    console.log('Init mysql');

    try {
        const connection = await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3308,
            username: "root",
            password: "root",
            database: "au",
            // logging: true,
            entities: [Category, Product, Purchase]
        });
        await connection.synchronize();
    } catch (error) {
        console.error(error);
    }

    console.log('Start server');

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.error(err);
});

init();
