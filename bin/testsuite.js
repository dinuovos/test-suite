#!/usr/bin/env node
"use strict";
const dirname = process.cwd();
const fs = require('fs');
const testManager = require(dirname + "/test.manager.json");
const main = require("./main.js");
if (!fs.existsSync(dirname + "/tests"))
    fs.mkdirSync(dirname + "/tests");
if(!fs.existsSync(dirname + "/tests/tests-report"))
    fs.mkdirSync(dirname + "/tests/tests-report");
var modules = testManager.length;
var modulesProcessed = 1;
(async()=> {
    for(var i = 0;i<testManager.length;i++) {
        var moduleNameSlash = testManager[i].module.split("/");
        var moduleNameBack = moduleNameSlash[moduleNameSlash.length - 1].split("\\");
        var moduleName = moduleNameBack[moduleNameBack.length - 1];
        await main(testManager[i], moduleName).then(function (test) {
            console.log("\x1b[36m%s\x1b[0m", "[testsuite write json reports] report: ", moduleName);
            var wstream = fs.createWriteStream('./tests/tests-report/' + moduleName + '.json');
            wstream.on('error', function (err) {
                console.error("[testsuite write error]\n", err);
            });
            var res = test.getTotalResult;
            var resObj = {
                total: res.total,
                passed: res.passed,
                failed: res.failed,
                pendings: res.pendings,
                tests: test.tests
            };
            wstream.write(JSON.stringify(resObj, null, 4));
            wstream.end();
            console.log("\x1b[1m%s\x1b[0m", "[testsuite write json reports #"
                + (modulesProcessed++) +
                " of " + testManager.length + "] " +
                moduleName + " writed");
            modules--;
            if (modules == 0)
                console.log("\x1b[1m%s\x1b[0m", "All modules processed");
        });
    }
})();
