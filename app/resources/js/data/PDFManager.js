/* eslint-disable no-underscore-dangle */
import Observable, {Event} from "../utility/Observable.js";

/* eslint-env browser */
//a lot of this code is based on the pdf.js example by mozilla: https://mozilla.github.io/pdf.js/examples/

var isRendering = false,
    pageNumPending = null;

class PDFManager extends Observable{

    constructor(dimensions) {
        super();
        this._currentPage = 0;
        this.dimensions = dimensions;
        this.pageNum = 0;
        this.currentPDF = null;
    }

    renderPDF(pdfPath) {
        //here the pdf is rendered to the canvas by using the given path
        let newPDF = pdfjsLib.getDocument(pdfPath),
            self = this;

        newPDF.promise.then(function (pdf) {
            self.currentPDF = pdf;
            self.pageNum = pdf.numPages;
            self._currentPage = 1;
            self.addToRenderQueue(self._currentPage);
        });
    }

    addToRenderQueue(page) {
        //adds a desired page to the renderqueue
        if (isRendering) {
            pageNumPending = page;
        } else {
            this._currentPage = page;
            render(this.currentPDF, this._currentPage, this);
            this.notifyAll(new Event("pageChanged", {
                currentPage: this._currentPage,
                totalPages: this.pageNum,
            }));
        }
    }

    nextPage() {
        //renders the next page, if possible
        if (this._currentPage < this.pageNum) {
            this.addToRenderQueue(this._currentPage + 1);
        }
    }

    previousPage() {
        //renders the previous page, if possible
        if (this._currentPage > 1) {
            this.addToRenderQueue(this._currentPage - 1);
        }
    }

    get currentPage() {
        return this._currentPage;
    }
}

function render(pdf, page, self) {
    //this function gets a loadingTask and translates it into a renderedPDF
    pdf.getPage(page).then(function (page) {
        var viewport = page.getViewport({ scale: 1 }),
            renderContext = 0,
            renderTask = null,
            scale,
            scaledViewport,
            canvas,
            context;
        
        //choose the correct dimension scaling, if pdf is horizontal scale by width, if pdf is vertical scale by height
        if(viewport.height > viewport.width) {
            scale = self.dimensions.height / viewport.height;
        } else {
            scale = self.dimensions.width / viewport.width;
        }

        scaledViewport = page.getViewport({ scale: scale });
        canvas = document.getElementById("reader-canvas");
        context = canvas.getContext("2d");
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
