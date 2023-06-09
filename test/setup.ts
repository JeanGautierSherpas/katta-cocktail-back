import { NestExpressApplication } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import { getInitialisedApp } from './initialise';
import { loadFixtures } from './fixtures';

let app: NestExpressApplication;
let connection: Connection;

export const JEST_TIMEOUT_DELAY = 90 * 1000;

beforeAll(async () => {
  app = await getInitialisedApp();

  connection = app.get<Connection>(Connection);

  await loadFixtures(connection);

  await app.close();
}, JEST_TIMEOUT_DELAY);

afterAll(async () => {
  if (app) {
    await app.close();
  }
}, JEST_TIMEOUT_DELAY);
