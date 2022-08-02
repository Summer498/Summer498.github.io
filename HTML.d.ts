export type div = (attributes: any, text: String) => HTMLDivElement;
export type span = (attributes: any, text: String) => HTMLSpanElement;

type attribute = any

export default class
{
    // getters
//get  () { return document.getElementsByTagName("") }
    get base (): HTMLCollectionOf<HTMLBaseElement>
    get head (): HTMLCollectionOf<HTMLHeadElement>
    get body (): HTMLCollectionOf<HTMLBodyElement>
    get title (): HTMLCollectionOf<HTMLTitleElement>

    // creators
//(attributes: attribute, text:string, children:Array<HTMLElement>) { return _htmlElement("", attributes, text, children) }
    div (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLDivElement
    span (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLSpanElement
    p (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLParagraphElement
    h1 (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLHeadElement
    h2 (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLHeadElement
    h3 (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLHeadElement
    h4 (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLHeadElement
    h5 (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLHeadElement
    h6 (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLHeadElement
    ol (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLOListElement
    li (attributes: attribute, text:string, children:Array<HTMLElement>): HTMLLIElement
}