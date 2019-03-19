function testShowHtmlMethods(test) {
    test.createSuite("Method showHtml",function(){
        test.createTestCase("showHtml, with no arguments, will replace document.body content with " +
            "testSuite.html",function(){
            test.showHtml();
            var testDiv = document.createElement("div");
            testDiv.innerHTML = test.html; // we do this in order to be sure that browser formatting doesn't change some particulars...
            var bodyHtml = document.body.innerHTML;
            test.expect(bodyHtml).toBe(testDiv.innerHTML );
        });
        test.createTestCase("showHtml, with first argument null ( or falsy ), and the second argument setted at true, " +
            "will append html to document.body",function(){
            test.showHtml(null,true);
            var testDiv = document.createElement("div");
            testDiv.innerHTML = test.html;
            var bodyHtml = document.body.innerHTML;
            test.expect(bodyHtml).toBe(testDiv.innerHTML + testDiv.innerHTML);
        });
        document.body.innerHTML = "<div id='test'></div>";
        var t = document.getElementById("test");
        test.createTestCase("showHtml, with first argument setted with a DOM element, will replace its content with testSuite.html",function(){
            test.showHtml(t);
            var testDiv = document.createElement("div");
            testDiv.innerHTML = test.html;
            var bodyHtml = t.innerHTML;
            test.expect(bodyHtml).toBe(testDiv.innerHTML);
        });

        test.createTestCase("showHtml, with first argument setted with a DOM element as first argument, " +
            "and the second argument setted at true, " +
            "will append html to the DOM element",function(){
            test.showHtml(t,true);
            var testDiv = document.createElement("div");
            testDiv.innerHTML = test.html;
            var bodyHtml = t.innerHTML;
            test.expect(bodyHtml).toBe(testDiv.innerHTML+testDiv.innerHTML);
        });
    });
    test.createSuite("Method showHtmlInPopup",function(){
        test.createTestCase("Calling testSuite.showHtmlInPoput, will open a new window popup " +
            "with document.body equal to testSuite.html",function(){
            test.drawing().showHtmlInPopUp();
            var testDiv = document.createElement("div");
            testDiv.innerHTML = test.html;
            test.expect(test.testWindowPopup.document.body.innerHTML).toBe(testDiv.innerHTML)
        });
    });
}
if(typeof window !== "undefined")
    window.testDataOrganization = testDataOrganization;
else
    module.exports = testDataOrganization;