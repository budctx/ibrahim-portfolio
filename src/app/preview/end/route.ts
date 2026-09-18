import {cookies, draftMode} from 'next/headers';

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (request.headers.get('origin') !== origin) {
    return new Response('Invalid origin', {status: 400});
  }

  const referrer = request.headers.get('referer');
  if (!referrer || new URL(referrer).origin !== origin) {
    return new Response('Invalid referrer', {status: 400});
  }

  const draft = await draftMode();
  draft.disable();

  const cookieStore = await cookies();
  cookieStore.delete('ks-branch');

  return new Response(null, {
    status: 303,
    headers: {Location: referrer},
  });
}
