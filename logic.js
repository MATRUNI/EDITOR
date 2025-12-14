
let displayText=[];
let left='';
let right='';
let index=0;
let cursorIndex=0;
let area=document.getElementById("area");

//From here to
let cursor=document.createElement("span");
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
area.append(wrapper.appendChild(leftNode),cursor,wrapper.appendChild(rightNode));
// displayText.push(left);
function addLine(str)
{
    let line=document.createElement("div")
    line.textContent=str;
    area.appendChild(line);
    let br=document.createElement("br");
    area.appendChild(br);
    area.append(wrapper.appendChild(leftNode),cursor,wrapper.appendChild(rightNode));
}
document.addEventListener('keydown', (pressed)=>{
    if(pressed.key.length===1)
        left+=pressed.key;
    else if (pressed.key==="Backspace")
    {
        if(left.length===0&&area.children.length>0)
        {
            let div=document.getElementsByTagName('div')[cursorIndex];
            addLine("");
            let noOFChildren=area.children.length;
            let childToBeDelted=cursorIndex*2-1;
            if(noOFChildren>2)
            {
                left=div.textContent;
                div.textContent="";;
                div.append(leftNode,cursor,rightNode);
                area.children[childToBeDelted].remove();
                area.children[childToBeDelted].remove();
                cursorIndex--;
                index--;
            }
        }
        else
        left=left.slice(0,-1);
    }
    else if(pressed.key==="Tab")
    {
        pressed.preventDefault();
        left+="      ";
    }
    else if(pressed.key==="ArrowLeft"&&left.length!=0)
    {
        // console.log("Arrow left:", left,":",right);
        right=left.slice(-1)+right;
        left=left.slice(0,-1);
        // document.getElementsByTagName('div')[cursorIndex].append(left,cursor,right);
    }
    else if(pressed.key==="ArrowRight"&&right.length!=0)
    {
        left+=right.slice(0,1);
        right=right.slice(1);
    }
    else if(pressed.key==="ArrowUp"&&displayText.length>0&&cursorIndex>0)
    {
        let divsInArea=area?.getElementsByTagName("div")[cursorIndex-1];
        let divs2=area.getElementsByTagName("div")[cursorIndex]
        // console.log(!divs2)
        if(cursorIndex===index&& !divs2)
       { 
            displayText.push(left);
            let line=document.createElement("div")
            line.textContent=left+right;
            area.appendChild(line);
            left=divsInArea.textContent;
            right="";
            divsInArea.textContent=""
            divsInArea.append(leftNode,cursor,rightNode);
            cursorIndex--;
        }
        else
        {
            cursorIndex--;
            divs2.textContent=left+right;
            left=divsInArea.textContent;
            right=""
            divsInArea.textContent=""
            divsInArea.append(leftNode,cursor,rightNode);
        }

    }
    else if(pressed.key==="ArrowDown")
    {
        let divsInArea=area.getElementsByTagName("div")[cursorIndex];
        let divs2=area.getElementsByTagName("div")[cursorIndex+1]
        if(cursorIndex<index)
        {
            divsInArea.textContent=left+right; 
            left=divs2.textContent;
            right="";
            divs2.textContent="";
            divs2.append(leftNode,cursor,rightNode);
            cursorIndex++;
        }
        else
            return;
    }
    else if(pressed.key==="Enter"){
        let divsInArea=area.getElementsByTagName("div")[cursorIndex];
        let divs2=area.getElementsByTagName("div")[cursorIndex+1]
        if(index===cursorIndex&&!divsInArea)
        {
            // console.log("Enter's if");
            displayText.push(left);
            addLine(left);
            left="";
        }
        else if(!divs2)
        {
            // console.log("ENter's else IF",divsInArea.textContent);
            divsInArea.textContent=left+right;
            let br=document.createElement("br");
            area.appendChild(br);

            left="";
            area.append(wrapper.appendChild(leftNode),cursor,wrapper.appendChild(rightNode));
        }
        else{
            // console.log("Enter's ELSE");
            divsInArea.textContent=left;
            left="";
            let newDiv=document.createElement("div");
            area.insertBefore(newDiv, divs2)
            newDiv.append(leftNode,cursor,rightNode);
            let br=document.createElement("br");
            area.insertBefore(br, divs2);
        }
        cursorIndex++;
        index++;
    }
    else
        return;

    leftNode.textContent=left;
    rightNode.textContent=right;
});

let pointer=document.createElement("div");
pointer.classList.add("pointer");
document.body.appendChild(pointer);
document.addEventListener('mousemove', (e)=>{
    pointer.style.left=e.pageX+"px";
    pointer.style.top=e.pageY+"px";
})


area.addEventListener('click', e=>{
    const range=document.caretPositionFromPoint(e.clientX, e.clientY);
    if(!range)
        return;
    let divsInArea=e.target;
    let divs2=area.getElementsByTagName("div")[cursorIndex];
    // let divsInArea=area.getElementsByTagName("div")[closest];
    if(cursorIndex===index&& !divs2)
    { 
        let line=document.createElement("div")
        line.textContent=left+right;
        area.appendChild(line);
        let index=range.offset;
        left=divsInArea.textContent.slice(0,index);
        right=divsInArea.textContent.slice(index);

        divsInArea.textContent=""
        divsInArea.append(leftNode,cursor,rightNode);
        cursorIndex=indexOfDivTags(divsInArea);
    } 
    else
    {
        cursorIndex=indexOfDivTags(divsInArea);
        divs2.textContent=left+right;
        let index=range.offset;
        left=divsInArea.textContent.slice(0,index);
        right=divsInArea.textContent.slice(index)
        divsInArea.textContent=""
        divsInArea.append(leftNode,cursor,rightNode);
    }

    leftNode.textContent=left;
    rightNode.textContent=right;
});
function indexOfDivTags(child)
{
    let c=Array.from(area.children).filter(element=> element.tagName==="DIV");
    return c.indexOf(child);
}