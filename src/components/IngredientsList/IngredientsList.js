import React from "react";
import PropTypes from "prop-types";
import "./IngredientsList.scss";

const ingredientsList = props => (
  <div className={props.menuOpened ? "IngredientsList opened" : "IngredientsList"}>
    {props.ingredients.map((ingredient, index) => {
      return (
        <div
          className={props.selectedIngredients.includes(ingredient) ? "Ingredient selected" : "Ingredient"}
          key={ingredient + index}
          onClick={props.ingredientSelected}
          data-value={ingredient}
        >
          <input
            type="checkbox"
            checked={props.selectedIngredients.includes(ingredient) ? "checked" : ""}
            onChange={props.ingredientSelected}
            value={ingredient}
          />

          {ingredient}
        </div>
      );
    })}
  </div>
);

ingredientsList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  selectedIngredients: PropTypes.array.isRequired,
  ingredientSelected: PropTypes.func.isRequired,
  menuOpened: PropTypes.bool.isRequired
};

export default ingredientsList;
