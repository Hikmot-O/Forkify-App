import View from './View.js'
import icons from '../../img/icons (1).svg';

class AddRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded';

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor(){
        super();
        this._addhandlerShowWindow();
        this._addhandlerHideWindow();
    }

    toggleWindow(){
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }
    _addhandlerShowWindow(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addhandlerHideWindow(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();

            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);

            handler(data);
            // console.log(handler(data));
        });
    }

}


export default new AddRecipeView();