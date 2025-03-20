const path = require('path');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    // ... resto de su configuración webpack
    plugins: [
        // ... otros plugins
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
            debugProtectionInterval: 3000,
            disableConsoleOutput: true,
            unicodeEscapeSequence: true
        })
    ]
}; 