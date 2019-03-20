"use strict";
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
                    var uaTestPhrase = "[puppeteer test] Puppeteer test\n" +
                        filename +
                        "\n on \n" + ua + "\n";
                    var tableResult = await page.evaluate(() => document.querySelector('.testSuite-suite').outerHTML);
                    var testResult = await page.evaluate(() => window.test.getTotalResult);
                    var test = await page.evaluate(() => window.test);
                    if (!testResult.failed && !testResult.pendings) {
                        console.log("\x1b[32m",
                            uaTestPhrase +
                            " gave no false test." +
                            "\n" + JSON.stringify(testResult) +"\n"+
                            "Check " + filename +
                            "-puppeteer-testresult.html" + " for more info",
                            "\x1b[0m")
                    }
                    else
                        console.error("\x1b[31m",
                            uaTestPhrase + " gave falses or pendings tests. " +
                            "\n" + JSON.stringify(testResult) +"\n"+
                            "Check " + filename +
                            "-puppeteer-testresult.html" + " for more info",
                            "\x1b[0m");

                    test.getTotalResult = testResult;
                    resolve(test,testResult);
                    await browser.close(()=>console.log("--- BROWSER EXIT ---"));
                });
        }
        catch(e){
            console.error("[puppeteer test error] Puppeteer launcher error at",filename);
            console.error(e);
            if(browser)
                (async()=> await browser.close(()=>console.log("--- BROWSER EXIT ---")) )();
            reject(e);
        }
    });
}
module.exports = testPuppeteer;