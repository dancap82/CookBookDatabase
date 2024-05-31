import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeListItems = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='recipe-page py-16'>
      <div className="recipe-list container mx-auto">
        <div className='title-recipe flex justify-center'>
          <h2 className="text-5xl font-bold mb-4">Recipe List</h2>
        </div>
        <div>
          <ul className="grid grid-cols-4 gap-4">
            {recipes.map(recipe => (
              <li key={recipe.id} className="p-2 m-2 bg-gray-100 rounded-md flex flex-col items-center">
                <Link to={`/recipes/${recipe.id}`} className="block p-2 rounded-md text-center flex flex-col items-center">
                  <img 
                    src={recipe.url} 
                    alt={recipe.name} 
                    className="mb-2" 
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <h3 className="text-lg font-semibold">{recipe.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeListItems;