import icons from '../../img/icons (1).svg';
export default class View {
    _data;

    /**
     * Render the received object to the Dom
     * @param {Object | Object[]} data The data to be rendered (e.g recipe)
     * @returns 
     */
    render(data){
        if(!data || (Array.isArray(data) && data.length === 0))
          return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        // this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data){
        // if(!data || (Array.isArray(data) && data.length === 0))
        //   return this.renderError();
        this._data = data;
        const newMarkup = this._generateMarkup();

        //To convert newMarkup string to DOM object (virtual DOM object)
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        // console.log(curElements, newElements);

        //Looping over the 2 arrays at the same time
        newElements.forEach((newEl, i) => {
           const curEl = curElements[i];
          //  console.log(curEl, newEl.isEqualNode(curEl));

           //Update changed text
           if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
               console.log(newEl.firstChild?.nodeValue.trim())
               curEl.textContent = newEl.textContent;
           }

           //UPdate changes attributes
           if(!newEl.isEqualNode(curEl)){
               Array.from(newEl.attributes).forEach(attr => {
                   curEl.setAttribute(attr.name, attr.value);
               });
           }
        });


    }
    
    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function(){
        const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `
        this._parentElement.innerHTML = '';
        // this._clear;
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError = function(message = this._errorMessage){
      const markup =  `
      <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);  
    }

    renderMessage = function(message = this._message){
      const markup =  `
      <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);  
    }
}