import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintReact from '@eslint-react/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintReact.configs['recommended-typescript'],
  reactHooks.configs.flat.recommended,
  {
    rules: {
      '@eslint-react/dom-no-dangerously-set-innerhtml': 'off',
      'sort-imports': 
        [
          "error", 
          { 
            "ignoreCase": true, 
            "ignoreDeclarationSort": true 
          }
        ],
    }
  },
  {
    ignores: ["**/dist/"]
  }
]
