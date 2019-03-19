(function(){
    function testDataOrganization(test) {
        test.createSuite("testJS data organization", function () {
            test.createTestCase("The first suite label is \"testJS data organization\"", function () {
                test.expect(test.tests[0].label).toBe('testJS data organization');
            });
            test.createTestCase("The First Case label \"The first case is 'testJS data organization'\"", function () {
                test.expect(test.tests[0].testCases[0].label).toBe("The first suite label is \"testJS data organization\"");
            });
            test.createTestCase("The first three cases ( including this ) are true", function (e) {
                var test1 = test.expect(test.tests[0].testCases[0].value[0]).toBe(true);
                var test2 = test.expect(test.tests[0].testCases[1].value[0]).toBe(true);
                test.expect(test1 && test2).toBe(true);
            });
            test.createTestCase("a test case can have more values from more expects, like the one before", function () {
                var testCasesItems = test.tests[0].testCases[2].value;
                test.expect(Array.isArray(testCasesItems)).toBe(true);
            });
        });
        // asynchronous tests
        var isPer = typeof performance !== "undefined";
        function testAsynchronousTimeout(ms,done){
            var p = isPer ? performance.now() : process.hrtime();
            setTimeout(function(){
                var d = isPer ? performance.now()-p : process.hrtime(p);
                d = isPer ? d : d[0] * 1000 + (d[1] / 1e6);
                console.log(d);
                done(function() {
                    test.expect(d).toBeCloseTo(ms, 16);
                });
            },ms);
        }
        test.createSuite("testJS asynchronous", function () {
            test.createTestCase("timeout 1 second , exit process expected after approx 1s  ",function(done){
                testAsynchronousTimeout(1000,done)
            });
            test.createTestCase("timeout 2 seconds , exit process expected after approx 2s  ",function(done) {
                testAsynchronousTimeout(2000,done)
            });
            test.createTestCase("timeout 4 seconds , exit process expected after approx 4s  ",function(done) {
                testAsynchronousTimeout(4000,done)
            })
        });
    }
    if(typeof window !== "undefined")
        window.testDataOrganization = testDataOrganization;
    else
        module.exports = testDataOrganization;
})();