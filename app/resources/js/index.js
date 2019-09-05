/* eslint-env browser */
var loadingTask,
    viewport,
    canvas,
    context,
    renderContext;

function init() {
    console.log("app started!");
    loadingTask = pdfjsLib.getDocument('./resources/example.pdf');
    loadingTask.promise.then(function (pdf) {
        pdf.getPage(1).then(function (page) {
            var desiredWidth = document.getElementById('reader').getBoundingClientRect().width;
            console.log(document.getElementById('reader').getBoundingClientRect().width);
            var viewport = page.getViewport({ scale: 1, });
            var scale = desiredWidth / viewport.width;
            viewport = page.getViewport({ scale: scale, });
            var scaledViewport = page.getViewport({ scale: scale, });

            var canvas = document.getElementById('reader-canvas');
            var context = canvas.getContext('2d');
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
}

init();