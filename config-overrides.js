const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = function override(config, env) {
    if (env === 'production') {
        // Aplicar ofuscación solo en producción
        config.plugins.push(
            new JavaScriptObfuscator({
                rotateStringArray: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                stringArrayThreshold: 0.8,
                identifierNamesGenerator: 'hexadecimal',
                renameGlobals: false,
                selfDefending: true,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                debugProtection: true,
                debugProtectionInterval: true,
                disableConsoleOutput: true,
                unicodeEscapeSequence: true
            })
        );
    }

    return config;
}; 