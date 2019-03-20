function testIntroduction(test) {
    var w =typeof window === "undefined" ? module.exports : window;
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
            var ctx;
            var expectTest = expect(window).not().toBeUndefined();
            test.expect(expectTest).toBe(true);
        });
        test.createTestCase("However, in test cases, if you don't call testSuite.expect " +
            "it will remain in pending, because this case will be interpreted as an asynchronous call",function() {
            var ctx;
            var expectTest = expect(window).not().toBeUndefined();
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
    var totalTests = test.getTotalResult.total;
    var passedTests = test.getTotalResult.passed;
    var failedTests = test.getTotalResult.failed;
    var pendingTest = test.getTotalResult.pendings;
    test.createSuite("testSuite has a getter 'getTotalResult', an object with properties:" +
        "'total','passed', 'failed' and 'pendings'." +
        "testSuite.getTotalResult was called before the declaration of this suite.",function() {
        test.createTestCase("expect testSuite.getTotalResult.total to be 13. The pending case is ignored," +
            " every test.expect in every test case will be added.",function() {
            test.expect(totalTests).toBe(13);
        });
        test.createTestCase("expect testSuite.getTotalResult.passed to be 12",function() {
            test.expect(passedTests).toBe(12);
        });
        test.createTestCase("expect testSuite.getTotalResult.failed to be 1 ( the second in the second suite )",function() {
            test.expect(failedTests).toBe(1);
        });
        test.createTestCase("expect testSuite.pendingTest.pendings to be 1 ( the second in the forth suite" +
            ", see the code )",function() {
            test.expect(pendingTest).toBe(1);
        });
    });
}