
function windowErrorMonitoring(attachErrorOnBody) {
    if(window)
        window.addEventListener('error', function (e) {
            var msg = "Message: " + e.message;
            var filename = "\nFilename: " + e.filename;
            var colno = "\n Position -> line: " + e.lineno + ", col: " + e.colno;
            var error = "\n Error: " + e.error;
            console.error("[testSuite.js logging window errors]", msg, filename, colno, error);
            if(attachErrorOnBody)
                document.body.innerHTML += "<h1 style=" +
                    "'width:100%!important;display:block!important;opacity:1!important;" +
                    "color:red!important;text-shadow: 1px 1px 1em black!important;" +
                    "font-size:24px!important;position:static!important;float:left!important;" +
                    "transform:none!important;text-indent:0!important'>" +
                    "[testSuite.js error monitoring]\n" + msg + filename + colno + error + "</h1>"
        });
    else{
        var EventEmitter = require('events');
        var myEmitter = new EventEmitter();
        myEmitter.on('error',function(err){
            console.error("[testSuite.js error monitoring]\n",JSON.stringify(err));
        });
    }
}