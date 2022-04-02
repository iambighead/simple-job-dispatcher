module.exports = {
    "env": {
        "commonjs": true
        , "es6": true
        , "node": true
    }
    , "extends": "eslint:recommended"
    , "globals": {
        "Atomics": "readonly"
        , "SharedArrayBuffer": "readonly"
    }
    , "parserOptions": {
        "ecmaVersion": 2018
    }
    , "rules": {
        "no-async-promise-executor": [0]
        , "no-console": [0]
        , "no-unused-vars": [
            1, {
                "vars": "all"
            }
        ]
        , "semi": ["error", "always"]
        , "camelcase": "off"
        , "typescript-eslint/class-name-casing": "off"
        , "@typescript-eslint/naming-convention": "off"
    }
};