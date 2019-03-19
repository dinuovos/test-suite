#!/usr/bin/env node
"use strict";
const dirname = process.cwd();
const testManager = require(dirname + "/test.manager.json");
const main = require("./main.js");
testManager.forEach((testModule) => {
    main(testModule);
});
