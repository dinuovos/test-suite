function testShowHtmlMethods(test) {
    test.createSuite("A preparation suite",function(){
        test.createTestCase("This is true",function(){
            test.expect(1).toBeGreaterThan(0);
        });
        test.createTestCase("This is false",function(){
            test.expect(1).toBeGreaterThan(1.5);
        });
        test.createTestCase("This is pending because you forgot to call test.expect",function(){
            expect(1).toBeGreaterThan(1.5);
        });
        test.createTestCase("This is true",function(){
            test.expect(1).toBeLessThan(1.5);
        });
    });
    test.drawing();
    test.createSuite("When the tests are finished, you can call testSuite.drawing(). It will create a table-like" +
        " html output, with a report of all testes you have already performed",function() {
        test.createTestCase("after calling testSuite.drawing() ( before set this suite )," +
            " expect string testSuite.html have length",function() {
            test.expect(test.html.length).toBeGreaterThan(0);
        });
        var doc = document.createElement('div');
        doc.innerHTML = test.html;
        test.createTestCase("test.html has a table with class 'testSuite-suite' ",function() {
            var sel = doc.querySelector("table.testSuite-suite");
            test.expect(sel).not().toBeUndefined();
        });
        test.createTestCase("expect that table will have 1 tag th ( representing the suite" +
            "defined above ),with a tr tag as parent and a h1 tag as children." +
            "Expect that, by now, there are three testcase ( one is defined in source code but is pending because" +
            " no call to test.expect was performed."+
            ". Also expect that h1 tag will match the corresponding text in testSuite.test[index].label",function() {
            var sel = doc.querySelectorAll("table.testSuite-suite th");
            test.expect(sel.length).toBe(1);
            var h3s = doc.querySelectorAll("table.testSuite-suite h3");
            test.expect(h3s.length).toBe(3);
            // testcase initially designed for more rows... however, this part could work also with more tests
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
            "with document.body equal to testSuite.html ( this will fail if you don't enable popups on this domain )",function(){
            test.drawing().showHtmlInPopUp();
            var testDiv = document.createElement("div");
            testDiv.innerHTML = test.html;
            test.expect(test.testWindowPopup.document.body.innerHTML).toBe(testDiv.innerHTML);
            test.testWindowPopup.close();
        });
    });
}
if(typeof window === "undefined")
    module.exports = testShowHtmlMethods;