'use strict';
const API_JSON_URL = 'https://jsonplaceholder.typicode.com/posts/';
document.addEventListener('DOMContentLoaded', function () {
    class LoadPost {
        constructor({_postBody, _postComments, _postInput, _postForm, _commentsCount}) {
            this._postBody = _postBody;
            this._postComments = _postComments;
            this._postInput = _postInput;
            this._postForm = _postForm;
            this._commentsCount = _commentsCount;
        }
        init() {
            this._getPostHandler();
        }
        _getPostId() {
            return this._postInput.value;
        }
        _getPostData() {
            const url = API_JSON_URL + this._getPostId();
            fetch(url, {method: "GET"}).then( res => res.json()).then( data => {
                if(data.id) {
                    this._addPost(data);
                    this._getPostComments(url);
                }
            })
        }
        _getPostHandler() {
            this._postForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this._getPostData();
            })
        }
        _addPost(postData) {
            this._postBody.innerHTML = postData.body;
        }
        _getPostComments(url) {
            const urlComments = url + '/comments';
            fetch(urlComments, {method: "GET"}).then( res => res.json()).then( data => {
                this._clearPostComments();
                data.forEach(comment => {
                    this._addComment(comment);
                });
                this._setCommentsCount(data.length);
            })
        }
        _clearPostComments() {
            this._postComments.innerHTML = '';
        }
        _setCommentsCount(count) {
            this._commentsCount.innerHTML = count;
        }
        _addComment(commentData) {
            const comment = this._createComment(commentData);
            this._postComments.insertAdjacentHTML('beforeend', comment);
        }
        _createComment(commentData) {
            const name = commentData.email.split('@')[0];
            return `
                <div class="comment">
                            <div class="user-info">
                                <a class="user-link" href="#">
                                    <img class="user-photo" src="https://via.placeholder.com/100/1d9bf0/1d9bf0?Text=Down.com" alt="">
                                    <div class="user-names">
                                        <p class="user-name">${name}</p>
                                        <p class="user-at-name">@${name}</p>
                                    </div>
                                </a>
                                <div class="user-options">&bull;&bull;&bull;</div>
                            </div>
                            <div class="comment__body">${commentData.body}</div>
                            <div class="divider"></div>
                        </div>
            `
        }
    }
    const loadPost = new LoadPost({
        _postBody: document.querySelector('.js--post__body'),
        _postComments: document.querySelector('.js--comments'),
        _postInput: document.querySelector('.post__input'),
        _postForm: document.querySelector('.js--post__form'),
        _commentsCount: document.querySelector('.js--comments-count')
    });
    loadPost.init();
});