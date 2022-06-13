var id = new Array(3);
var styles = new Array(3)
var innerHTMLs = new Array(3);

for (let i = 0; i < 3; i++) {
    id[i] = document.getElementById("id_"+i.toString());

    styles[i] = id[i].style;
    innerHTMLs[i] = id[i].innerHTML;

    id[i].onclick = function idClick() {
        styles[i].fontSize = "48px";
        id[i].innerHTML = "<p>id:"+i+"は大きくなっちゃった!</p>";
    }
}

