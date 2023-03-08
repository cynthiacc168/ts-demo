"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//fetch data
const dataUrl = "https://api.thecatapi.com/v1/images/search";
function getJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const json = yield response.json();
        return json;
    });
}
//add eventlistener to main-bt
const mainBtn = document.getElementById("main-btn");
// const button: HTMLButtonElement | null = document.querySelector('button');
mainBtn === null || mainBtn === void 0 ? void 0 : mainBtn.addEventListener('click', getData);
class Cat {
    constructor(id, url, width, height) {
        this.id = id;
        this.url = url;
        this.width = width;
        this.height = height;
    }
}
//display data
class DisplayCat {
    //add
    static addCat(data) {
        const cat = new Cat(data.id, data.url, data.width, data.height);
        //get table
        const table = document.querySelector("table");
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td>${cat.id}</td>
        <td><img src="${cat.url}"></td>
        <td>${cat.height}</td>
        <td>${cat.width}</td>
        <td>${cat.url}</td>
        <td><a href="#">X</a></td>`;
        table === null || table === void 0 ? void 0 : table.appendChild(tableRow);
        //listener of delete
        const anchor = document.querySelector("a");
        anchor === null || anchor === void 0 ? void 0 : anchor.addEventListener('click', (ev) => DisplayCat.deleteCat(ev.target));
    }
    //delete
    static deleteCat(target) {
        var _a;
        const parentTr = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        parentTr === null || parentTr === void 0 ? void 0 : parentTr.remove();
    }
}
//get data
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const catList = yield getJson(dataUrl);
        const cat = catList[0];
        DisplayCat.addCat(cat);
    });
}
