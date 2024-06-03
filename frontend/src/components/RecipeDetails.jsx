
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const RecipeDetails = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true); 
//     setError(null); 
//     fetch(`http://localhost:3000/recipes/${id}`)  
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setRecipe(data);
//       })
//       .catch(err => {
//         console.error(err);
//         setError(err.message);
//       })
//       .finally(() => {
//         setLoading(false); 
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className='recipe-page'>
//       {recipe && (
//         <div className='container mx-auto px-4 py-8'>
//           <div className='title-recipe'>
//             <h2 className="text-4xl font-bold">{recipe.name}</h2>
//           </div>
//           <div className="mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//             {recipe.url && (
//               <div>
//                 <img 
//                   src={recipe.url} 
//                   alt={recipe.name} 
//                   className="w-full rounded-lg h-auto mb-4"
//                 />
//                 <div className="details-col">
//                   <h3 className="text-xl font-semibold mb-2">Description:</h3>
//                   <p>{recipe.description}</p>
//                 </div>
//               </div>
//             )}

//             <div className='details-col'>
//               <div className="mb-4">
//                 <h3 className="text-xl font-semibold mb-2">Steps:</h3>
//                 <p>{recipe.steps}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeDetails;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch the recipe details
    fetch(`http://localhost:3000/recipes/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setRecipe(data);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });

    // Fetch the ingredients for the specific recipe
    fetch(`http://localhost:3000/ingredients`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const filteredIngredients = data.filter(ingredient => ingredient.recipe_id === parseInt(id));
        setIngredients(filteredIngredients);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='recipe-page'>
      {recipe && (
        <div className='container mx-auto px-4 py-8'>
          <div className='title-recipe'>
            <h2 className="text-4xl font-bold">{recipe.name}</h2>
          </div>
          <div className="mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipe.url && (
              <div>
                <img 
                  src={recipe.url} 
                  alt={recipe.name} 
                  className="w-full rounded-lg h-auto mb-4"
                />
                <div className="details-col">
                  <h3 className="text-xl font-semibold mb-2">Description:</h3>
                  <p>{recipe.description}</p>
                </div>
              </div>
            )}
            <div className='details-col'>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Steps:</h3>
                <p>{recipe.steps}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
                <ul>
                  {ingredients.map(ingredient => (
                    <li key={ingredient.ingredient_id}>
                      {ingredient.ingredient_name} - {ingredient.ingredient_amount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
