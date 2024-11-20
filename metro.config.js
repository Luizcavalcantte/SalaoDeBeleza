const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = (() => {
  // Obtém a configuração padrão do React Native
  const config = getDefaultConfig(__dirname);

  const {transformer, resolver} = config;

  // Modifica a configuração para adicionar o suporte a SVG
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return config;
})();
