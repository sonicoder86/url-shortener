import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  setupFiles: ['dotenv/config'],
  passWithNoTests: true,
};
export default config;
