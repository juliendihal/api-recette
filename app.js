let dataRecette = [];
const section = document.querySelector('section');
const input = document.getElementById('search');
let search = "";
async function getRecette() {
  await  fetch("https://themealdb.com/api/json/v1/1/search.php?s=" + search)
.then((res) => res.json())
.then ((data)=> (dataRecette = data.meals));
}



async function display () {
   await getRecette()
   section.innerHTML = dataRecette
   .map((data) => {
       let ingredientTab = [];
    for(i = 1 ; i <= 20; i++){
        ingredient = data[`strIngredient${i}`];
        portion = data[`strMeasure${i}`];
        if(ingredient){
            ingredientTab.push('<li>' + ingredient + portion + '</li>');
        }
        
    }
   
 return`
 <div class="card">
   <h3>${data.strMeal}</h3>
   <p>${data.strArea}<p>
   <img src="${data.strMealThumb}" alt="image${data.strMeal}">
   <ul>${ingredientTab.join("")}</ul>
   </div>
   `
}
   )

}

display();

input.addEventListener('input', () => {
    search = input.value;
    display();
   });
