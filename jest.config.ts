import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  setupFiles: ['dotenv/config'],
  passWithNoTests: true,
  rootDir: 'src',
};
export default config;
