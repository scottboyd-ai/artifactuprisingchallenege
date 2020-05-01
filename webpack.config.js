const entryPlus = require('webpack-entry-plus');
const glob = require('glob');
const path = require('path');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

let publicTSXEntryFiles = [{
    entryFiles: glob.sync('./frontend/public/tsx/**/*.tsx'),
    outputName(item){
        return item.split('//').pop().split('/').pop().split('.').shift();
    }

}];

publicTSXEntryFiles = entryPlus(publicTSXEntryFiles);

const allTSXEntryFiles = { ...publicTSXEntryFiles };

const config = {
    // set to false because __dirname resolving to / instead of absolute path when
    // built using webpack
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            pg: path.resolve(__dirname, "empty_module"),
            'pg-hstore': path.resolve(__dirname, "empty_module"),
            tls: path.resolve(__dirname, "empty_module"),
            net: path.resolve(__dirname, "empty_module"),
            fs: path.resolve(__dirname, "empty_module"),
            tedious: path.resolve(__dirname, "empty_module"),
            sqlite3: path.resolve(__dirname, "empty_module"),
            mariadb: path.resolve(__dirname, "empty_module"),
        }
    },
    // set to development to read .env.local variables
    mode: 'development',
    target: 'web',
    name: 'server',
    entry: allTSXEntryFiles,
    output: {
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "vendor"
        }
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 1000,
        poll: 1000
    },
    plugins: [
        new FilterWarningsPlugin({
            exclude: [/mongodb/, /mssql/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sqlite3/, /sql.js/, /typeorm-aurora-data-api-driver/]
        })
    ]
};

module.exports = config;