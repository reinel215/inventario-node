"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var animations_1 = require("@angular/animations");
var AppComponent = /** @class */ (function () {
    function AppComponent(productServie) {
        this.productServie = productServie;
        this.displayedColumns = ['id', 'nombre', 'descripcion', 'cantidad', 'precio'];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.retrieveProducts();
    };
    AppComponent.prototype.retrieveProducts = function () {
        var _this = this;
        this.productServie.getProducts()
            .subscribe(function (products) {
            _this.products = products;
            var withoutImageUrl = products.map(function (product) {
                var image_url = product.image_url, rest = __rest(product, ["image_url"]);
                return rest;
            });
            _this.dataSource = new table_1.MatTableDataSource(withoutImageUrl);
            _this.paginator = _this.dataSource.paginator;
            console.log(_this.paginator);
        }, function (err) { console.error("error en el lado del cliente"); });
    };
    AppComponent.prototype.encontrarImagen = function (id) {
        return this.products.find(function (product) { return product.id === id; });
    };
    AppComponent.prototype.calcularTotal = function () {
        console.log(this.dataSource);
    };
    AppComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    AppComponent.prototype.saludar = function () {
        console.log("hola");
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
