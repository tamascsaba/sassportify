const sassport = require('sassport');
const tools = require('browserify-transform-tools');
const assign = require('lodash.assign');
const omit = require('lodash.omit');

import {SassOptions, TransformConfig} from './interfaces';
import {getPostcssTransforms, createPostcss} from './postcss';

const defaults: TransformConfig = {
    modules: [],
    assets: null,
    sass: {
        sourceComments: false,
        sourceMap: false,
        sourceMapEmbed: false,
        sourceMapContents: false,
        outputStyle: 'compressed'
    },
    postcss: null,
};

const options = {
    includeExtensions: ['.css', '.sass', '.scss'],
    evaluateArguments: true
};

module.exports = tools.makeStringTransform(
        'sassportify',
        options,
        (
            content: string,
            opts: { file: string, config: TransformConfig },
            done: Function
        ) => {
            const file = opts.file;

            const config: TransformConfig = assign({}, defaults, omit(opts.config, '_flags'));
            const sassOpts: SassOptions = assign({}, config.sass);

            sassOpts.includePaths = sassOpts.includePaths || [];
            sassOpts.indentedSyntax = /\.sass$/i.test(file);
            sassOpts.data = content;

            if (config.postcss !== null && !(typeof config.postcss === 'object')) {
                return done(new TypeError('Postcss config must be false or an object of plugins'));
            }

            const postcssTransforms: Array<Function> = getPostcssTransforms(config.postcss);

            const sass = sassport(config.modules);

            if (config.assets !== null) {
                sass.assets(config.assets.localAssetPath, config.assets.remoteAssetPath);
            }

            sass.render(sassOpts, (err, result) => {
                if (err) {
                    return done(new SyntaxError(err.file + ': ' + err.message + ' (' + err.line + ':' + err.column + ')'));
                }

                let out = '';
                const css = config.postcss ? createPostcss(postcssTransforms, result.css) : result.css;
                const cssString: string = JSON.stringify(css.toString());
                out += ` module.exports = ${cssString};`;

                return done(null, out);
            });
    }
);
