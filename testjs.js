/*
import { transpose } from "/node_modules/@tonaljs/note";
console.log(transpose("A4", "P5"));
*/

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

/*
<div class = "people" id = "Fantastic Party">
	<div class = "person" id = "Adam"></div>
	<div class = "person" id = "Ben">
		<div class = "bag" id = "gorgeous bag">
	</div>
	<div class = "person" id = "Charlie"></div>
	<div class = "person" id = "David"></div>
</div>
*/

const Multiplicate = e => (e instanceof Array) ? e : [e]
const d = document
d.create = function (tag) {	return this.createElement(tag) }
Element.prototype.set = function (attributes){
	for (const key in attributes){ this.setAttribute(key, attributes[key]); }
	return this;
} 
Element.prototype.setText = function (text){
	this.appendChild(document.createTextNode(text));
	return this;
}
Element.prototype.append = function (elements){
	for(const e of Multiplicate(elements)){ this.appendChild(e); }
	return this;
}
//*
const DIV = () => document.createElement("div");
import * as HTML from "./HTML.js"
// const HTML = {};
// HTML.div = () => document.createElement("div");


answer.appendChild(
	HTML.div({ class: "people", id: "Fantastic Party" }, "Fantastic Party です").append([
		HTML.div({ class: "person", id: "Adam" }, "Adam です"),
		HTML.div({ class: "person", id: "Ben" }, "Ben です").append(
			HTML.div({ class: "bag", id: "gorgeous bag" }, "Ben の豪華なバッグ です"),
		),
		HTML.div({ class: "person", id: "Charlie" }, "Charlie です"),
		HTML.div({ class: "person", id: "David" }, "David です"),
	])
);
//*/

