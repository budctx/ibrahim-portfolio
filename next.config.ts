import type {NextConfig} from 'next';
const nextConfig: NextConfig = {
 reactStrictMode: true,
 outputFileTracingIncludes: {
  '/work/*': ['./content/graphic-designs/**/*.yaml'],
  '/ar/work/*': ['./content/graphic-designs/**/*.yaml'],
 },
 async rewrites() {
  return {beforeFiles:[
   {source:'/',destination:'/hero-preview/index.html'},
   {source:'/en',destination:'/hero-preview/en.html'}
  ],afterFiles:[],fallback:[]};
 },
 // Prevent preview deployments from being indexed, even when static Hero HTML
 // contains production-facing meta robots directives. Production is unaffected.
 async headers() {
  return process.env.VERCEL_ENV === 'preview'
   ? [{source:'/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'}]}]
   : [];
 },
 async redirects() {return [{source:'/ar',destination:'/',permanent:true}];}
};
export default nextConfig;
