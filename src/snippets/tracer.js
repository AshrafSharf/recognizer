/**
 * This code has been instrumented using Recognizer
 * https://github.com/equiet/recognizer
 */

// TODO: remove
function __probe(val) {
    return val;
}

var __recognizer{{tracerId}} = (function () {
    'use strict';

    var global = this;

    function Tracer() {
        this._calls = [];
        this._args = [];
        this.global = global;

        this._probeValues = {};
    }
    Tracer.prototype = {
        logEntry: function (location, args) {
            this._calls.push({
                index: this._calls.length,
                position: location,
                // args: Array.prototype.slice.call(args),
                argsCount: args.length,
                time: Date.now()
            });
            this._args.push(Array.prototype.slice.call(args));
        },

        getCalls: function (since) {
            var calls = this._calls.filter(function(call) {
                return (since) ? call.time > since : true;
            });
            return stringify(calls);
        },

        getCallCount: function () {
            return this._calls.length;
        },

        logProbe: function (location, result) {
            this._probeValues[location.toString()] = result;
            return result;
        },

        /**
         * Log function call.
         * @param  {Object}   location  Start and end of the intrumented function
         * @param  {Object}   obj       `this` context for the function, evaluated first
         * @param  {Array}    args      Function arguments, evaluated second
         * @param  {Function} fn        Function itself, evaluated last
         */
        // This won't work, because we can't get fn without executing obj again
        logProbeFn: function (location, obj, args, fn) {
            var result = fn.apply(obj, args);
            this._probeValues[location.toString()] = result;
            return result;
        },

        getProbeValues: function () {
            return stringify(Object.keys(this._probeValues));
        },

        test: function () {
            console.log('[recognizer tracer] test function run successfully');
        },

        connect: function () {
            return this;
        }
    };

    /**
     * JSON stringify with circular references
     * Copyright (c) Isaac Z. Schlueter ("Author")
     * The BSD License
     */
    function getSerialize(a,b){var c=[],d=[];return b=b||function(a,b){return"[Circular "+getPath(b,c,d)+"]"},function(e,f){var g=f;return"object"==typeof f&&f&&(-1!==c.indexOf(f)?g=b(e,f):(c.push(f),d.push(e))),a&&(g=a(e,g)),g}}
    function getPath(a,b,c){var d=b.indexOf(a),e=[c[d]];for(d--;d>=0;d--)b[d][e[0]]===a&&(a=b[d],e.unshift(c[d]));return"~"+e.join(".")}
    function stringify(a,b,c,d){return JSON.stringify(a,getSerialize(b,d),c)}stringify.getSerialize=getSerialize;

    return new Tracer();

}());


/**
 * Instrumented code
 */

