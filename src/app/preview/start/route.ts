import {cookies, draftMode} from 'next/headers';
import {NextResponse} from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const branch = url.searchParams.get('branch');
  const to = url.searchParams.get('to');

  if (!branch || !to || branch.length > 255) {
    return new Response('Missing or invalid preview parameters', {status: 400});
  }

  const destination = new URL(to, url.origin);
  if (destination.origin !== url.origin || !destination.pathname.startsWith('/projects/')) {
    return new Response('Invalid preview destination', {status: 400});
  }

  const draft = await draftMode();
  draft.enable();

  const cookieStore = await cookies();
  cookieStore.set('ks-branch', branch, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return NextResponse.redirect(destination);
}
