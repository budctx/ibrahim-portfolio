import {makeRouteHandler} from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

const githubActionsFallback = process.env.GITHUB_ACTIONS === 'true' ? 'ci-placeholder' : undefined;

export const {POST, GET} = makeRouteHandler({
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? githubActionsFallback,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ?? githubActionsFallback,
  secret: process.env.KEYSTATIC_SECRET ?? githubActionsFallback,
  config,
});
