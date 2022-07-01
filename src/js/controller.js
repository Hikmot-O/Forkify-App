import * as model from './model.js'
import {MODAL_CLOSE_SEC} from './config.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import bookmarksView from './views/bookmarksView.js';

// if(module.hot){
//   module.hot.accept();
// }

// console.log(icons);


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////npm install --save regenerator-runtime import 'regenerator-runtime'


const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    console.log(window.location.hash);
    console.log(id);
    
    if(!id) return;
    recipeView.renderSpinner();

    //0) Update result view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);

    //1) Loading recipe
    await model.loadRecipe(id);
    // const {recipe} = model.state;


    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    //TEST
    // controlServings();

    
  } catch(err){
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try{
    //Dispaly spinner
    resultsView.renderSpinner();

    //Get search query
    const query = SearchView.getQuery();
    if(!query) return;

    //Load dearch results
    await model.loadSearchResults(query);

    //Render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultPage());
    // console.log(model.state.search.results);

    //Render initial pagination button
    paginationView.render(model.state.search);

    // //Clear input field
    // SearchView.clearInput();

  }catch(err){
    console.log(err);
  }
};
// controlSearch();

const controlPagination = function(goToPage){
  console.log(goToPage);
  //Render new results
    resultsView.render(model.getSearchResultPage(goToPage));

    //Render NEW initial pagination button
    paginationView.render(model.state.search);
  console.log('pag controller');
}

const controlServings = function(newServings){
  //Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function(){
  //Add or remove bookmark
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }else{
    model.removeBookmark(model.state.recipe.id);
  }
  console.log(model.state.recipe)

  //Update recipe view
  recipeView.update(model.state.recipe);

  //Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try{ 
    //Show loading spinner
    addRecipeView.renderSpinner();

    //Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe in the recipe view
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    addRecipeView.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }catch(err){
    console.error('¬¬¬¬', err);
    addRecipeView.renderError(err.message);
  }
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
