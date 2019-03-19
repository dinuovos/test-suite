const puppeteer = require('puppeteer');
const fs = require('fs');
function testPuppeteer(url,filename,path){
    return new Promise(async(resolve,reject) =>{
        var browser;
        try {
            browser = await puppeteer.launch();
            const pid = browser.process().pid;
            console.log("[puppeteer test] puppeteer is testing on url ", url);
            console.log("[puppeteer test] with pid ", pid);
            const page = await browser.newPage();
            await page.goto(url,{
                waitUntil:'networkidle2',
                timeout:300000
            });
            page
                .waitForSelector('.testSuite-suite')
                .then(async() => {
                    var ua = await page.evaluate(() => window.navigator.userAgent);
                    var uaTestPhrase = "[puppeteer test] Puppeteer test on \n" + ua + "\n";
                    var tableResult = await page.evaluate(() => document.querySelector('.testSuite-suite').outerHTML);
                    var testResult = await page.evaluate(() => window.test.getTotalResult);
                    var tests = await page.evaluate(() => window.test.tests);
                    if (testResult.passed) {
                        console.log("\x1b[32m",
                            uaTestPhrase +
                            " gave no false test. Check " + filename +
                            "-puppeteer-testresult.html" + " for more info",
                            "\x1b[0m")
                    }
                    else
                        console.error("\x1b[31m",
                            uaTestPhrase + " gave falses tests. Check " + filename +
                            "-puppeteer-testresult.html" + " for more info",
                            "\x1b[0m");
                    resolve(tests);
                    await browser.close(()=>console.log("--- BROWSER EXIT ---"));
                });
        }
        catch(e){
            console.log("[puppeteer test] Puppeteer launcher error");
            console.log(e);
            if(browser)
                (async()=> await browser.close(()=>console.log("--- BROWSER EXIT ---")) )();
            reject(e);
        }
    });
}
module.exports = testPuppeteer;