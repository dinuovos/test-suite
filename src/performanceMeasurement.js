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
                return Number("" + diff[0] + "." + diff[1]);
        }
    }
};
})(typeof window !== "undefined" ? window : module.exports);