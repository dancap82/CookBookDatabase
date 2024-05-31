import { useEffect, useState } from 'react';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        console.log(data); // Log the fetched data here
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
              {recipe.url && (
                <img 
                  src={recipe.url} 
                  alt={recipe.name} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
            </div>
            <div className=''>
              {recipe.description}
            </div>
            {/* <div className=''>
              <p>{recipe.fields.ingredients}</p> */}
            {/* </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;