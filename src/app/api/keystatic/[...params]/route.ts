import {makeRouteHandler} from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

type KeystaticHandlers = ReturnType<typeof makeRouteHandler>;

let handlers: KeystaticHandlers | undefined;

function getHandlers(): KeystaticHandlers | null {
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const secret = process.env.KEYSTATIC_SECRET;

  if (!clientId || !clientSecret || !secret) {
    return null;
  }

  handlers ??= makeRouteHandler({
    clientId,
    clientSecret,
    secret,
    config,
  });

  return handlers;
}

async function handle(request: Request) {
  const keystatic = getHandlers();

  if (!keystatic) {
    return new Response('Keystatic GitHub authentication is not configured for this deployment.', {
      status: 503,
    });
  }

  return request.method === 'POST' ? keystatic.POST(request) : keystatic.GET(request);
}

export const GET = handle;
export const POST = handle;
