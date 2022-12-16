import Fuse from '/fuse.js'



// Creating init Fuse module based on preloaded json
var fuse;
fetch('data.json')
    .then((res) => res.json())
    .then((data) => initFuse(data))

function initFuse(data) {
    const scopes = {
        includeScore: true,
        keys: [
            "attributes.title.en"
        ]
    }
    fuse = new Fuse(data['data'], scopes);
}

// Create Search
const searchBar = document.getElementById('s-input');
const resultsArea = document.getElementById('results');
searchBar.addEventListener("keyup", () => {
    if (searchBar.value.length > 1) {
        var result = fuse.search(searchBar.value);
        var i;
        resultsArea.innerHTML = "";
        for (i = 0; i < result.length; i ++) {
            var item = `<li>${result[i].item.id}</li>`;
            resultsArea.innerHTML += item;
        }
    }
})