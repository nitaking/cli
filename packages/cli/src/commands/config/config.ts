/**
 */
import { Config, DependencyConfig } from '@react-native-community/cli-types';

function isValidRNDependency(config: DependencyConfig) {
  return (
    Object.keys(config.platforms).filter(key => Boolean(config.platforms[key]))
      .length !== 0 ||
    (config.hooks && Object.keys(config.hooks).length !== 0) ||
    (config.assets && config.assets.length !== 0) ||
    (config.params && config.params.length !== 0)
  );
}

function filterConfig(config: any) {
  const filtered = {
    ...config,
  };
  Object.keys(filtered.dependencies).forEach(item => {
    if (!isValidRNDependency(filtered.dependencies[item])) {
      delete filtered.dependencies[item];
    }
  });
  return filtered;
}

export default {
  name: 'config',
  description: 'Print CLI configuration',
  // @ts-ignore: TS6133: 'argv' is declared but its value is never read.
  func: async (argv: string[], ctx: Config) => {
    console.log(JSON.stringify(filterConfig(ctx), null, 2));
  },
};
