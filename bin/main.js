"use strict";
const dirname = process.cwd();
const fs = require('fs');
const puppeteer = require("./puppeteer.js");
var {testSuite} = require(dirname + "/dist/test-suite.js");
module.exports = ((testModule,moduleName) =>{
    return new Promise(function(resolve,reject){
        if (testModule.headless) {
            (async() => {
                console.log(testModule.label + " started");
                await puppeteer(dirname + testModule.module, moduleName, dirname).then(function (test) {
                    console.log("[testsuite test - puppeteer module]" + testModule.label + " terminated");
                    console.log("[testsuite test - puppeteer module getTotalResult] ", test.getTotalResult);
                    resolve(test);
                }).catch((error) => {
                    console.error("[testsuite test] puppeteer module error");
                    console.error(error);
                    reject(error);
                });
            })();
        }
        else {
            var test = new testSuite({
                onSuiteTerminate: (t)=> {
                    console.log("\x1b[35m%s\x1b[0m", "[testsuite test suite][" + t.label + "] finished");
                },
                onAsyncTerminate: (t)=> {
                    console.log("\x1b[43m%s\x1b[0m", "[testsuite test - asynchronous module]" + testModule.label + " terminated");
                    console.log("\x1b[43m%s\x1b[0m", "[testsuite test getTotalResult module] ", t.getTotalResult);
                    resolve(t);
                }
            });
            console.log("[testsuite test module] " + testModule.label + " started");
            var module = require(dirname + "/" + testModule.module);
            module(test);
            if (!test.asyncTests.pendingTests.length) {
                console.log("[testsuite test module]" + testModule.label + " finished without pendings");
                console.log("[testsuite test getTotalResult] ", test.getTotalResult);
                resolve(test);
            }
            else
                console.log("\x1b[33m%s\x1b[0m", "[testsuite test module]" + testModule.label + " has pendings");
        }
    })
});