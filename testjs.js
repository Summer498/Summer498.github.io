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


const assert = b => console.assert(b);
const typeOf = o => {
	const str = Object.prototype.toString(o);
	if (str != "[object Object]") { return str; }
	return o.constructor;
};
Object.prototype.isTheType = function (typeName) { return typeOf(this) == typeOf(typeName()); };

const not = b => !b;
const mod = (x, m) => (x % m + m) % m;
const range = (b, n, s = 1) => [...Array(n)].map((_, i) => i * s + b);
const zeros = n => [...Array(n)].map(e => 0);
const vFunc = (a, b, f) => {
	console.assert(a.isTheType(Array));
	if (b.isTheType(Number)) { return a.map(e => f(e, b)); }
	if (b.isTheType(Array)) {
		console.assert(a.length == b.length);
		return a.map((_, i) => f(a[i], b[i]));
	}
};

const v_sum = (...arrs) => {
	let s = zeros(arrs[0].length);
	arrs.forEach(arr => s = s.v_add(arr));
	return s;
};

/**
 * @brief generate array
 * @param n count of elements
 * @param f generate function like (i => i*2)
 * @return generated array
 * @detail Given n = 5, f = i=>10*i, genArr generates [0,10,20,30,40]
 */
const genArr = (n, f) => [...Array(n)].map((_, i) => f(i));

Boolean.prototype.toNumber = function () { return this ? 1 : 0; };
Array.prototype.onehot = function (n = 0) { return [...Array(Math.max(Math.max(...this) + 1, n))].map((_, i) => (this.includes(i)).toNumber()); };
Array.prototype.onehotInMod = function (m = 1) { return this.map(e => mod(e, m)).onehot(m); };
Array.prototype.remove = function (rmv) { return this.filter(e => not(rmv.includes(e))); };
Array.prototype.ringShift = function (b) {
	const l = this.length, bm = mod(b, l);
	return this.concat(this).slice(l - bm, 2 * l - bm);
};
Array.prototype.v_add = function (b) { return vFunc(this, b, (a, b) => a + b); };
Array.prototype.v_sub = function (b) { return vFunc(this, b, (a, b) => a - b); };
Array.prototype.v_mult = function (b) { return vFunc(this, b, (a, b) => a * b); };
Array.prototype.v_div = function (b) { return vFunc(this, b, (a, b) => a / b); };
Array.prototype.v_mod = function (b) { return vFunc(this, b, (a, b) => mod(a, b)); };
Array.prototype.v_get = function (b) { return b.map(e => this[e]); };


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
	none: { rmv: [], add: [] },
	seventh: { rmv: [], add: [7] },
	ninth: { rmv: [], add: [7, 9] },
	added6: { rmv: [5], add: [6] },
	added46: { rmv: [3, 5], add: [4, 6] },
};

const Alt5 = {
	dim5: -1,
	none: 0,
	aug5: 1
};

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
const get_BS = (key, key_quality, degree, indexes = Chord_index.none, alt5 = 0) => {
	assert(degree);
	const d = degree;
	const s = key_quality.v_add(key).v_mod(12);
	s[4] += alt5;

	const code_tone = genArr(3, i => 2 * i + 1).remove(indexes.rmv).concat(indexes.add);
	const c = s.v_get(code_tone.v_add(d - 2).v_mod(7));
	const leveld = s.onehot(12);
	const levelc = c.onehot(12);
	const levelb = [c[0], c[2]].onehot(12);
	const levela = [c[0]].onehot(12);
	return v_sum(leveld, levelc, levelb, levela);
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
const Gmaj = get_BS(Chroma.C, Key_quality.major, 5);
const G7 = get_BS(Chroma.C, Key_quality.major, 5, Chord_index.seventh);
const F46 = get_BS(Chroma.C, Key_quality.major, 4, Chord_index.added46);
console.log(Cmaj, Gmaj, G7, F46);
console.log(BS_dist(Cmaj, Gmaj));
console.log(BS_dist(Gmaj, Cmaj));
console.log(BS_dist(Cmaj, G7));
console.log(BS_dist(G7, Cmaj));
