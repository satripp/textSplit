async function main(): Promise<string | undefined> {

  if (figma.currentPage.selection.length !== 1) {
    return "Select a text box to split."
  }

  const node = figma.currentPage.selection[0]
  if (node.type !== 'TEXT') {
    return "Select a text box to split."
  }

  if (node.type == "TEXT"){
    const font = node.fontName != figma.mixed ? node.fontName : { family: "Roboto", style: "Regular"};
    await figma.loadFontAsync(font);

    var strArr = node.characters.split("\n")
    const nodes: SceneNode[] = [];
    var x = node.x + node.width+10;

    for(let i = 0; i < strArr.length; i++) {
      if(strArr[i].length > 0){
        const cloned = node.clone()
        cloned.x = x;
        cloned.fontName = font
        cloned.characters = strArr[i];
        cloned.fontSize = node.fontSize
        x+=cloned.width+10;
        nodes.push(cloned)
      }
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    if(node.fontName==figma.mixed){ return "Selection contained mixed font, so split text is in default text Roboto."}
  }
}

main().then((message: string | undefined) => {
  figma.closePlugin(message)
})