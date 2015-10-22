var text = '[' + '{"Country":"Argentina","Country ID":"ar","Average life expectancy (Y)":"75,11818182"},' + 
'{"Country":"Bolivia","Country ID":"bo","Average life expectancy (Y)":"65,33636364"},' + 
'{"Country":"Brazil", "Country ID":"br","Average life expectancy (Y)":"72,25454545"},' + 
'{"Country":"Chile", "Country ID":"cl", "Average life expectancy (Y)":"78,49090909"},' + 
'{"Country":"Colombia", "Country ID":"co", "Average life expectancy (Y)":"72,7"},' + 
'{"Country":"Ecuador", "Country ID":"ec", "Average life expectancy (Y)":"75,02727273"},' + 
'{"Country":"Guyana", "Country ID":"gy", "Average life expectancy (Y)":"64,98181818"},' + 
'{"Country":"Paraguay", "Country ID":"py", "Average life expectancy (Y)":"71,55454545"},' + 
'{"Country":"Peru", "Country ID":"pe", "Average life expectancy (Y)":"72,98181818"},' + 
'{"Country":"Uruguay", "Country ID":"uy", "Average life expectancy (Y)":"76,06363636"},' + 
'{ "Country":"Venezuela, RB", "Country ID":"ve", "Average life expectancy (Y)":"73,61818182"},' + 
'{ "Country":"World", "Country ID":"world", "Average life expectancy (Y)":"69,51818182" } ]';
var obj = JSON.parse(text);
var CountryID = [];
var AvAge = [];
for(i=0; i < obj.length ; i++)
{
  CountryID.push(obj[i]["Country ID"]);
  AvAge.push(parseInt(obj[i]["Average life expectancy (Y)"]));
}

var Maxyears = Math.max.apply(null, AvAge);
var Minyears = Math.min.apply(null,AvAge);


  console.log(CountryID[0] + "  " + yearstocolour(AvAge[0], Maxyears, Minyears));
  changeColor(CountryID[0], yearstocolour(AvAge[0], Maxyears, Minyears));

function yearstocolour(years, maxyears, minyears)
{
  var YearsPerColourStep = (maxyears - minyears) / 16;
  var HigherThanMin = years - minyears;
  var StepsOfGreen = parseInt(HigherThanMin / YearsPerColourStep);
  var hexString = StepsOfGreen.toString(16);
  //var hex = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "B", "C", "D", "E", "F"];
  console.log(hexString);
  //hexString2 = hex[parseInt(hexString)];
  var Colour = "#00" + hexString + hexString + "00";
  return Colour;
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color. The CSS file that is linked to the HTML to which 
   this JS file is linked as well, has an influence on the colors as well. It not only 
   instantiates the colors. It also seems to overrule this function. The colors of the 
   countries that are coloured by class are immutable, while the countries coloured by ID are.*/
function changeColor(id, color) {
	document.getElementById(id).style.fill = color;
}

function argentinatocolor(color) {
  document.getElementById("ar").style.fill = color;
}