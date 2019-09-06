/* eslint-env browser */
//a lot of this code is based on the pdf.js example by mozilla: https://mozilla.github.io/pdf.js/examples/
var isRendering = false,
    pageNumPending = null;

class PDFManager {

    constructor() {
        this.maxVH = getMaxVH();
        this.currentPageOn = 0;
        this.pageNum = 0;
        this.currentPDF = null;
    }

    loadPDFbyID(id) {
        //with this function later the Database can be accessed to get the desired item as a loadingTask-object, which represents the pdf
        let newPDF = pdfjsLib.getDocument("./resources/example.pdf"),
            self = this;

        newPDF.promise.then(function (pdf) {
            self.currentPDF = pdf;
            self.pageNum = pdf.numPages;
            self.currentPageOn = 1;
            render(self.currentPDF, self.currentPageOn, self.maxVH);
        });
    }

    addToRenderQueue(page) {
        //adds a desired page to the renderqueue
        this.currentPageOn = page;
        if (isRendering) {
            pageNumPending = page;
        } else {
            render(this.currentPDF, this.currentPage, this.maxVH);
        }
    }

    nextPage() {
        //renders the next page, if possible
        if (this.currentPageOn < this.pageNum) {
            this.addToRenderQueue(this.currentPage + 1);
        }
    }

    previousPage() {
        //renders the previous page, if possible
        if (this.currentPageOn > 1) {
            this.addToRenderQueue(this.currentPage - 1);
        }
    }

    get currentPage() {
        return this.currentPageOn;
    }
}

function render(pdf, page, vh) {
    //this function gets a loadingTask and translates it into a renderedPDF
    let h = vh;
    pdf.getPage(page).then(function (page) {
        var desiredHeight = h * 0.7,
            viewport = page.getViewport({ scale: 1 }),
            scale = desiredHeight / viewport.height,
            scaledViewport = page.getViewport({ scale: scale }),
            canvas = document.getElementById("reader-canvas"),
            context = canvas.getContext("2d"),
            renderContext = 0,
            renderTask = null;
        viewport = page.getViewport({ scale: scale });
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        
        renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
            isRendering = false;
            if (pageNumPending !== null) {
              // New page rendering is pending
              render(pdf, pageNumPending, vh);
              pageNumPending = null;
            }
          });
    });
}

function getMaxVH() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

export default PDFManager;