let div=document.getElementById("x");

div.addEventListener("click",(e)=>{
    const range=document.caretPositionFromPoint(e.clientX, e.clientY);
    // let node=range.startContainer;
    let index=range.offset;
    let closest=e.target;
    // console.log("Range: ",range);
    // console.log("Node: ",node.textContent[index]);
    console.log("Div number:", Array.from(div.children).indexOf(closest))
    console.log("Index",index);

    let leftPart=closest.textContent.slice(0, index);
    let righttPart=closest.textContent.slice(index);
    console.log("Left Part:", leftPart);
    console.log("Rightt Part:", righttPart);
})