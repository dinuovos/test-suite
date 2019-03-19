(function(){
    function testSuitePerformance(test) {
        test.createSuitePerformance("expecting synchronization with js timer ( this will fail on some browser/PC if following testcases have heavy duty)",function(){
            test.createPerformanceTestCase("expecting 1 second",function(cb){
                setTimeout(function(){
                    cb();
                },1000);
            },true);
            test.createPerformanceTestCase("expecting 2 second",function(cb){
                setTimeout(function(){
                    cb();
                },2000);
            },true);
            test.createPerformanceTestCase("expecting 4 second",function(cb){
                setTimeout(function(){
                    cb();
                },4000);
            },true);
        });
        test.createSuitePerformance("is it true that Statements or assignments of al loop statement" +
            "placed outside the loop <a target='_blank' href='https://www.w3schools.com/js/js_performance.asp'>" +
            "will make the loop run faster?</a>", function () {
            var howManyLoops = 1500;
            var arr = new Array(howManyLoops);
            var arr2 = new Array(howManyLoops);
            test.createPerformanceTestCase("outside the loop", function () {
                var i1;
                var i;
                var l = arr.length;
                for(i1=0;i1<howManyLoops;i1++) {
                    for (i = 0; i < l; i++) {
                        arr[i] = i;
                    }
                }
            });
            test.createPerformanceTestCase("inside the loop", function () {
                for(var i1=0;i1<howManyLoops;i1++) {
                    for (var i = 0; i < arr2.length; i++)
                        arr2[i] = i;
                }
            });
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
    }
    if(typeof window !== "undefined")
        window.testSuitePerformance = testSuitePerformance;
    else
        module.exports = testSuitePerformance;
})();
