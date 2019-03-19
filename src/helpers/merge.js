function merge(add,base,extension) {
    if(Object.hasOwnProperty('assign'))
        return Object.assign(base,add);
    var target = Array.isArray(base) ? [] : {};
    for (var i in base) {
        var typeNode = Object.prototype.toString.call(base[k]);
        if ( ( typeNode == "[object Object]" || typeNode == "[object Array]" ) &&
               base[i] )
            target[i] = add[i] ? merge(add[i],base[i],extension) : base[i];
        else
            target[i] = add[i] || base[i];
    }

    if(extension)
        for (var k in add)
            target[k] = target[k] || add[k];

    return target;
}
