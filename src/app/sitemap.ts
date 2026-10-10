import type {MetadataRoute} from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
 return ['/', '/en'].map(path=>({
 url:'https://ibrahim-portfolio-blush.vercel.app'+path,
 changeFrequency:'monthly',
 priority:1,
 alternates:{languages:{ar:'https://ibrahim-portfolio-blush.vercel.app/',en:'https://ibrahim-portfolio-blush.vercel.app/en'}}
 }));
}
