/* eslint-env browser */

class PDFManager {

    constructor() {
        this.maxVH = getMaxVH();
        this.currentPage = 0;
        this.currentPDF = null;
        this.isRendering = false;
    }

    loadPDFbyID(id) {
        //with this function later the Database can be accessed to get the desired item as a loadingTask-object, which represents the pdf
        this.currentPDF = pdfjsLib.getDocument("./resources/example.pdf");
    }

    render(page) {
        //this function gets a loadingTask and translates it into a renderedPDF
        this.currentPage = page;
        let vh = this.maxVH;
        this.currentPDF.promise.then(function (pdf) {
            let h = vh;
            pdf.getPage(page).then(function (page) {
                var desiredHeight = h * 0.7,
                    viewport = page.getViewport({ scale: 1}),
                    scale = desiredHeight / viewport.height,
                    scaledViewport = page.getViewport({ scale: scale }),
                    canvas = document.getElementById("reader-canvas"),
                    context = canvas.getContext("2d"),
                    renderContext = 0;
                viewport = page.getViewport({ scale: scale});
                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;
                renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                page.render(renderContext);
            });
        });
    }

    get nextPage() {
        return this.currentPage + 1;
    }

    get previousPage() {
        return this.currentPage - 1;
    }
}

function getMaxVH() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

export default PDFManager;