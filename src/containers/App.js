import React, { Component } from "react";
import Search from "../components/Search/Search";
import RecipeList from "../components/RecipeList/RecipeList";
import IngredientsList from "../components/IngredientsList/IngredientsList";
import Loader from "../components/Loader/Loader";
import Pagination from "../components/Pagination/Pagination";
import "./App.scss";
import Error from "../components/Error/Error";

class App extends Component {
  state = {
    ingredients: [],
    selectedIngredients: [],
    recipes: [],
    loading: false,
    error: false,
    currentSearchQuery: "",
    currentPage: 1,
    menuOpened: false
  };

  componentDidMount() {
    this.fetchResults();
  }

  doFetch(query, page) {
    if (!query && !page) {
      return fetch("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/");
    }
    if (query && !page) {
      return fetch("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?" + query);
    }
    if (!query && page) {
      return fetch("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?p=" + page);
    }
    if (query && page) {
      return fetch("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?" + query + "&p=" + page);
    }
  }

  fetchResults(query = "", page) {
    this.setState({
      error: false,
      loading: true,
      selectedIngredients: []
    });

    let ingredientsArray = [];
    let tempRecipes = [];

    if (!this.state.currentSearchQuery.includes(query)) {
      this.setState({ currentPage: 1 });
    }

    this.doFetch(query, page)
      .then(blob => blob.json())
      .then(data => {
        data.results.map(recipe => {
          if (!arguments.length) {
            let ingredients = recipe.ingredients.split(",");

            ingredients.map(ingredient => ingredientsArray.push(ingredient.trim()));

            let ingredientsSet = [...new Set(ingredientsArray)];

            this.setState({ ingredients: ingredientsSet });
          }

          return tempRecipes.push(recipe);
        });

        this.setState({
          loading: false,
          recipes: tempRecipes,
          currentSearchQuery: query
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  makeQueryString() {
    if (this.searchInputRef.value === "" && !this.state.selectedIngredients.length) {
      return "";
		}
		if (this.searchInputRef.value !== "" && !this.state.selectedIngredients.length) {
      return "q=" + this.searchInputRef.value;
    }
    if (this.searchInputRef.value === "" && this.state.selectedIngredients.length) {
      return "i=" + this.state.selectedIngredients.join(",");
    }
    if (this.searchInputRef.value !== "" && this.state.selectedIngredients.length) {
      return ("q=" + this.searchInputRef.value + "&i=" + this.state.selectedIngredients.join(","));
    }
  }

  handleSearch = this.handleSearch.bind(this);
  handleSearch(e) {
    e.preventDefault();

    if (this.state.menuOpened) {
      this.setState(prevState => ({ menuOpened: !prevState.menuOpened }));
    }

    if (e.target.nodeName === "FORM") {
      let combinedQueryString = this.makeQueryString();

      this.fetchResults(combinedQueryString);
    }
    if (e.target.nodeName === "BUTTON") {
      this.searchInputRef.value = "";

      this.fetchResults("i=" + e.target.value);
    }
  }

  handleIngredientSelected = this.handleIngredientSelected.bind(this);
  handleIngredientSelected(e) {
    let tempSelectedIngredients = [...this.state.selectedIngredients];

    let ingredient = e.target.value ? e.target.value : e.target.dataset.value;

    if (!this.state.selectedIngredients.includes(ingredient)) {
      tempSelectedIngredients.push(ingredient);
    } else {
      tempSelectedIngredients.splice(tempSelectedIngredients.indexOf(ingredient), 1);
    }

    this.setState({
      selectedIngredients: tempSelectedIngredients
    });
  }

  handleNextPageClicked = this.handleNextPageClicked.bind(this);
  handleNextPageClicked() {
    this.fetchResults(this.state.currentSearchQuery, this.state.currentPage + 1);

    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  }

  handlePrevPageClicked = this.handlePrevPageClicked.bind(this);
  handlePrevPageClicked() {
    this.fetchResults(this.state.currentSearchQuery, this.state.currentPage - 1);

    this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
  }

  handleMenuToggle = this.handleMenuToggle.bind(this);
  handleMenuToggle() {
    this.setState(prevState => ({ menuOpened: !prevState.menuOpened }));
  }

  render() {
    let recipeList = null;

    if (this.state.loading) {
      recipeList = <Loader />;
    } else if (this.state.error) {
      recipeList = <Error error="There was an error while processing data!" />;
    } else if (!this.state.recipes.length) {
      recipeList = (
        <Error error="There are no recipes for searched ingredients." />
      );
    } else if (this.state.recipes.length) {
      recipeList = (
        <RecipeList
          recipes={this.state.recipes}
          handleSearch={this.handleSearch}
        />
      );
    }

    return (
      <main>
        <Search
          menuOpened={this.state.menuOpened}
          handleMenuToggle={this.handleMenuToggle}
          handleSearch={this.handleSearch}
          inputRef={input => (this.searchInputRef = input)}
        >
          <IngredientsList
            menuOpened={this.state.menuOpened}
            ingredients={this.state.ingredients}
            selectedIngredients={this.state.selectedIngredients}
            ingredientSelected={this.handleIngredientSelected}
          />
        </Search>

        {recipeList}

        <Pagination
          currentPage={this.state.currentPage}
          nextPageClicked={this.handleNextPageClicked}
          prevPageClicked={this.handlePrevPageClicked}
        />
      </main>
    );
  }
}

export default App;
