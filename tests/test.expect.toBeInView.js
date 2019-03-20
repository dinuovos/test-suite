function testExpectToBeInView(test) {
    test.createSuite("testing expect toBeInView method( test results vary between different browser viewport )", function () {
        test.createTestCase("el0 is display none then not in view, even partially", function () {
            test.expect(el0).not().toBeInView(true);
        });
        test.createTestCase("black div is entirely in viewport", function () {
            test.expect(el1).toBeInView();
        });
        test.createTestCase("blue div is not entirely in viewport...", function () {
            test.expect(el2).not().toBeInView();
        });
        test.createTestCase("...but partially", function () {
            test.expect(el2).toBeInView(true);
        });
        test.createTestCase("red div is not entirely in viewport...", function () {
            test.expect(el3).not().toBeInView();
        });
        test.createTestCase("...but partially", function () {
            test.expect(el3).toBeInView(true);
        });
        test.createTestCase("yellow div is entirely in viewport", function () {
            test.expect(el4).toBeInView();
        });
        test.createTestCase("orange div is not in viewport, even partially", function () {
            test.expect(el5).not().toBeInView();
            test.expect(el5).not().toBeInView(true);
        });
        test.createTestCase("el6 is in viewport, but is not visible because is height is 0, so toBeInView return false", function () {
            test.expect(el6).not().toBeInView();
        });

    });
}
if(typeof window === "undefined")
    module.exports = testExpectToBeInView;
