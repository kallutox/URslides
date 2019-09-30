/* eslint-env browser */
//wraps the whole search and provides full functionality only by calling the constructor

class Searcher {

    constructor(){
        this.searchInput = document.getElementById("itemsearch");
        this.searchButton = document.getElementById("itemsearch-btn");
        this.searchLink = document.getElementById("itemsearch-link");
        this.searchButton.addEventListener("click", onSearch.bind(this, {link: this.searchLink, input: this.searchInput}));
        
        let sbtn = this.searchButton;
        this.searchInput.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
            sbtn.click();
            }
        });
    }
}

function onSearch(searchProperties) {
    var link = searchProperties.link,
        value = searchProperties.input.value;
    link.href = "/search/" + value;
    link.click();
}

export default Searcher;