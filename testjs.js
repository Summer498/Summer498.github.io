/*
import { transpose } from "@tonaljs/note";
console.log(transpose("A4", "P5"));
//*/
var id = new Array(3);
var styles = new Array(3);
var innerHTMLs = new Array(3);
for (let i = 0; i < 3; i++) {
    id[i] = document.getElementById("id_" + i.toString());
    styles[i] = id[i].style;
    innerHTMLs[i] = id[i].innerHTML;
    id[i].onclick = function idClick() {
        styles[i].fontSize = "48px";
        id[i].innerHTML = "<p>id:" + i + "は大きくなっちゃった!</p>";
    };
}
const answer = document.getElementById("answer");
const d = document;
import HTML from "./HTML.js";
answer === null || answer === void 0 ? void 0 : answer.appendChild(HTML.div({ class: "people", id: "Fantastic Party" }, "Fantastic Party です").append([
    HTML.div({ class: "person", id: "Adam" }, "Adam です"),
    HTML.div({ class: "person", id: "Ben" }, "Ben です").append(HTML.div({ class: "bag", id: "gorgeous bag" }, "Ben の豪華なバッグ です")),
    HTML.div({ class: "person", id: "Charlie" }, "Charlie です"),
    HTML.div({ class: "person", id: "David" }, "David です"),
]));
//*/
class HogeClass {
    constructor(txt) { this.piyoVal = new PiyoClass("piyo"); this._hogeVal = txt; }
    get hogeVal() { return this._hogeVal; }
    set hogeVal(txt) { this._hogeVal = txt; }
    _hogeFunc(txt) { return txt + "\n"; }
    hogeFunc(txt) { console.log(this._hogeFunc(txt)); }
}
class PiyoClass {
    constructor(txt) { this._hogeVal = txt; }
    get hogeVal() { return this._hogeVal; }
    set hogeVal(txt) { this._hogeVal = txt; }
    _hogeFunc(txt) { return txt + "\n"; }
    hogeFunc(txt) { console.log(this._hogeFunc(txt)); }
}
const constructedHoge = new HogeClass("hogehoge hugahuga piyopiyo");
const fullscratchedHoge = {};
fullscratchedHoge.piyoVal = (()=>{
    const piyo = {}
    piyo._hogeVal = "piyo"
    Object.defineProperty(piyo, "_hogeFunc", {value: function (txt){return txt+"\n"}, writable: false})
    Object.defineProperty(piyo, "hogeFunc", {value: function (txt){ console.log(this._hogeFunc(txt)); }, writable:false})
//    piyo._hogeFunc = function _hogeFunc(txt){return txt+"\n"}
//    piyo.hogeFunc = function hogeFunc(txt){ console.log(this._hogeFunc(txt)); }
    return piyo
})();
console.log("constructedHoge:", constructedHoge);
console.log("fullscratchedHoge:", fullscratchedHoge);

function hogehogeFunction(e) {
    return hogehogeFunction = function(e){return "コンニチハ"}
}
console.log(hogehogeFunction)
console.log(hogehogeFunction(0))
console.log(hogehogeFunction)
console.log(hogehogeFunction(0))
console.log(hogehogeFunction)
console.log(hogehogeFunction(0))

/*
console.log("constructedHoge==fullscratchedHoge:", constructedHoge == fullscratchedHoge)
console.log("constructedHoge===fullscratchedHoge:", constructedHoge === fullscratchedHoge)
*/
