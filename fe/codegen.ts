import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/schema.graphql',
  documents: ['./src/graphql/**/*.graphql'],
  generates: {
    './src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        reactApolloVersion: 3,
        useTypeImports: true,
      },
    },
  },
}

export default config
