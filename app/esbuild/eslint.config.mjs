export default {
  env: {
    browser: true,
    es2021: true,
  },
  //   extends: ['plugin:vue/vue3-essential', 'standard'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ], // 使用Prettier的ESLint规则
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    // 禁止出现console
    'no-console': 'error',
    // 禁用debugger
    'no-debugger': 'warn',
  },
};
