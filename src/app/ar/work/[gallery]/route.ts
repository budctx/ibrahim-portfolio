import {galleryResponse} from '@/lib/gallery-page';
export const runtime = 'nodejs';
export async function GET(_request: Request, context: {params: Promise<{gallery: string}>}) {
  return galleryResponse((await context.params).gallery, 'ar');
}
