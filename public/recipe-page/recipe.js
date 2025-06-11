document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cardContainer');
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    let recipeName = urlParams.get('title');

    recipeName = recipeName.replace(/\b\w/g, l => l.toUpperCase());
    document.title = `${recipeName} - Recipe Site`;

    if (recipeId) {
        const apiUrl = `/getRecipeCard?id=${recipeId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.url) {
                    container.innerHTML = `<img src="${data.url}" alt="Recipe Card">`;
                } else {
                    container.textContent = 'Recipe card not available';
                }
            })
            .catch(error => {
                container.textContent = 'Failed to load recipe. Error: ' + error;
            });
    } else {
        container.textContent = 'Failed to load recipe';
    }
});