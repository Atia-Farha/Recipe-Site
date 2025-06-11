const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recipeContainer = document.getElementById('recipeContainer');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const query = searchInput.value;

    if (!query) {
        recipeContainer.innerText = 'Please enter a search term.';

        return;
    }

    recipeContainer.textContent = '';
    recipeContainer.innerHTML = '<h2 class="recipe_heading">Recipes</h2>';

    const waitingMsg = document.createElement('h3');
    waitingMsg.textContent = 'Loading recipes...';
    waitingMsg.style.color = 'gray';
    recipeContainer.appendChild(waitingMsg);


    const apiUrl = `/getRecipes?query=${encodeURIComponent(query)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            recipeContainer.removeChild(waitingMsg);

            for (let i = 0; i < data.length; ++i) {
                const recipeName = data[i].title;
                const recipeId = data[i].id;
                const imageType = data[i].imageType;

                const recipeItem = document.createElement('div');
                recipeItem.classList.add('recipe_item');

                const recipeTitle = document.createElement('h3');
                recipeTitle.classList.add('recipe_title');
                recipeTitle.textContent = recipeName;

                const recipeImage = document.createElement('img');
                recipeImage.src = `https://img.spoonacular.com/recipes/${recipeId}-312x231.${imageType}`;

                recipeItem.addEventListener('click', () => {
                    window.open(`recipe-page/recipe.html?id=${recipeId}&title=${encodeURIComponent(recipeName)}`, '_blank');
                });

                recipeItem.appendChild(recipeImage);
                recipeItem.appendChild(recipeTitle);
                recipeContainer.appendChild(recipeItem);
            }
        })
        .catch(error => console.log(error));
});
