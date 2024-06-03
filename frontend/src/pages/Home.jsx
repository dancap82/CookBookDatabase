import { useEffect, useState } from 'react';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null); 



useEffect(() => {
  fetch(`http://localhost:3000/recipes`)
  .then((response) => response.json())
  .then((data) => {
    setRecipes(data);
    console.log(data);
  })
  .catch((error) => setError(error));
  }, []);

  return (
    <>
      <div className="main-page-featured-section">
          <div className="featured-recipes-title text-xl md:text-4xl font-bold my-6">
            Featured Recipes
          </div>
      </div>
      <div className="recipe-list grid gap-10 mb-8 sm:grid-cols-2 lg:grid-cols-2">
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <div className=''>
            <h3 className="my-1 h-8 text-xl">{recipe.name}</h3>
              <div class="flex justify-center items-center">
              
              <img className="size-[25rem] rounded-lg" src={recipe.url} alt={recipe.name} ></img>
              </div>
            </div>
            <div className='px-9 py-2 text-center'>
              {recipe.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};



export default Home