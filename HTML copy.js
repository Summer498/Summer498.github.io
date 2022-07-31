const Multiplicate = e => (e instanceof Array) ? e : [e]

export const _htmlElement = (tag, attributes, text="", children=[]) => {
    const e = document.createElement(tag)
	for (const key in attributes){ e.setAttribute(key, attributes[key]) }
    e.appendChild(document.createTextNode(text))
    Multiplicate(children).forEach(child=>e.appendChild(child))
    return e
}

export default class
{
    // getters
//get  () { return document.getElementsByTagName("") }
    get base () { return document.getElementsByTagName("base") }
    get head () { return document.getElementsByTagName("head") }
    get body () { return document.getElementsByTagName("body") }
    get title () { return document.getElementsByTagName("title") }

    // creators
//(attributes, text="", children=[]) { return _htmlElement("", attributes, text, children) }
    div (attributes, text="", children=[]) { return _htmlElement("div", attributes, text, children) }
    span (attributes, text="", children=[]) { return _htmlElement("span", attributes, text, children) }
    p (attributes, text="", children=[]) { return _htmlElement("p", attributes, text, children) }
    h1 (attributes, text="", children=[]) { return _htmlElement("h1", attributes, text, children) }
    h2 (attributes, text="", children=[]) { return _htmlElement("h2", attributes, text, children) }
    h3 (attributes, text="", children=[]) { return _htmlElement("h3", attributes, text, children) }
    h4 (attributes, text="", children=[]) { return _htmlElement("h4", attributes, text, children) }
    h5 (attributes, text="", children=[]) { return _htmlElement("h5", attributes, text, children) }
    h6 (attributes, text="", children=[]) { return _htmlElement("h6", attributes, text, children) }
    ol (attributes, text="", children=[]) { return _htmlElement("ol", attributes, text, children) }
    li (attributes, text="", children=[]) { return _htmlElement("li", attributes, text, children) }
}