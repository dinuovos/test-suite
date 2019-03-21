"use strict";
(function(w,isw){/**
 * wrapper around console.log to print colors
 */
function c(msg,color){
    !isw && console.log(color || "",
        msg,
        "\x1b[0m");
    isw && console.log('%c'+
        msg,
        color ? "color:" + color : "");
}
function merge(add,base,extension) {
    if(Object.hasOwnProperty('assign'))
        return Object.assign(base,add);
    var target = Array.isArray(base) ? [] : {};
    for (var i in base) {
        var typeNode = Object.prototype.toString.call(base[k]);
        if ( ( typeNode == "[object Object]" || typeNode == "[object Array]" ) &&
               base[i] )
            target[i] = add[i] ? merge(add[i],base[i],extension) : base[i];
        else
            target[i] = add[i] || base[i];
    }

    if(extension)
        for (var k in add)
            target[k] = target[k] || add[k];

    return target;
}

/**
 * testSuite.js default option object
 * @property{boolean} printError - attach a listen on window (browser) and print error on console
 * @property{boolean} attachErrorOnBody - errors will be appended to document.body
 * @property{boolean} printLog - print testSuite.js logs on console
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
(function(w){
    function expect(el, options){
        this.el = el;
        this.negation = false;
        this.options = options || {};
        return this;
    }
    function returnFunction(test){
        var $self = this;
        if($self.negation){
            test = !test;
        }
        if($self.options.cb)
            $self.options.cb(test);
        return test;
    }
    expect.prototype.not = function(){
        this.negation = !this.negation;
        return this;
    };
    expect.prototype.toBe = function(value){
        var $self = this;
        var test = $self.el === value;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeUndefined = function(){
        var $self = this;
        var test = typeof $self.el === "undefined";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeNull = function(){
        var $self = this;
        var test = $self.el === null;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeBoolean = function(){
        var $self = this;
        var test = typeof $self.el === "boolean";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeNumber = function(){
        var $self = this;
        var test = typeof $self.el === "number";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeString = function(){
        var $self = this;
        var test = typeof $self.el === "string";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeObject= function(){
        var $self = this;
        var test = typeof $self.el === "object";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeArray= function(){
        var $self = this;
        var test = Array.isArray($self.el);
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeDate= function(){
        var $self = this;
        var test = Object.prototype.toString.call($self.el) === '[object Date]';
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeInView = function(partially,minwidth,minheight){
        var $self = this;
        minwidth = minwidth || 1;
        minheight = minheight || 1;
        if(!$self.el instanceof Element)
            throw new Error("toBeInView called without HTMLElement, or wrong type");
        var rect = $self.el.getBoundingClientRect();
        var test;
        var documentWidth = document.documentElement.clientWidth;
        var documentHeight = document.documentElement.clientHeight;
        if(partially){
            test = (
                !(rect.top == 0 && rect.bottom == 0 && rect.left == 0 && rect.right == 0 ) &&
                ( ( rect.top >= 0 && rect.top < documentHeight ) ||
                ( rect.bottom < documentHeight && rect.bottom >= 0  ) ) &&
                ( ( rect.left >= 0 && rect.left < documentWidth ) ||
                ( rect.right < documentWidth && rect.right >= 0 ) )
            );
        }
        else {
            test = (
                !(rect.top == 0 && rect.bottom == 0 && rect.left == 0 && rect.right == 0 ) &&
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= document.documentElement.clientHeight &&
                rect.right <= document.documentElement.clientWidth
            );
        }
        if(test && rect.width < minwidth || rect.height < minheight)
            test = false;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeCloseTo = function(value,precision){
        var $self = this;
        precision = precision || 1;
        var test = isNaN(value) ? false :
        ( ($self.el + precision ) >= value && $self.el <= value )||
        ( ($self.el - precision ) <= value && $self.el >= value );
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeGreaterThan = function(value){
        var $self = this;
        var test = $self.el > value;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeGreaterThanOrEqual = function(value){
        var $self = this;
        var test = $self.el >= value;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeLessThan = function(value){
        var $self = this;
        var test = $self.el < value;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeLessThanOrEqual = function(value){
        var $self = this;
        var test = $self.el <= value;
        return returnFunction.call(this,test)
    };
    w.expect = function(el,options){
        return new expect(el,options);
    };
})(typeof window !== "undefined" ? window : module.exports);
(function(w){
    w.performanceMeasuring = {
        startPerf: function () {
            return w.performance ? w.performance.now() : process.hrtime();
        },
        endPerf : function (time){
            if (w.performance)
                return w.performance.now() - time;
            else {
                var diff = process.hrtime(time);
                console.log(diff);
                return ( diff[0] * 1000 ) + ( diff[1]/ 1e6 );
        }
    }
};
})(typeof window !== "undefined" ? window : module.exports);

function windowErrorMonitoring(attachErrorOnBody) {
    if(window)
        window.addEventListener('error', function (e) {
            var msg = "Message: " + e.message;
            var filename = "\nFilename: " + e.filename;
            var colno = "\n Position -> line: " + e.lineno + ", col: " + e.colno;
            var error = "\n Error: " + e.error;
            console.error("[testSuite.js logging window errors]", msg, filename, colno, error);
            if(attachErrorOnBody)
                document.body.innerHTML += "<h1 style=" +
                    "'width:100%!important;display:block!important;opacity:1!important;" +
                    "color:red!important;text-shadow: 1px 1px 1em black!important;" +
                    "font-size:24px!important;position:static!important;float:left!important;" +
                    "transform:none!important;text-indent:0!important'>" +
                    "[testSuite.js error monitoring]\n" + msg + filename + colno + error + "</h1>"
        });
    else{
        var EventEmitter = require('events');
        var myEmitter = new EventEmitter();
        myEmitter.on('error',function(err){
            console.error("[testSuite.js error monitoring]\n",JSON.stringify(err));
        });
    }
}
/** testSuite main class */
/**
 * Create a testSuitejsObject.
 * @constructor
 * @param {object} options - See defaults.js
 */
function testSuite(options){
    /**
     * @return {testSuite.object} testSuite object
     * @property{object} testSuite.options - defaults merged with var options
     * @property{function} testSuite.log- if options.printLog=true, log function
     * @property{testSuiteObject} tests - tests object {@see testSuite.createSuite}
     * @property{htmlString} html - html in the form of table representing the test captured by testSuite.drawing()
     * @property{window} testWindowPopup - window used to show the results in html code. Initally undefined
     * @property{Number} __testcase - testcase processed.
     */
    var $self = this;
    $self.options = merge(options || {},defaults,true) ;
    $self.log = $self.options.printLog ? c : function(){};
    $self.tests = [];
    $self.html = "";
    $self.__testcase = null;
    $self.__testsuite = null;
    /*
     * @property{Object} testSuite.asyncTests
     * @property{Array} testSuite.asyncTests.pendingTests - tests in pending
     * @property{function} testSuite.asyncTests.add - add a test pending
     * @param{testcaseObject} testcase - testcase to be added by testSuite.asyncTests.add to testSuite.asyncTests.pendingTests
     * @param{testSuiteObject} testsuite - testsuite to be added by testSuite.asyncTests.add to testSuite.asyncTests.pendingTests
     * @property{function} testSuite.asyncTests.remove - remove a test pending
     * @param{testSuiteObject} testsuite - testsuite to be removed from testSuite.asyncTests.pendingTests
     */
    $self.asyncTests = {
        pendingTests: [],
        add: function (testcase,suite) {
            var testPendingObj = {
                testcase : testcase,
                suite : suite
            };
            return this.pendingTests.push(testPendingObj);
        },
        remove: function (testcase) {
            this.pendingTests = this.pendingTests.filter(function(e) { return e.testcase !== testcase });
            if (!this.pendingTests.length)
                $self.options.onAsyncTerminate($self);
        }
    };
    if (isw)
        windowErrorMonitoring($self.options.printLog);
}
/**
 * Return totalTest
 * @method{getter} getTotalResult - testcase processed.
 * @return {object}
 * @property {number} total - Number representing the test cases created
 * @property {number} passed - Number representing the test cases with value true
 * @property {number} failed - Number representing the test cases with value failed
 * @property {number} pendings - Number representing the pending test cases
 */
Object.defineProperty(testSuite.prototype, "getTotalResult", {
    get: function() {
        var $self = this;
        var tests = $self.tests;
        var returnObj = {
            total : 0,
            passed : 0,
            failed : 0,
            pendings : $self.asyncTests.pendingTests.length
        };
        tests.forEach(function(suite){
            return suite.testCases.forEach(function(testcase){
                if(!Array.isArray(testcase.value)) { // case suite performance
                    if (!isNaN(testcase.value))
                        returnObj.passed++;
                    else
                        returnObj.failed++;

                    returnObj.total++;
                }
                else
                    testcase.value.forEach(function(v,i){ // case suite general
                        returnObj.total++;
                        if(v)
                            returnObj.passed++;
                        else
                            returnObj.failed++;
                    });
            });
        });
        return returnObj
    }
});
/**
 * Method to Create a Suite
 * @method{function} testSuite.createSuite - create a suite
 * @property{string} label - TestSuite label
 * @property{function} cb - Callback
 */
testSuite.prototype.createSuite = function(label,cb){
    var $self = this;
    var thisSuiteI = $self.tests.push({
        label : label,
        testCases : [],
        type : "general"
    });
    $self.log("[testSuite.js creating general suite] " + label);
    cb();
    if($self.asyncTests.pendingTests.filter(function(e) {
            return e.suite === $self.tests[thisSuiteI-1]
        }).length) // is async
        $self.log("[testSuite.js general suite] suite called \n" + label + " \nhave asynchronous test cases");
    else
        $self.options.onSuiteTerminate($self.tests[thisSuiteI - 1]);

};
/**
 * Create a test case
 * @method{function} testSuite.createTestCase - create a test case
 * @property{string} label - test case label
 * @property{function} cb - Callback
 */
testSuite.prototype.createTestCase = function(label,cb){
    var $self = this;
    var testSuite = $self.tests[$self.tests.length-1];
    /**
     * @throws {error} if not defined in browserTestSuite.testSuite cb.
     */
    if (!testSuite || testSuite.type != 'general')
        throw new Error("testSuite().createTestCase called without " +
            "browserTestSuite.testSuite defined. Declaring testSuite is expected," +
            " defining a testCase in suitePerformance is not possible");

    var testCaseI = testSuite.testCases.push({
        label: label,
        value: []
    });
    $self.__testcase = testSuite.testCases[testCaseI-1];
    var originalValueLength = $self.__testcase.value.length;
    var testCaseAsyncCb = function(acb){
        $self.__testcase = testSuite.testCases[testCaseI-1];
        $self.__testsuite = testSuite;
        acb();
    };
    cb(testCaseAsyncCb);
    if($self.__testcase.value.length == originalValueLength)// is async (or no expect was added...)
        $self.asyncTests.add($self.__testcase,testSuite);
};
/**
 * Expect interface
 * @method{function} testSuite.expect - interface to expect class. {@see expect.js}
 */
testSuite.prototype.expect = function(el){
    var $self = this;
    var testSuite = $self.tests[$self.tests.length - 1];
    if (typeof testSuite === "undefined")
        throw new Error("testSuite().expect called without testSuite defined. Declaring general testSuite is expected");
    var testCase = testSuite.testCases[testSuite.testCases.length - 1];
    if(typeof testCase === "undefined")
        throw new Error("testSuite().expect called without testCase defined. Declaring general testSuite is expected");
    var options = {
        cb : function(test){
            testSuite = $self.__testsuite;
            testCase = $self.__testcase;
            testCase.value.push(test);
            $self.log("[testSuite.js creating testcase] " + testCase.label);
            // assign colors to console...
            var color = isw ? "green" : "\x1b[32m "; // Bright green
            if(!test)
                color = isw ? "red" : "\x1b[31m "; // Bright red
            $self.log("[testSuite.js"+ testCase.label +" #"
                + (testCase.value.length-1) + "]"
                + " = " + test, color);
            // remove pending test if exists
            if($self.asyncTests.pendingTests.filter(function(e){
                    return e.testcase === testCase
                }).length) {
                $self.asyncTests.remove(testCase);
                // check if there are other pending cases on this suite
                // if yes, call onSuiteTerminate
                !$self.asyncTests.pendingTests.filter(function (e) {
                    return e.suite === testSuite
                }).length && $self.options.onSuiteTerminate(testSuite);
            }
        }
    };
    return w.expect(el,options);
};
/**
 * Create a html table representing the suite presents in testSuite.tests
 * and write in testSuite.html
 */
testSuite.prototype.drawing = function(){
    var $self = this;
    var testing = '<table class="testSuite-suite" width="100%"><tbody>';
    var tests = $self.tests;
    var testsLenght = tests.length;
    var test;
    // cycling tests
    for(test=0;test<testsLenght;test++) {
        testing+='<tr><th colspan="2"><h1>' + tests[test].label + '</h1></th></tr>';
        var testSuite = tests[test];
        var testCases = testSuite.testCases;
        var testCasesLength = testCases.length;
        var testCase,color = "",numbering = "";
        // cycling testsCases
        for(testCase=0;testCase<testCasesLength;testCase++){
            var theTestCase = testCases[testCase];
            var entries = theTestCase.value;
            var entry;
            // case suite perf
            if(!Array.isArray(entries) && testSuite.type=="perf"){ // perf case
                color = testSuite.faster == testCase
                    ? "green" : "red";
                testing += '<tr style="color:white;text-align:center;background-color:'+ color
                    + '">';
                testing += '<td style="width:50%"><h3 style="padding:0 10px">'  + theTestCase.label + '</h3></td><td><h4>'
                    + entries + '</h4></td>';
                testing += '</tr>';
                continue;
            }
            // cycling value entries ( a test case can have more values from more expects )
            var entriesLength = entries.length;
            for(entry = 0;entry<entriesLength;entry++) {
                color = entries[entry]
                    ? "green" : "red";
                testing += '<tr style="color:white;text-align:center;background-color:'+ color
                    + '">';
                numbering = entries.length > 1 ? " #" + entry  : "";
                testing += '<td style="width:50%"><h3 style="padding:0 10px">'  + testCases[testCase].label + numbering + '</h3></td><td><h4>'
                    + entries[entry] + '</h4></td>';
                testing += '</tr>'
            }

        }
    }
    testing += "</tbody></table>";
    $self.html = testing;
    return $self;
};
/**
 * Create a new window with testSuite.html as content. set new window in this.testWindowPopup
 */
testSuite.prototype.showHtmlInPopUp = function(){
    var $self = this;
    $self.testWindowPopup = window.open("","_blank","scrollbars=yes,width=320,height=550");
    $self.testWindowPopup.document.write(this.html);
    window.addEventListener('unload', function(event) {
        $self.testWindowPopup && $self.testWindowPopup.close();
    });
    return this;
};
/**
 * Insert testSuite.html into a DOM element
 * @property{DOMelement} el=document.body - DOM element where place testSuite.html
 * @property{boolean} append - If present, the DOM will be appended instead of replace the entire content
 */
testSuite.prototype.showHtml = function (el, append){
    el = el || document.body;
    if(append)
        el.innerHTML += this.html;
    else
        el.innerHTML = this.html;
    return this;
};
/**
 * Method to Create a createPerformanceTestCase Suite
 * @method{function} testSuite.createSuitePerformance - create a suite
 * @property{string} label - TestSuite label
 * @property{function} cb - Callback
 */
testSuite.prototype.createSuitePerformance = function(label,cb){
    var $self = this;
    var thisSuiteI = $self.tests.push({
        label : label,
        testCases : [],
        get faster(){
            var faster = this.testCases.concat().sort(function(a, b) {
                return a.value - b.value;
            });
            return this.testCases.indexOf(faster[0]);
        },
        get slower(){
            var slower = this.testCases.concat().sort(function(a, b) {
                return b.value - a.value;
            });
            return this.testCases.indexOf(slower[0]);
        },
        type : "perf"
    });
    $self.log("[testSuite.js creating performance suite] " + label);
    cb();
    if($self.asyncTests.pendingTests.filter(function(e) {
            return e.suite === $self.tests[thisSuiteI-1]
        }).length) // is async
        $self.log("[testSuite.js performance suite] suite called \n" + label + " \nhave asynchronous test cases");
    else
        $self.options.onSuiteTerminate($self.tests[thisSuiteI - 1]);
};
/**
 * Method to Create a performance test case
 * @method{function} testSuite.createPerformanceTestCase - create performance test case
 * @property{string} label - test case label
 * @property{function} cb - Callback
 * @property{boolean} async - if the test case is asynchronous or not
 */
testSuite.prototype.createPerformanceTestCase = function(label,cb,async){
    var $self = this;
    var testSuite = $self.tests[$self.tests.length-1];
    var delta,startTime;
    var asyncCb = function(rcb) {
        delta = w.performanceMeasuring.endPerf(startTime);
        var testCaseNumber = testSuite.testCases.push({
                label: label,
                value: delta
            });
        // assign colors to console...
        var color = isw ? "green" : "\x1b[32m "; // Bright green
        if(testSuite.faster != testCaseNumber-1)
            color = isw ? "red" : "\x1b[31m "; // Bright red
        $self.log("[testSuite.js testcase performance terminated] " + label + " - test case #"
            + (testCaseNumber-1)
            + " = " + delta, color);
        async && $self.asyncTests.remove(cb);
        async && !$self.asyncTests.pendingTests.filter(function(e) {
            return e.suite === testSuite
        }).length && $self.options.onSuiteTerminate(testSuite);
        async && rcb && rcb(delta);
    };
    startTime = w.performanceMeasuring.startPerf();
    if (async) {
        $self.asyncTests.add(cb,testSuite); // we pass the cb because the test case is defined after the cb, is different for every call
        cb(asyncCb);
    }
    else {
        cb();
        asyncCb();
        return delta;
    }
};w.testSuite = testSuite;})(typeof window !== "undefined" ? window : module.exports,typeof window !== "undefined");