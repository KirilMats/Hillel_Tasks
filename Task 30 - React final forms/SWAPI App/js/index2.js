import { Swapi } from './index.js';

class PatchedSwapi extends Swapi {
    constructor(arg) {
        const { defaultURL, ...restArg } = arg;
        super(restArg);
        this.defaultURL = defaultURL;
    }
    formSubmit = async (e) => {
        this._elForm.action = prompt('defaultURL', this.defaultURL);
        super.formSubmit(e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const swapi = new PatchedSwapi({
        elForm: document.querySelector('.js--swapi_form'),
        elPre: document.querySelector('.js--swapi_pre'),
        elController: document.querySelector('.js--swapi_controller'),
        elId: document.querySelector('.js--swapi_id'),
        elLoad: document.querySelector('.js--swapi_load'),
        defaultURL: 'https://swapi.py4e.com/api',
    })
    swapi._elForm.addEventListener('submit', swapi.formSubmit)
})

