(function(w){
    function testExpectModule(test) {
        test.createSuite("testing on the expect module", function () {
            test.createTestCase("expect true to be true", function () {
                test.expect(true).toBe(true);
            });
            test.createTestCase("expect false not to be true", function () {
                test.expect(false).not().toBe(true);
            });
            test.createTestCase("two negations cancel each other out", function () {
                test.expect(false).not().not().toBe(false);
            });
            test.createTestCase("expect undefined to be undefined", function () {
                test.expect(undefined).toBeUndefined();
            });
            test.createTestCase("expect null not to be undefined", function () {
                test.expect(null).not().toBeUndefined();
            });
            test.createTestCase("expect null to be null", function () {
                test.expect(null).toBeNull();
            });
            test.createTestCase("expect undefined not to be null", function () {
                test.expect(undefined).not().toBeNull();
            });
            test.createTestCase("expect true to be boolean", function () {
                test.expect(true).toBeBoolean();
            });
            test.createTestCase("expect 1 to be number", function () {
                test.expect(1).toBeNumber();
            });
            test.createTestCase("expect '1' not to be Number", function () {
                test.expect("1").not().toBeNumber();
            });
            test.createTestCase("expect '1' to be String", function () {
                test.expect("1").toBeString();
            });
            if(typeof document !== "undefined")
                test.createTestCase("expect document.body to be object",function(){
                    test.expect(document.body).toBeObject();
                });
            else
                test.createTestCase("expect module to be object",function(){
                    test.expect(module).toBeObject();
                });
            test.createTestCase("expect [] to be array",function(){
                test.expect([]).toBeArray();
            });
            if(typeof document !== "undefined")
                test.createTestCase("expect document.body.getProperties to be not array",function(){
                    test.expect(document.body.getProperties).not().toBeArray();
                });
            test.createTestCase("expect new Date() to be Date",function(){
                test.expect(new Date()).toBeDate();
            });
            test.createTestCase("expect 1 to be close to 1.5, expect 1 to be close to 0.4," +
                " expect 1 not to be Close -0.1, expect 1 not to be close 0.4 with precision 0.5," +
                " expect 1 to be close 0.51 with precision 0.5",function(){
                test.expect(1).toBeCloseTo(1.5);
                test.expect(1).toBeCloseTo(0.4);
                test.expect(1).not().toBeCloseTo(-0.1);
                test.expect(1).not().toBeCloseTo(0.4,0.5);
                test.expect(1).toBeCloseTo(0.51,0.5);
            });
            test.createTestCase("expect 1 to be greater than -1",function(){
                test.expect(1).toBeGreaterThan(-1);
            });
            test.createTestCase("expect 1 to be greater or equal than 1",function(){
                test.expect(1).toBeGreaterThanOrEqual(1);
            });
            test.createTestCase("expect 1 to be less than 2",function(){
                test.expect(1).toBeLessThan(2);
            });
            test.createTestCase("expect 1 to be less or equal than 1",function(){
                test.expect(1).toBeLessThanOrEqual(1);
            });
        });
    }
    if(typeof window !== "undefined")
        window.testExpectModule = testExpectModule;
    else
        module.exports = testExpectModule;
})();