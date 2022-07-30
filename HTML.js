export const div = (attributes, text="") => {
    const e = document.createElement("div");
	for (const key in attributes){ e.setAttribute(key, attributes[key]); }
    e.appendChild(document.createTextNode(text));
    return e;
}
export const span = (attributes, text="") => (new HTMLSpanElement());
