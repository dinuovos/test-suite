(function(){
    function testSuitePerformance2(test) {
        test.createSuitePerformance("writing HTML or creating HTML", function () {
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
        });
    }
    if(typeof window !== "undefined")
        window.testSuitePerformance2 = testSuitePerformance2;
    else
        module.exports = testSuitePerformance2;
})();
