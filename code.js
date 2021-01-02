var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (figma.currentPage.selection.length !== 1) {
            return "Select a text box to split.";
        }
        const node = figma.currentPage.selection[0];
        if (node.type !== 'TEXT') {
            return "Select a text box to split.";
        }
        if (node.type == "TEXT") {
            const font = node.fontName != figma.mixed ? node.fontName : { family: "Roboto", style: "Regular" };
            yield figma.loadFontAsync(font);
            var strArr = node.characters.split("\n");
            const nodes = [];
            var x = node.x + node.width + 10;
            for (let i = 0; i < strArr.length; i++) {
                if (strArr[i].length > 0) {
                    const cloned = node.clone();
                    cloned.x = x;
                    cloned.fontName = font;
                    cloned.characters = strArr[i];
                    cloned.fontSize = node.fontSize;
                    x += cloned.width + 10;
                    nodes.push(cloned);
                }
            }
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
            if (node.fontName == figma.mixed) {
                return "Selection contained mixed font, so new boxes contain default text Roboto.";
            }
        }
    });
}
main().then((message) => {
    figma.closePlugin(message);
});
