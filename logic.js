
let displayText=[];
let left='';
let right='';
let index=0;
let cursorIndex=0;
let area=document.getElementById("area");
let rightNode=document.createTextNode(right)
let leftNode=document.createTextNode(left)
class KeyBoardEvents
{
    constructor()
    {
        this.eventListeners();
    }
    eventListeners()
    {
        document.addEventListener('keydown', (pressed)=>{
            if(pressed.key.length===1)
                left+=pressed.key;
            else if (pressed.key==="Backspace")
            {
                this.backSpace();
            }
            else if(pressed.key==="Tab")
            {
                pressed.preventDefault();
                left+="      ";
            }
            else if(pressed.key==="ArrowLeft"&&left.length!=0)
            {
                // console.log("Arrow left:", left,":",right);
                this.leftKey();
                // document.getElementsByTagName('div')[cursorIndex].append(left,cursor,right);
            }
            else if(pressed.key==="ArrowRight"&&right.length!=0)
            {
                this.rightKey();
            }
            else if(pressed.key==="ArrowUp"&&displayText.length>0&&cursorIndex>0)
            {
                this.upKey();

            }
            else if(pressed.key==="ArrowDown")
            {
                this.downKey()
            }
            else if(pressed.key==="Enter")
            {
                this.enterKey();
            }
            else
                return;
            leftNode.textContent=left;
            rightNode.textContent=right;
        });
    }
    leftKey()
    {
        right=left.slice(-1)+right;
        left=left.slice(0,-1);
    }
    rightKey()
    {
        left+=right.slice(0,1);
        right=right.slice(1);
    }
    upKey()
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
    downKey()
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
    enterKey()
    {
            let divsInArea=area.getElementsByTagName("div")[cursorIndex];
            let divs2=area.getElementsByTagName("div")[cursorIndex+1]
            if(index===cursorIndex&&!divsInArea)
            {
                // console.log("Enter's if");
                displayText.push(left);
                this.addLine(left);
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
    backSpace()
    {
        if(left.length===0&&area.children.length>0)
        {
            let div=document.getElementsByTagName('div')[cursorIndex];
            this.addLine("");
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
    addLine(str)
    {
        let line=document.createElement("div")
        line.textContent=str;
        area.appendChild(line);
        let br=document.createElement("br");
        area.appendChild(br);
        area.append(wrapper.appendChild(leftNode),cursor,wrapper.appendChild(rightNode));
    }
}
new KeyBoardEvents();

class MouseEvents
{
    constructor()
    {
        this.colour = [
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
        this.cursor=document.createElement("span");
        this.colourIndex=0;
        this.textCaretDecoration();
        let wrapper=document.createElement("span");
        area.append(wrapper.appendChild(leftNode),cursor,wrapper.appendChild(rightNode));
    }
    textCaretDecoration()
    {
        //From here to
        this.cursor.classList.add("cursor");
        // let colour = [
        //     "red", "green", "blue", "orange", 
        //     "purple", "yellow", "pink", "cyan", 
        //     "magenta", "lime", "brown", "indigo", 
        //     "turquoise", "violet", "gold", "silver"
        // ];
        setInterval(this.changeColour,1000);
        // here- made the cursor blink on div
    }
    changeColour()
    {
        this.cursor.style.backgroundColor=this.colour[this.colourIndex];
        this.colourIndex=(this.colourIndex+1)%this.colour.length;
    }
}
new MouseEvents();


// displayText.push(left);


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