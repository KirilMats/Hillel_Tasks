function UserTable({_addUserModalCloseButton, _viewUserModalCloseButton, _viewUserModalOkButton, _modalWrapper, _addUserButton, _container, _content, _userInfo, _form, _localStorageKeyName}) {
    this._id = 1;
    this._init = function () {
        this._loadUsers();
        this._addUserButtonHandler();
        this._onSubmit();
        this._closeModalHandler('js--add-user-modal_shown');
        this._closeModalHandler('js--view-user-modal_shown');
    }
    this._onSubmit = function () {
        _form.addEventListener('submit', (e) => {
            e.preventDefault();
            if(_form.elements['id'].value) {
                const user = {
                    id: _form.elements['id'].value,
                    name: _form.elements['user-name'].value,
                    phone: _form.elements['user-phone'].value,
                    age: _form.elements['user-age'].value
                }
                this._updateUser(user);
            } else {
                const user = {
                    id: this._id,
                    name: _form.elements['user-name'].value,
                    phone: _form.elements['user-phone'].value,
                    age: _form.elements['user-age'].value
                }
                this._appendUser(user);
                this._saveUser(user);
                this._id++;
            }
            this._closeModal('js--add-user-modal_shown');
            _form.reset();
        })
    }
    this._createUser = function (user) {
        return `
        <tr class="js--user-row" data-id="${user.id}">
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.age}</td>
            <td class="users-table__buttons">
                <button class="users-table__button users-table__button_view js--button_view" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="users-table__button_view-svg" d="M12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" stroke="#2F40B4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path class="users-table__button_view-svg" d="M21 12C19.111 14.991 15.718 18 12 18C8.282 18 4.889 14.991 3 12C5.299 9.158 7.992 6 12 6C16.008 6 18.701 9.158 21 12Z" stroke="#2F40B4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>View</button>
                <button class="users-table__button users-table__button_edit js--button_edit" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="users-table__button_edit-svg" d="M13.0201 5.828L15.8501 3L20.7991 7.95L17.9701 10.778M13.0201 5.828L3.41409 15.435C3.22654 15.6225 3.12115 15.8768 3.12109 16.142V20.678H7.65709C7.92229 20.6779 8.1766 20.5725 8.36409 20.385L17.9701 10.778M13.0201 5.828L17.9701 10.778" stroke="#2F40B4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>Edit</button>
                <button class="users-table__button users-table__button_delete js--button_delete" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="users-table__button_delete-svg" d="M19 11V20.4C19 20.5591 18.9368 20.7117 18.8243 20.8243C18.7117 20.9368 18.5591 21 18.4 21H5.6C5.44087 21 5.28826 20.9368 5.17574 20.8243C5.06321 20.7117 5 20.5591 5 20.4V11M10 17V11M14 17V11M21 7H16M3 7H8M8 7V3.6C8 3.44087 8.06321 3.28826 8.17574 3.17574C8.28826 3.06321 8.44087 3 8.6 3H15.4C15.5591 3 15.7117 3.06321 15.8243 3.17574C15.9368 3.28826 16 3.44087 16 3.6V7M8 7H16" stroke="#2F40B4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>Delete</button>
            </td>
        </tr>
        `
    }
    this._appendUser = function (user) {
        const newUser = this._createUser(user);
        _content.insertAdjacentHTML('beforeend', newUser);
        this._viewUserButtonHandler(user);
        this._updateUserHandler(user);
        this._deleteUserHandler(user);
    }
    this._saveUser = function (user) {
        const users = JSON.parse(localStorage.getItem(_localStorageKeyName)) || [];
        users.push(user);
        localStorage.setItem(_localStorageKeyName, JSON.stringify(users));
    }
    this._deleteUser = function (e, user) {
        const currentUser = e.target.closest('.js--user-row');
        currentUser.remove();
        const users = JSON.parse(localStorage.getItem(_localStorageKeyName));
        const filteredUsers = users.filter(item => item.id !== user.id)
        localStorage.setItem(_localStorageKeyName, JSON.stringify(filteredUsers));
    }
    this._updateUser = function (user) {
        const users = JSON.parse(localStorage.getItem(_localStorageKeyName));
        const newUsers = users.map(item => {
            if(+item.id === +user.id) {
                return user;
            }
            return item;
        })
        _content.innerHTML = '';
        newUsers.forEach(user => this._appendUser(user));
        localStorage.setItem(_localStorageKeyName, JSON.stringify(newUsers));
    }
    this._viewUser = function (user) {
        _userInfo.innerHTML = JSON.stringify(user, undefined, 2);
    }
    this._updateUserHandler = function (user) {
        const currentTr = document.querySelector(`[data-id="${user.id}"]`);
        const currentEditBtn = currentTr.querySelector('.js--button_edit');
        currentEditBtn.addEventListener('click', (e) => {
            this._openModal('js--add-user-modal_shown');
            _form.elements['id'].value = user.id;
            _form.elements['user-name'].value = user.name;
            _form.elements['user-phone'].value = user.phone;
            _form.elements['user-age'].value = user.age;
        });
    }
    this._deleteUserHandler = function (user) {
        const currentTr = document.querySelector(`[data-id="${user.id}"]`);
        const currentDeleteBtn = currentTr.querySelector('.js--button_delete');
        currentDeleteBtn.addEventListener('click', (e) => {
            this._deleteUser(e, user);
        })
    }
    this._loadUsers = function () {
        const users = JSON.parse(localStorage.getItem(_localStorageKeyName));
        if (users) {
            users.forEach(user => {
                this._appendUser(user);
                this._id = +users[users.length-1].id + 1;
            })
        }
    }
    this._closeModalHandler = function (modal) {
        if(modal === 'js--add-user-modal_shown') {
            _addUserModalCloseButton.addEventListener('click', (e) => {
                this._closeModal(modal);
            })
        }
        if(modal === 'js--view-user-modal_shown') {
            _viewUserModalCloseButton.addEventListener('click', (e) => {
                this._closeModal(modal);
            })
            _viewUserModalOkButton.addEventListener('click', () => {
                this._closeModal(modal);
            })
        }
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this._closeModal(modal);
            }
        })
        _modalWrapper.addEventListener('click', (e) => {
            if(e.target === e.currentTarget) {
                this._closeModal(modal);
            }
        })
    }
    this._closeModal = function (modal) {
        _container.classList.remove(modal);
    }
    this._openModal = function (modal, user) {
        _container.classList.add(modal);
        if(modal === 'js--view-user-modal_shown') {
            this._viewUser(user);
        }
    }
    this._viewUserButtonHandler = function (user) {
        const currentTr = document.querySelector(`[data-id="${user.id}"]`);
        const currentViewBtn = currentTr.querySelector('.js--button_view');
        currentViewBtn.addEventListener('click', () => {this._openModal('js--view-user-modal_shown', user)});
    }
    this._addUserButtonHandler = function () {
        _addUserButton.addEventListener('click', () => {
            this._openModal('js--add-user-modal_shown');
            _form.reset();
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const userTable = new UserTable({
        _addUserModalCloseButton: document.querySelector('.js--add-user__close-button'),
        _viewUserModalCloseButton: document.querySelector('.js--view-user__close-button'),
        _viewUserModalOkButton: document.querySelector('.js--view-user__button_submit'),
        _modalWrapper: document.querySelector('.js--modal-wrapper'),
        _addUserButton: document.querySelector('.js--add-user__button_add'),
        _container: document.querySelector('.js--container'),
        _content: document.querySelector('.js--content'),
        _userInfo: document.querySelector('.js--view-user__info'),
        _form: document.querySelector('.js--add-user__form'),
        _localStorageKeyName: 'users'
    });
    userTable._init();
})