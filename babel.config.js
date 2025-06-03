module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          components: './src/components',
          hooks: './src/hooks',
          routes: './src/routes',
          assets: './src/assets',
          pages: './src/pages',
          utlis: './src/utlis',
        },
      },
    ],
  ],
};
