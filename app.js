
// Creating init Fuse module based on preloaded json
var fuse;
fetch('data.json')
    .then((res) => res.json())
    .then((data) => initFuse(data))

function initFuse(data) {
    const scopes = {
        includeScore: true,
        keys: [
            "text"
        ]
    }
    fuse = new Fuse(data, scopes);
}

// Create Search
const searchBar = document.getElementById('s-input');
const resultsArea = document.getElementById('results');
searchBar.addEventListener("keyup", () => {
    if (searchBar.value.length > 1) {
        var result = fuse.search(searchBar.value);
        resultsArea.innerHTML = "";
        for (i = 0; i < result.length; i ++) {
            var item = `<li>${result[i].item.text}</li>`;
            resultsArea.innerHTML += item;
        }
    }
})