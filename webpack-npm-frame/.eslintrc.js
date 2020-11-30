module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  plugins: ["eslint-plugin-html"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  globals: {
		"values": true,
    "entries": true
  }
};
