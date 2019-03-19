/**
 * wrapper around console.log to print colors
 */
function c(msg,color){
    !isw && console.log(color || "",
        msg,
        "\x1b[0m");
    isw && console.log('%c'+
        msg,
        color ? "color:" + color : "");
}