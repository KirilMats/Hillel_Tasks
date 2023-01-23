export class Swapi {
    constructor(params) {
        const { elForm, elPre, elController, elId, elLoad } = params;
        this._elForm = elForm;
        this._elPre = elPre;
        this._elController = elController;
        this._elId = elId;
        this._elLoad = elLoad;
        // this._elForm.addEventListener('submit', this.formSubmit)
    }

    async formSubmit(e) {
        e.preventDefault();
        this._elLoad.classList.remove('d-none');
        const { getSwapiData } = await import('./utils.js');
        const formURL = (new FormData(this._elForm)).get('url');
        const normalizeFormUrl = formURL.trim() || 'people/1/';
        const response = await getSwapiData(this._elForm.action, normalizeFormUrl);
        this.showResponse(response, normalizeFormUrl);
    }

    showResponse = (response, normalizeFormUrl) => {
        const isSuccess = response?.status === 'success';
        if (isSuccess) {
            const getURLInfo = normalizeFormUrl.split('/');
            this._elController.classList.remove('d-none');
            this._elController.innerHTML = getURLInfo[0];
            if (getURLInfo[1]) {
                this._elId.classList.remove('d-none');
                this._elId.innerHTML = getURLInfo[1];
            } else {
                this._elId.classList.add('d-none');
            }
        } else {
            this._elController.classList.add('d-none');
            this._elId.classList.add('d-none');
        }
        this._elPre.innerHTML = isSuccess
            ? JSON.stringify(response.data, null, 2)
            : response;
        this._elLoad.classList.add('d-none');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const swapi = new Swapi({
        elForm: document.querySelector('.js--swapi_form'),
        elPre: document.querySelector('.js--swapi_pre'),
        elController: document.querySelector('.js--swapi_controller'),
        elId: document.querySelector('.js--swapi_id'),
        elLoad: document.querySelector('.js--swapi_load'),
    })
    console.log(swapi);
    swapi._elForm.addEventListener('submit', swapi.formSubmit)
})

