const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({testDir:'./tests',testMatch:'case-study.spec.cjs',timeout:45000,workers:2,reporter:[['list'],['json',{outputFile:'test-results/case-study-results.json'}]],use:{baseURL:process.env.CASE_STUDY_BASE_URL||'http://127.0.0.1:3102',headless:true,trace:'retain-on-failure',screenshot:'only-on-failure'}});
