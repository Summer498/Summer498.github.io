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
    constructor(txt) {
        this.piyoVal = new PiyoClass("piyo");
        this._hogeVal = txt;
    }
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
const fullscratchedHoge = { piyoVal: new PiyoClass("") };
fullscratchedHoge.piyoVal = new PiyoClass("piyo");
console.log("constructedHoge:", constructedHoge);
console.log("fullscratchedHoge:", fullscratchedHoge);
/*
console.log("constructedHoge==fullscratchedHoge:", constructedHoge == fullscratchedHoge)
console.log("constructedHoge===fullscratchedHoge:", constructedHoge === fullscratchedHoge)
*/ 
