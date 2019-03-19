const dirname = process.cwd();
const fs = require('fs');
const puppeteer = require("./puppeteer.js");
const {testSuite} = require(dirname + "/dist/test-suite.js");
const EventEmitter = require('events');
const myEE = new EventEmitter();
var headlessTests = [],nodeTest = [];
function main(testModule) {
    var moduleNameSlash = testModule.module.split("/");
    var moduleNameBack = moduleNameSlash[moduleNameSlash.length - 1].split("\\");
    var moduleName = moduleNameBack[moduleNameBack.length - 1];
    var wstream = fs.createWriteStream(moduleName + '.json');
    wstream.on('error', function (err) {
        console.error(err);
    });
    var test = new testSuite({
        onSuiteTerminate: (t)=> console.log("[testsuite test][" + t.label + "] finished"),
        onAsyncTerminate: ()=> {
            wstream.write(JSON.stringify(test.tests, null, 4));
        }
    });
    if (testModule.headless)
        (async() => {
            console.log(testModule.label + " started");

            await puppeteer(dirname + testModule.module, moduleName, dirname).then(function (tests) {
                test.tests = test.tests.concat(tests);
            }).catch((error) => {
                console.error("[testsuite test] puppeteer module error");
                console.error(error);
            });
        })();
    else {
        console.log("[testsuite test] " + testModule.label + " started");
        var module = require(dirname + "/" + testModule.module);
        module(test);
        if (!test.asyncTests.pendingTests.length) {
            wstream.write(JSON.stringify(test.tests, null, 4));
            wstream.end();
            console.log("[testsuite test]" + testModule.label + " finished without pendings");
        }
        else
            console.log("[testsuite test]" + testModule.label + " has pendings");
    }
}
module.exports = main;