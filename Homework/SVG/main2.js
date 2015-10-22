/* the purpose of these two lines of code is merely to test the changeColor function*/
window.onload = function() {
 	changeColor("ve", "#ffFF00");
 	changeColor("br", "#5a7e92");
 	changeColor("ar", "#ff00ff");
 	changeColor("co", "#0000ff");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color. The CSS file that is linked to the HTML to which 
   this JS file is linked as well, has an influence on the colors as well. It not only 
   instantiates the colors. It also seems to overrule this function. The colors of the 
   countries that are coloured by class are immutable, while the countries coloured by ID are.*/
function changeColor(id, color) {
	document.getElementById(id).style.fill = color;
}