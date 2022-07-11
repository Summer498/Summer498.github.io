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

answer = document.getElementById("answer").innerHTML;

const range = (b, n, s) => [...Array(n)].map((_, k) => k * s + b);
Array.prototype.ringShift = function (b) { return l = this.length, bm = (b % l + l) % l, this.concat(this).slice(l - bm, 2 * l - bm); };

name2BS = (name) => range(0, 12).map((_, k) => (
	{
		"maj": { 0: 4, 1: 0, 2: 0, 3: 0, 4: 2, 5: 0, 6: 0, 7: 3, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 },
		"min": { 0: 4, 1: 0, 2: 0, 3: 2, 4: 0, 5: 0, 6: 0, 7: 3, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 },
		"aug": { 0: 4, 1: 0, 2: 0, 3: 0, 4: 2, 5: 0, 6: 0, 7: 0, 8: 3, 9: 0, 10: 0, 11: 0, 12: 0 },
		"dim": { 0: 4, 1: 0, 2: 0, 3: 2, 4: 0, 5: 0, 6: 3, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 },
		"sus2": { 0: 4, 1: 0, 2: 2, 3: 0, 4: 0, 5: 0, 6: 0, 7: 3, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 },
		"sus4": { 0: 4, 1: 0, 2: 0, 3: 0, 4: 0, 5: 2, 6: 0, 7: 3, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 },
		"7": { 0: 4, 1: 0, 2: 0, 3: 0, 4: 2, 5: 0, 6: 0, 7: 3, 8: 0, 9: 0, 10: 2, 11: 0, 12: 0 },
		"M7": { 0: 4, 1: 0, 2: 0, 3: 0, 4: 2, 5: 0, 6: 0, 7: 3, 8: 0, 9: 0, 10: 0, 11: 2, 12: 0 },
		"m7": { 0: 4, 1: 0, 2: 0, 3: 2, 4: 0, 5: 0, 6: 0, 7: 3, 8: 0, 9: 0, 10: 2, 11: 0, 12: 0 },
	}[name][k]
));

function triCode2BS(key, root, name) {
	return name2BS(name).ringShift(root).map((v, k) =>
		v ? v : [...Array(12)].map((_, k) => ({
			"maj": [0, 2, 4, 5, 7, 9, 11],
			"min": [0, 2, 3, 5, 7, 8, 10],
		}[key.slice(1, key.length)].find(e=>e==k)) ? 1 : 0)[((k - key[0]) % 12 + 12) % 12]
	);
}

console.log("C, Cmaj", triCode2BS([0,"maj"], 0, "maj"));
console.log("C, Gmaj", triCode2BS([0,"maj"], 7, "maj"));
console.log("G, Cmaj", triCode2BS([7,"maj"], 0, "maj"));
console.log("Cmin, Cm", triCode2BS([0,"min"], 0, "min"));
