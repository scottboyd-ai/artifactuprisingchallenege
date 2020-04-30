'use strict';

import config from 'config';
import {createConnection} from "typeorm";

const path = require('path');
// tslint:disable-next-line:no-var-requires
const Hapi = require('@hapi/hapi');
// tslint:disable-next-line:no-var-requires
const routes = require('./routes');
// tslint:disable-next-line:no-var-requires
const handlebars = require('handlebars');
// tslint:disable-next-line:no-var-requires
const htmlUtils = require('./util/htmlUtil');

// tslint:disable-next-line:no-var-requires
require('source-map-support').install();

// tslint:disable-next-line:no-commented-code
// const server = Hapi.server({
//     port: 3000,
//     host: '10.0.0.68'});

const server = Hapi.server({
    port: 3001,
    host: '0.0.0.0'
});

const init = async () => {

    console.log('Server init');

    console.log('Init good');

    await Promise.all([
        server.register({
            plugin: require('@hapi/good'),
            options
        }),
        server.register(require('inert')),
        server.register(require('vision'))
    ]);

    const defaultContext = {
        title: 'Artifact Uprising',
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
        relativeTo: '',
        path: ['frontend/public/html'],
        layoutPath: 'frontend/public/templates',
        layout: 'default'
    });

    console.log('Init cookies');

    await server.register(require('@hapi/cookie'));

    const cookieConfig = config.get('cookie');

    // TODO set isSecure to true when on production
    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: cookieConfig.name,
            password: cookieConfig.password,
            isSecure: cookieConfig.isSecure
        },
        redirectTo: '/fail'
    });

    server.auth.default('session');

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
            entities: [Feature, Purchase]
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

    logger.error(err);
});

init();
