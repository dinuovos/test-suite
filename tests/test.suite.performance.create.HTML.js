function testSuitePerformanceCreateHTML(test) {
    test.createSuitePerformance("writing HTML or creating HTML?", function () {
        var howManyLoops = 15000;
        var testTargetBox=document.getElementById("test-target-box");
        test.createPerformanceTestCase("write", function () {
            var i;
            var html;
            for (i = 0; i < howManyLoops; i++)
                html+="<div class='something' id='polarize' data-s='el'><span>Ok</span></div>"
            testTargetBox.insertAdjacentHTML('beforeend',html);
        });
        testTargetBox.innerHTML = "";
        test.createPerformanceTestCase("create", function () {
            var html = document.createDocumentFragment();
            var div,span;
            var i;
            for (i = 0; i < howManyLoops; i++) {
                div = document.createElement("div");
                div.id = 'polarize';
                div.class = 'something';
                div.setAttribute('data-s', "el");
                span = document.createElement("span");
                span.textContent = "Ok";
                div.appendChild(span);
                html.appendChild(div);
            }
            testTargetBox.appendChild(html);
        });
        testTargetBox.innerHTML = "";
        test.createPerformanceTestCase("create without document fragment", function () {
            var div,span;
            var i;
            var html = document.createElement("div");
            for (i = 0; i < howManyLoops; i++) {
                div = document.createElement("div");
                div.id = 'polarize';
                div.class = 'something';
                div.setAttribute('data-s', "el");
                span = document.createElement("span");
                span.textContent = "Ok";
                div.appendChild(span);
                html.appendChild(div);
            }
            testTargetBox.appendChild(html);
        });
    });
    test.createSuitePerformance("(This suite will fail on IE) Converting no-array elements (DOMel.children) to array with ES6 or use simple for loop?", function () {
        var testTargetBox=document.getElementById("test-target-box");
        var elements = testTargetBox.children;
        test.createPerformanceTestCase("for loop", function () {
            var arr = [];
            var i;
            for (i = 0; i < elements.length; i++)
                arr.push(elements.dataset);
        });
        test.createPerformanceTestCase("Using Array.from and foreach", function () {
            var arrayFromElements = Array.from(elements);
            var arr = [];
            var i;
            arrayFromElements.forEach(function(v){
                arr.push(v.dataset);
            });
        });
        test.createPerformanceTestCase("Using Spread Operator", function () {
            var arrayFromElements = [...elements];
            var arr = [];
            var i;
            arrayFromElements.forEach(function(v){
                arr.push(v.dataset);
            });
        });
    });
    test.createSuitePerformance("empty html with innerHTML = '' or while" +
        "with removeChild?",function(){
        var testTargetBox=document.getElementById("test-target-box");
        var testTargetBox2 = testTargetBox.cloneNode(true);
        var testTargetBox3 = testTargetBox.cloneNode(true);
        document.body.appendChild(testTargetBox2);
        document.body.appendChild(testTargetBox3);
        test.createPerformanceTestCase("empty with while loop and remove first child", function () {
            while (testTargetBox.firstChild) {
                testTargetBox.removeChild(testTargetBox.firstChild);
            }
        });
        test.createPerformanceTestCase("empty with innerHTML", function () {
            testTargetBox2.innerHTML = "";
        });
        test.createPerformanceTestCase("empty with while loop and remove last child", function () {
            while (testTargetBox3.lastChild) {
                testTargetBox3.removeChild(testTargetBox3.lastChild);
            }
        });
    });
}
if(typeof window === "undefined")
    module.exports = testSuitePerformanceCreateHTML;

