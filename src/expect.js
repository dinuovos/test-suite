(function(w){
    function expect(el, options){
        this.el = el;
        this.negation = false;
        this.options = options || {};
        return this;
    }
    function returnFunction(test){
        var $self = this;
        if($self.negation){
            test = !test;
        }
        if($self.options.cb)
            $self.options.cb(test);
        return test;
    }
    expect.prototype.not = function(){
        this.negation = !this.negation;
        return this;
    };
    expect.prototype.toBe = function(value){
        var $self = this;
        var test = $self.el === value;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeUndefined = function(){
        var $self = this;
        var test = typeof $self.el === "undefined";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeNull = function(){
        var $self = this;
        var test = $self.el === null;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeBoolean = function(){
        var $self = this;
        var test = typeof $self.el === "boolean";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeNumber = function(){
        var $self = this;
        var test = typeof $self.el === "number";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeString = function(){
        var $self = this;
        var test = typeof $self.el === "string";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeObject= function(){
        var $self = this;
        var test = typeof $self.el === "object";
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeArray= function(){
        var $self = this;
        var test = Array.isArray($self.el);
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeDate= function(){
        var $self = this;
        var test = Object.prototype.toString.call($self.el) === '[object Date]';
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeInView = function(partially,minwidth,minheight){
        var $self = this;
        minwidth = minwidth || 1;
        minheight = minheight || 1;
        if(!$self.el instanceof Element)
            throw new Error("toBeInView called without HTMLElement, or wrong type");
        var rect = $self.el.getBoundingClientRect();
        var test;
        var documentWidth = document.documentElement.clientWidth;
        var documentHeight = document.documentElement.clientHeight;
        if(partially){
            test = (
                !(rect.top == 0 && rect.bottom == 0 && rect.left == 0 && rect.right == 0 ) &&
                ( ( rect.top >= 0 && rect.top < documentHeight ) ||
                ( rect.bottom < documentHeight && rect.bottom >= 0  ) ) &&
                ( ( rect.left >= 0 && rect.left < documentWidth ) ||
                ( rect.right < documentWidth && rect.right >= 0 ) )
            );
        }
        else {
            test = (
                !(rect.top == 0 && rect.bottom == 0 && rect.left == 0 && rect.right == 0 ) &&
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= document.documentElement.clientHeight &&
                rect.right <= document.documentElement.clientWidth
            );
        }
        if(test && rect.width < minwidth || rect.height < minheight)
            test = false;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeCloseTo = function(value,precision){
        var $self = this;
        precision = precision || 1;
        var test = isNaN(value) ? false :
        ( ($self.el + precision ) >= value && $self.el <= value )||
        ( ($self.el - precision ) <= value && $self.el >= value );
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeGreaterThan = function(value){
        var $self = this;
        var test = $self.el > value;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeGreaterThanOrEqual = function(value){
        var $self = this;
        var test = $self.el >= value;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeLessThan = function(value){
        var $self = this;
        var test = $self.el < value;
        return returnFunction.call(this,test)
    };
    expect.prototype.toBeLessThanOrEqual = function(value){
        var $self = this;
        var test = $self.el <= value;
        return returnFunction.call(this,test)
    };
    w.expect = function(el,options){
        return new expect(el,options);
    };
})(typeof window !== "undefined" ? window : module.exports);