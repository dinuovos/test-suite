(function(w){
    w.performanceMeasuring = {
        startPerf: function () {
            return w.performance ? w.performance.now() : process.hrtime();
        },
        endPerf : function (time){
            if (w.performance)
                return w.performance.now() - time;
            else {
                var diff = process.hrtime(time);
                console.log(diff);
                return ( diff[0] * 1000 ) + ( diff[1]/ 1e6 );
        }
    }
};
})(typeof window !== "undefined" ? window : module.exports);