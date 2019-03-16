import React from "react";
import PropTypes from "prop-types";
import "./RecipeList.scss";

const recipeList = props => (
  <div className="RecipeList">
    <ul>
      {props.recipes.map((recipe, index) => {
        return (
          <li className="Recipe" key={recipe.title + index}>
            <div className="RecipeImage">
              <img src={recipe.thumbnail} alt={recipe.title + " image"} />
            </div>
            <div className="RecipeDescription">
              <p>
                <a href={recipe.href} target="_blank" rel="noopener noreferrer">
                  {recipe.title}
                </a>
              </p>
              {recipe.ingredients.split(",").map((ingredient, index) => {
                return (
                  <button
                    type="button"
                    value={ingredient.trim()}
                    onClick={e => props.handleSearch(e)}
                    key={ingredient + index}
                  >
                    {ingredient.trim()}
                  </button>
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

recipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired
};

export default recipeList;
