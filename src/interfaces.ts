export interface TransformConfig {
    modules: Array<any>;
    assets: {
        localAssetPath: string,
        remoteAssetPath: string
    };
    sass?: SassOptions;
    postcss?: Object;
}

export interface SassOptions {
    file?: string;
    data?: string;
    functions?: { [key: string]: Function };
    includePaths?: string[];
    indentedSyntax?: boolean;
    indentType?: string;
    indentWidth?: number;
    linefeed?: string;
    omitSourceMapUrl?: boolean;
    outFile?: string;
    outputStyle?: string;
    precision?: number;
    sourceComments?: boolean;
    sourceMap?: boolean | string;
    sourceMapContents?: boolean;
    sourceMapEmbed?: boolean;
    sourceMapRoot?: boolean;
}
