/**
 * testSuite.js default option object
 * @property{boolean} printError - attach a listen on window (browser) or emitter(node.js) and print error on console
 * @property{boolean} attachErrorOnBody - errors will be appended to document.body
 * @property{boolean} printLog - print testSuite.js logs on console
 * @property{function} beforeAllSuites - callback to be called before a suite is started
 * @property{function} afterAllSuites - callback to be called after a suite is terminated
 * @property{function} onAsyncTerminate - callback to be called after all async testcase will be terminated
 * @property{function} onSuiteTerminate - callback to be called after a suite is terminated and don't have async pendings
 * */
var defaults = {
    printError : true,
    printLog : true,
    attachErrorOnBody : true,
    onAsyncTerminate : function(){},
    onSuiteTerminate : function(){}
};