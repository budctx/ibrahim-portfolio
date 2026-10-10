import type {NextConfig} from 'next';
const nextConfig: NextConfig = {
 reactStrictMode: true,
 async rewrites() {
  return {beforeFiles:[
   {source:'/',destination:'/hero-preview/index.html'},
   {source:'/en',destination:'/hero-preview/en.html'}
  ],afterFiles:[],fallback:[]};
 },
 async redirects() {return [{source:'/ar',destination:'/',permanent:true}];}
};
export default nextConfig;
