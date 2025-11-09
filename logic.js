
let displayText=[];
let left='';
let right='';
let index=0;
let area=document.getElementById("area");

//From here to
let cursor=document.createElement("div");
cursor.classList.add("cursor");
// let colour = [
//     "red", "green", "blue", "orange", 
//     "purple", "yellow", "pink", "cyan", 
//     "magenta", "lime", "brown", "indigo", 
//     "turquoise", "violet", "gold", "silver"
// ];
let colour = [
  "#FF5555", // bright red
  "#50FA7B", // light green
  "#8BE9FD", // cyan blue
  "#FFB86C", // orange
  "#BD93F9", // light purple
  "#F1FA8C", // pale yellow
  "#FF79C6", // pink
  "#00FFFF", // cyan
  "#FF55FF", // magenta
  "#A6FF00", // lime
  "#D27D2D", // warm brown
  "#7B68EE", // indigo
  "#1ABC9C", // turquoise
  "#9B59B6", // violet
  "#FFD700", // gold
  "#C0C0C0"  // silver
];

let colourIndex=0;
function changeColour()
{
    cursor.style.backgroundColor=colour[colourIndex];
    colourIndex=(colourIndex+1)%colour.length;
}
setInterval(changeColour,1000);
// here- made the cursor blink on div


let rightNode=document.createTextNode(right)
let leftNode=document.createTextNode(left)

let wrapper=document.createElement("span");
wrapper.style.whiteSpace="pre";
area.append(wrapper.appendChild(leftNode),cursor,wrapper.appendChild(rightNode));
// displayText.push(left);
document.addEventListener('keydown', (pressed)=>{
    if(pressed.key.length===1)
        left+=pressed.key;
    else if (pressed.key==="Backspace")
    {
        if(left.length===0&&area.children.length>0)
        {
            console.log(area.children.length);
            area.children[area.children.length-2].remove();
            left=area.children[area.children.length-2].textContent;
            area.children[area.children.length-2].remove();
        }
        else
        left=left.slice(0,-1);
    }
    else if(pressed.key==="Tab")
    {
        pressed.preventDefault();
        left+="\t";
    }
    else if(pressed.key==="ArrowLeft"&&left.length!=0)
        {
        right=left.slice(-1)+right;
        // console.log(right)
        left=left.slice(0,-1);
        // console.log(left)
    }
    else if(pressed.key==="ArrowRight"&&right.length!=0)
        {
            left+=right.slice(0,1);
            // console.log(left)
            right=right.slice(1);
            // console.log(right)
        }
        else if(pressed.key==="Enter"){
            displayText.push(left);
            left="";
            let line=document.createElement("div")
            line.textContent=displayText[index];
            area.appendChild(line);
            let br=document.createElement("br");
            area.appendChild(br);
            area.append(wrapper.appendChild(leftNode),cursor,wrapper.appendChild(rightNode));
            index++;
    }
    else
        return;

    rightNode.textContent=right;
    leftNode.textContent=left;
});

let pointer=document.createElement("div");
pointer.classList.add("pointer");
document.body.appendChild(pointer);
document.addEventListener('mousemove', (e)=>{
    pointer.style.left=e.pageX+"px";
    pointer.style.top=e.pageY+"px";
})