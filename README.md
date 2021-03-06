# Test-suite
A small test suite for javascript, both browser and node.js
# Usage
## Installation
Browser installation:
```html
<script src="https://raw.githubusercontent.com/dinuovos/test-suite/master/dist/test-suite.min.js"></script>
<script>
// create a new test!
var test = new testSuite(); 
</script>
```
Node.js installation:
```sh
npm install @dinuovos/test-suite
```
and then
```js
var {testSuite} = require("@dinuovos/test-suite");
var test = new testSuite();
```
Now you are ready to write your first testSuite!
```js
test.createSuite("TestJS test suite",function(){  
    test.createTestCase("TestCase #1",function(){  
        test.expect(1).toBe(1)  
    });  
    test.createTestCase("TestCase #2",function(){  
        var t = !false;  
        test.expect(t).toBe(true)  
    });  
});  
test.createSuite("A suite 2",function(){  
    test.createTestCase("TestCase #1",function(){  
        test.expect(1).toBe(1)  
    });  
    test.createTestCase("TestCase #2",function(){  
        var t = !false;  
        test.expect(t).toBe(false)  // false expected!!!;
    });  
});
console.log(test.tests)
// will print this
[{
        "label": "TestJS test suite",
        "testCases": [
            {
                "label": "TestCase #1",
                "value": [true]
            },
            {
                "label": "TestCase #2",
                "value": [true]
            }
        ],
        "type": "general"
    },
    {
        "label": "A suite 2",
        "testCases": [
            {
                "label": "TestCase #1",
                "value": [true]
            },
            {
                "label": "TestCase #2",
                "value": [false]
            }
        ],
        "type": "general"
    }]
``` 
## Asynchronous test
```js
// asynchronous tests  
var test = new testSuite({
 onAsyncTerminate : function(){ // function called when alla async tests are terminated
    console.log(test.tests)
 }
});
test.createSuite("testJS asynchronous", function () {  
    test.createTestCase("timeout 1 second , exit process expected after" +
    "approx 1s  ",function(done){  // <- note the callback
	    var isPer = typeof performance !== "undefined";
	    var p = isPer ? performance.now() : process.hrtime();  // we want the test work both browser and Node.js
	    setTimeout(function(){  
	        var d = isPer ? performance.now()-p : process.hrtime(p)
	        d = isPer ? d : d[0] * 1000 + (d[1] / 1e6);  
	        console.log(d);  
	        done(function() {  
	            test.expect(d).toBeCloseTo(1000, 16);  // declare expects on callback
	        });  
	    },1000);  
	 });  
 });
  // after 1 second will print
 [{
        "label": "testJS asynchronous",
        "testCases": [
            {
                "label": "timeout 1 second , exit process expected after approx 1s  ",
                "value": [true]
            }
        ],
        "type": "general"
    }]

```
## Performance test
```js
var test = new testSuite({
 onAsyncTerminate : function(){ // function called when alla async tests are terminated
    console.log(test.tests)
 }
});
test.createSuitePerformance("'for' statements or Array.prototype.forEach? Which is faster?", function () {  
    var howManyLoops = 1500;  
    var arr = new Array(howManyLoops);  
    var arr2 = new Array(howManyLoops);  
    test.createPerformanceTestCase("for statement", function () {  
        var i1;  
        var i;  
        var l = arr.length;  
        for(i1=0;i1<arr2.length;i1++) {  
            for (i = 0; i < l; i++) {  
                arr[i] = i;  
            }  
        }  
    });  
    test.createPerformanceTestCase("Array.prototype.forEach", function () {  
        var i1;  
        var i;  
        var l = arr.length;  
        arr2.forEach(function(v){  
            arr.forEach(function(i){  
                arr[i] = i;  
            })  
        });  
    });  
});
// asynchronous example
test.createSuitePerformance("expecting synchronization with js timer ( this will fail on some browser/PC if following testcases have heavy duty)",function(){  
    test.createPerformanceTestCase("expecting 1 second",function(cb){  // <- note the callback
        setTimeout(function(){  
            cb();  
        },1000);  
    },true);  // <- asynchronous performance test case expects third parameters set to true
});
  // after 1 second will print
 [{
        "label": "'for' statements or Array.prototype.forEach? Which is faster?",
        "testCases": [
            {
                "label": "for statement",
                "value": 10.01999998698011
            },
            {
                "label": "Array.prototype.forEach",
                "value": 0.109999964479357
            }
        ],
        "faster": 1,
        "slower": 0,
        "type": "perf"
    },
    {
        "label": "expecting synchronization with js timer ( this will fail on some browser/PC if following testcases have heavy duty)",
        "testCases": [
            {
                "label": "expecting 1 second",
                "value": 1000.6600000197068
            }
        ],
        "faster": 0,
        "slower": 0,
        "type": "perf"
}]
```
See much more examples in action at 
https://dinuovos.github.io/test-suite/ !

## Options
```js
/**  
 * testSuite.js default option object 
 * @property{boolean} printError - attach a listen on window (browser) and print error on console  
 * @property{boolean} attachErrorOnBody - errors will be appended to document.body ( with a giant red h1 tag )
 * @property{boolean} printLog - print testSuite.js logs on console  
 * @property{function} onAsyncTerminate - callback to be called after all async testcase will be terminated  
 * @property{function} onSuiteTerminate - callback to be called after a suite is terminated and don't have pendings  
 * */
 var defaults = {  
    printError : true,  
    printLog : true,  
    attachErrorOnBody : true,  
    onAsyncTerminate : function(){},  
    onSuiteTerminate : function(){}  
};
var tests = new testSuite(defaults );
```
## Node.js CLI
Have a look at this [@dinuovos/test-manager](https://www.npmjs.com/package/@dinuovos/test-manager)
if you want to run your tests directly from the command line.