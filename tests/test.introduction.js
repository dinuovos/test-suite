function testIntroduction(test) {
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
        test.createTestCase("TestCase #2 ( False expected! )",function(){
            var t = !false;
            test.expect(t).toBe(false)
        });
    });
    test.createSuite("Testing all and information about data output",function() {
        test.createTestCase("test.tests is an array",function() {
            test.expect(test.tests).toBeArray();
        });
        test.createTestCase("test.tests have three suites at this moment",function() {
            test.expect(test.tests.length).toBe(3);
        });
        test.createTestCase("First test(test.tests[0]) has property label set to 'TestJS test suite'",function() {
            test.expect(test.tests[0].label).toBe("TestJS test suite");
        });
        test.createTestCase("First test(test.tests[0]) has an array type property 'testCases'",function() {
            test.expect(test.tests[0].testCases).toBeArray()
        });
        test.createTestCase("Second test(test.tests[1]), " +
            "second test case(test.tests[1].testCases[1]) has an array type property 'value'",function() {
            test.expect(test.tests[1].testCases[1].value).toBeArray();
        });
        test.createTestCase("The first expect ( and the only one ) of the first suite second test case has value false",function() {
            test.expect(test.tests[1].testCases[1].value[0]).toBe(false);
        });
    });
    test.createSuite("Expect is global on window, exportable in node.js " +
        "with module.exports",function() {
        test.createTestCase("expect(window || module.exports) to be not undefined will return true",function() {
            var expectTest = expect(window || module.exports).not().toBeUndefined();
            test.expect(expectTest).toBe(true);
        });
        test.createTestCase("However, in test cases, if you don't call testSuite.expect " +
            "it will remain in pending, because this case will be interpreted as an asynchronous call",function() {
            var expectTest = expect(window || module.exports).not().toBeUndefined();
            // this will never print. test.tests[3].testCases[1].value[0] will be undefined
        });
        test.createTestCase("In test cases, if you don't call testSuite.expect " +
            "the testcase will remain in pending, because this case will be interpreted as an asynchronous call" +
            "the second test case of this suite will be undefined and will be not shown on html report",function() {
            test.expect(test.tests[3].testCases[1].value[0]).toBeUndefined();
        });
    });
    test.createSuite("Suite expose also performanceMeasuring function, " +
        "measuring the time " +
        "between performanceMeasuring.startPerf() and " +
        "performanceMeasuring.endPerf() statements",function() {
        test.createTestCase("calling these statements sequentially will produce a number greater or equal than 0",function() {
            var start = performanceMeasuring.startPerf();
            var res = performanceMeasuring.endPerf(start);
            console.log(res);
            test.expect(res).toBeGreaterThanOrEqual(0);
        });
    });
    test.drawing();
    test.createSuite("When the tests are finished, you can call testSuite.drawing(). It will create a table-like" +
        " html output, with a report of all testes you have performed until this moment",function() {
        test.createTestCase("after calling testSuite.drawing() ( before set this suite )," +
            " expect string testSuite.html have length ( default value )",function() {
            test.expect(test.html.length).toBeGreaterThan(0);
        });
        var doc = document.createElement('div');
        doc.innerHTML = test.html;
        test.createTestCase("test.html has a table with class 'testSuite-suite' ",function() {
            var sel = doc.querySelector("table.testSuite-suite");
            test.expect(sel).not().toBeUndefined();
        });
        test.createTestCase("expect table will have 5 tag th,each with a tr tag as parent and a h1 tag as children" +
            ". Finally, expect that all this h1 tags will match the corresponding text in testSuite.test[index].label",function() {
            var sel = doc.querySelectorAll("table.testSuite-suite th");
            test.expect(sel.length).toBe(5);
            NodeList.prototype.every = Array.prototype.every;
            var parentMatch = sel.every(function(v){return v.parentElement.nodeName.toLowerCase() == "tr"});
            test.expect(parentMatch).toBe(true);
            var childrenMatch = sel.every(function(v){return v.children[0].nodeName.toLowerCase() == "h1"});
            test.expect(childrenMatch).toBe(true);
            var h1s = doc.querySelectorAll("table.testSuite-suite th h1");
            var labelMatch = h1s.every(function(v,i){
                return v.textContent == test.tests[i].label
            });
            test.expect(labelMatch).toBe(true);
        });
    });
    var totalTests = test.getTotalResult.total;
    var passedTests = test.getTotalResult.passed;
    var failedTests = test.getTotalResult.failed;
    var pendingTest = test.getTotalResult.pendings;
    test.createSuite("testSuite has a getter 'getTotalResult', an object with properties:" +
        "'total','passed', 'failed' and 'pendings'." +
        "testSuite.getTotalResult was called before the declaration of this suite.",function() {
        test.createTestCase("expect testSuite.getTotalResult.total to be 19. The pending case is ignored," +
            " every test.expect in every test case will be added ( for example the third test case in the sixth suite" +
            " has four expects in it ).",function() {
            test.expect(totalTests).toBe(19);
        });
        test.createTestCase("expect testSuite.getTotalResult.passed to be 18",function() {
            test.expect(passedTests).toBe(18);
        });
        test.createTestCase("expect testSuite.getTotalResult.failed to be 1 ( the second in the second suite )",function() {
            test.expect(failedTests).toBe(1);
        });
        test.createTestCase("expect testSuite.pendingTest.pendings to be 1 ( the second in the forth suite )",function() {
            test.expect(pendingTest).toBe(1);
        });
    });
}
if(typeof window !== "undefined")
    window.testIntroduction = testIntroduction;
else
    module.exports = testIntroduction;