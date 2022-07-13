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

const answer = document.getElementById("answer").innerHTML;



const mod = (x, m) => (x % m + m) % m;
const range = (b, n, s = 1) => [...Array(n)].map((_, k) => k * s + b);
const zeros = (n) => [...Array(n)].map(e => 0);

Array.prototype.ringShift = function (b) {
	const l = this.length;
	const bm = mod(b, l);
	return this.concat(this).slice(l - bm, 2 * l - bm);
};

const arr2onehot = (arr, n = 0) => [...Array(Math.max(Math.max(...arr) + 1, n))].map((_, k) => (arr.indexOf(k) + 1 ? 1 : 0));
const arr2onehotInMod = (arr, m = 1) => arr2onehot(arr.map(e => mod(e, m)), m);
const vAdd = (v1, v2) => {
	console.assert(v1.length == v2.length);
	return v1.map((v, k) => v + v2[k]);
};
const vSum = (...arrs) => {
	let sum = zeros(arrs[0].length);
	arrs.forEach(arr => sum = vAdd(sum, arr));
	return sum;
};

const name2BS = (name) => range(0, 12).map((_, k) => (
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
		v ? v : [...Array(12)].map((_, k) => (
			{
				"maj": [0, 2, 4, 5, 7, 9, 11],
				"min": [0, 2, 3, 5, 7, 8, 10],
			}[key.slice(1, key.length)]
				.find(e => e == k)) ? 1 : 0)[((k - key[0]) % 12 + 12) % 12]
	);
}

console.log("C, Cmaj", triCode2BS([0, "maj"], 0, "maj"));
console.log("C, Gmaj", triCode2BS([0, "maj"], 7, "maj"));
console.log("G, Cmaj", triCode2BS([7, "maj"], 0, "maj"));
console.log("Cmin, Cm", triCode2BS([0, "min"], 0, "min"));

/*
こんな風に書きたい
const C = chord.C.maj
const Cm = chord.C.minor
const Cdim = chord.C.dim
const Caug = chord.C.aug
const Csus2 = chord.C.sus2
const Csus4 = chord.C.sus4
const CM7 = chord.C.major7
const C7 = chord.C.seventh
const Cm7 = chord.C.minor7
*/

/**
 * @brief generate array
 * @param n count of elements
 * @param f generate function like (i => i*2)
 * @return generated array
 * @detail Given n = 5, f = i=>10*i, genArr generates [0,10,20,30,40]
 */
const genArr = (n, f) => [...Array(n)].map((_, i) => f(i));

(() => {
	const key_quality = 0;
	const key = 0;
	const degree = 1;
	const alt5 = 1;
	console.assert(degree);

	const maj = [0, 2, 4, 5, 7, 9, 11];
	const min = [0, 2, 3, 5, 7, 8, 10];
	const s = [maj, min][key_quality].map(e => e + key);
	s[4] += alt5;

	const c = s.filter((_, k) => genArr(3, i => mod(degree - 1 + i * 2, 7)).indexOf(k) + 1);
	const leveld = arr2onehotInMod(s, 12);
	const levelc = arr2onehot(c, 12);
	const levelb = arr2onehot([s[0], s[4]], 12);
	const levela = arr2onehot([s[0]], 12);

	console.log(leveld);
	console.log(levelc);
	console.log(levelb);
	console.log(levela);
	console.log(vSum(leveld, levelc, levelb, levela));
})();

const Key_quality = {
	major: [0, 2, 4, 5, 7, 9, 11],
	minor: [0, 2, 3, 5, 7, 8, 10]
};

const Chroma = {
	Cflat: 11, C: 0, Csharp: 1,
	Dflat: 1, D: 2, Dsharp: 3,
	Eflat: 3, E: 4, Esharp: 5,
	Fflat: 4, F: 5, Fsharp: 6,
	Gflat: 6, G: 7, Gsharp: 8,
	Aflat: 8, A: 9, Asharp: 10,
	Bflat: 10, B: 11, Bsharp: 0,
};

const Chord_index = {
	seventh: 0,
	dominant7: 0,
	minor7: 1,
	major7: 2,
	ninth: 3,
	added6: 4,
	added46: 5,
}

//TODO: +46, +6 要る?
/**
 * @brief get Basic Space of chord
 * @param key key in which chord is (key is like Chroma.Fsharp)
 * @param key_quality key in which chord is (key_quality is like Key_quality.major)
 * @param degree degree of chord in the key (degree is in {1,2,...,7})
 * @param indexes indexes of chord: one of {0, 6, 7, 9} (default:0)
 * @param alt5 of chord in the key: one of {-1, 0, 1} (default:0)
 * @return Basic Space of chord
 */
const get_BS = (key, key_quality, degree, indexes = 0, alt5 = 0) => {
	console.assert(degree);
	const s = key_quality.map(e => e + key);
	s[4] += alt5;

	const c = s.filter((_, k) => genArr(3, i => mod(degree - 1 + i * 2, 7)).indexOf(k) + 1);
	const leveld = arr2onehotInMod(s, 12);
	const levelc = arr2onehotInMod(c, 12);
	const levelb = arr2onehotInMod([s[0], s[4]], 12);
	const levela = arr2onehotInMod([s[0]], 12);
	return vSum(leveld, levelc, levelb, levela);
};

/**
 * @brief distance of region in chord distance function
 * @param src: pitch class of source region's tonic 
 * @param dst: pitch class of destination region's tonic 
 * @return difference between src and dst in chromatic circle of fifth
 */
const region_dist = (src, dst) => mod((dst - src) * 7, 12);

/**
 * @brief distance of root in chord distance function
 * @param src: pitch class of source chord's root 
 * @param dst: pitch class of destination chord's root 
 * @return difference between src and dst in diatonic circle of fifth
 */
const root_dist = (src, dst) => mod((dst - src) * 3, 7);

/**
 * @brief distance of BS in chord distance function
 * @param src: pitch class of source chord's BS
 * @param dst: pitch class of destination chord's BS 
 * @return count of additional pitch class in dst from src
 */
const BS_dist = (src, dst) => {
	let sum = 0;
	dst.forEach((_, i) => sum += ((dst[i] > src[i]) ? (dst[i] - src[i]) : 0));
	return sum;
};

const Cmaj = get_BS(Chroma.C, Key_quality.major, 1);
const Gmaj = get_BS(Chroma.G, Key_quality.major, 4);
console.log(Cmaj, Gmaj);
console.log(BS_dist(Cmaj, Gmaj));
console.log(BS_dist(Gmaj, Cmaj));
