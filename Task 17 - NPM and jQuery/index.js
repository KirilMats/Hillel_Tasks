'use strict';
class Gallery {
    constructor({_prev, _next, _content, _items, _modal, _close, _gallery}) {
        this._prev = _prev;
        this._next = _next;
        this._content = _content;
        this._modal = _modal;
        this._items = _items;
        this._close = _close;
        this._gallery = _gallery;
    }
    init() {
        this.openModal();
        this.closeModal();
        this.nextItem();
        this.prevItem();
    }
    closeModalHandler() {
        if(this._modal.hasClass('active')) {
            this._modal.removeClass('active');
        }
    }
    closeModal() {
        this._close.on('click', () => {
            this.closeModalHandler();
        })
        $(window).on('keyup', (e) => {
            if(e.key === 'Escape') {
                this.closeModalHandler();
            }
        })
    }
    openModal() {
        this._gallery.on('click', (e) => {
            if(e.target !== this._gallery[0]){
                this._content.find('img').attr('src', $(e.target).attr('src'));
                if(!this._modal.hasClass('active')) {
                    this._modal.addClass('active');
                }
            }
            this.toggleButton();
        })
    }
    changeItem(path) {
        if(path) {
            this._modal.find('img').attr('src', path);
        }
        this.toggleButton();
    }
    nextItem() {
        this._next.on('click', () => {
            const currentItemPath = this._content.find('img')[0].getAttribute('src');
            let nextItemPath = undefined;
            this._items.is(function(){
                if(this.firstElementChild.getAttribute('src') === currentItemPath && this.nextElementSibling) {
                    nextItemPath =  this.nextElementSibling.firstElementChild.getAttribute('src');
                }
            });
            this.changeItem(nextItemPath);
        })
    }
    prevItem() {
        this._prev.on('click', () => {
            const currentItemPath = this._content.find('img')[0].getAttribute('src');
            let prevItemPath = undefined;
            this._items.is(function() {
                if(this.firstElementChild.getAttribute('src') === currentItemPath && this.previousElementSibling) {
                    prevItemPath = this.previousElementSibling.firstElementChild.getAttribute('src');
                }
            });
            this.changeItem(prevItemPath);
        })
    }
    toggleButton() {
        this.toggleNext();
        this.togglePrev();
    }
    toggleNext() {
        if(this._content.find('img').attr('src') === this._items.last().find('img').attr('src')) {
            this._next.attr('disabled', '');
        } else {
            if (this._next.attr('disabled')) {
                this._next.removeAttr('disabled');
            }
        }
    }
    togglePrev() {
        if (this._content.find('img').attr('src') === this._items.first().find('img').attr('src')) {
            this._prev.attr('disabled', '');
        } else {
            if (this._prev.attr('disabled')) {
                this._prev.removeAttr('disabled');
            }
        }
    }
}
$(document).ready(function(){
    const gallery = new Gallery({
        _prev: $('.js--modal__prev'),
        _next: $('.js--modal__next'),
        _content: $('.js--modal__content'),
        _items: $('.js--gal_item'),
        _modal: $('.js--modal'),
        _close: $('.js--modal__close'),
        _gallery: $('.js--gallery')
    })
    gallery.init();
})