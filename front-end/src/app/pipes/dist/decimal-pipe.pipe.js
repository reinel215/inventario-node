"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DecimalPipePipe = void 0;
var core_1 = require("@angular/core");
var DecimalPipePipe = /** @class */ (function () {
    function DecimalPipePipe() {
    }
    DecimalPipePipe.prototype.transform = function (value) {
        var _a = value.split('.'), parteEntera = _a[0], parteDecimal = _a[1];
        if (parteDecimal.length > 2) {
            parteDecimal = parteDecimal.slice(0, 1);
            console.log(parteDecimal);
        }
        return parteEntera + parteDecimal;
        // if (value !== undefined && value !== null) {
        //   return value.replace(/,/g, "");
        // } else {
        //   return "";
        // }
    };
    DecimalPipePipe = __decorate([
        core_1.Pipe({
            name: 'decimalPipe'
        })
    ], DecimalPipePipe);
    return DecimalPipePipe;
}());
exports.DecimalPipePipe = DecimalPipePipe;
