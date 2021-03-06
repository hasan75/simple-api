const inputSearch = document.getElementById('search-field');
const ButtonToSearch = document.getElementById('button-search')

inputSearch.addEventListener('keyup', function(event){
    console.log('The Key Pressed:', event.key)
    if(event.key == 'Enter'){
        ButtonToSearch.click();
    }
})

const searchFood = async () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    //console.log(searchText)

    // clear data 
    searchField.value = '';
    if (searchText == '') {
        //please write something to display
    }
    else {
        // load data 
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        //console.log(url)

        const res = await fetch(url)
        const data = await res.json()
        displaySearchResutl(data.meals)
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displaySearchResutl(data.meals))
    }

}

const displaySearchResutl = meals => {
    const searchResult = document.getElementById('search-result')
    // clearing previous search result 
    //searchResult.innerHTML = ''
    searchResult.textContent = '';
    document.getElementById('meal-details').textContent = '';
    if (meals.length == 0) {
        //show no result found 
    }
    meals.forEach(meal => {
        //console.log(meal);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick ="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">How to make: ${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `
        searchResult.appendChild(div)
    });
}


const loadMealDetail = async mealId => {
    //console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0])

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]))

}

const displayMealDetail = meal => {
    console.log(meal)
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">How to make: ${meal.strInstructions.slice(0, 200)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    mealDetails.appendChild(div)
}