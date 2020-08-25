// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint" // 定义ESLint的解析器
  },
  env: {
    browser: true
  },
  // 定义文件继承的子规范
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"], // 定义了该eslint文件所依赖的插件
  // add your custom rules here
  rules: {
    // allow async-await
    "no-console": "off",
    indent: ["error", 2, {
      SwitchCase: 1
    }],
    semi: ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never"
      }
    ],
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'generator-star-spacing': 'off',
    // semi: 'off',
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    indent: ['error', 2]
  },
  "globals": {
    "$": true,
    "Vue": true,
    "jQuery": true
  }
};
