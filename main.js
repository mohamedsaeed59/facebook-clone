
// get the post and show it in the page
let cardPosts = document.getElementById("posts");
function getPosts(){
    axios.get("https://tarmeezacademy.com/api/v1/posts")
    .then((res) => {
        let posts = res.data.data;
        posts.forEach(post => {
            let postTitle = "";
            if(post.title != null){
                postTitle = post.title;
            }
            let content = `
                <div class="card shadow mb-5">
                    <div class="card-header d-flex">
                    <img src="${post.author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px;"/>
                    <h3 class="mx-3">${post.author.name}</h3>
                    </div>
                    <div class="card-body" style="cursor: pointer" onclick="redirect(${post.id})">
                        <img src="${post.image}" style="width: 100%;" />
                        <h6 style="color: grey;" class="mt-1">${post.created_at}</h6>
                        <h5>${postTitle}</h5>
                        <p>${post.body}</p>
                        <hr> 
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" style="cursor: pointer;">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                            <span>${post.comments_count} Comments</span>
                        </div>
                    </div>
                </div>
            `
            cardPosts.innerHTML += content;
        });
    })
    .catch((err) => {
        console.log('errrror', err);
    })
}
getPosts();

// Redirect to the post through the id
function redirect(postId){
    window.location = `postDetails.html?postId=${postId}`
}

// Get the post and show the comments
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("postId");

let postClicked = document.getElementById("postClicked");
let spanUserName = document.getElementById("user-name-span");

function getPost(){
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
    .then((res) => {
        let post = res.data.data;
        let comments = post.comments;
        spanUserName.innerHTML = post.author.username;
        
        let postTitle = "";
        if(post.title != null){
            postTitle = post.title;
        }
        // the content of the comment
        let commentsContent = ``
        for(comment of comments){
            commentsContent += `
            <div class="p-3" style="background-color:rgb(235, 235, 235)">
                <div>
                    <img src="${comment.author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px;"/>
                    <b class="mx-2">${comment.author.username}</b>
                </div>
                <div>${comment.body}</div>
                <hr>
            </div>
            `
        }
        let contentPost = `
            <div class="card shadow mb-5">
                <div class="card-header d-flex">
                    <img src="${post.author.profile_image}" class="rounded-circle border border-3" style="width: 40px; height: 40px;"/>
                    <h3 class="mx-3">${post.author.username}</h3>
                </div>
               <div class="card-body">
                    <img src="${post.image}" style="width: 100%;" />
                    <h6 style="color: grey;" class="mt-1">${post.created_at}</h6>
                    <h5>${postTitle}</h5>
                    <p>${post.body}</p>
                    <hr>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" style="cursor: pointer;">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                    <span>${post.comments_count} Comments</span>
                    </div>
                 </div>
                 <div id="comments">
                   ${commentsContent}
                 </div>
                 <div class="input-group mb-3 mt-3" id="add-comment-div">
                    <input id="comment-input" type="text" placeholder="Add your comment here.." class="form-control">
                    <button class="btn btn-outline-primary" type="button" onclick="addComment()">send</button>
                 </div>
              </div>
        `
        postClicked.innerHTML = contentPost;
    })
    .catch((err) => {
        console.log('errrror', err);
    })
}
getPost();

// Add comment function
function addComment(){
    const inputComment = document.getElementById("comment-input").value;
    let params = {
        "body": inputComment
    }
    let token = localStorage.getItem("token");
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`, params, {
        headers: {"authorization": `Bearer ${token}`}
    })
    .then((res) => {
        showAlertMessage("The comment has been created successfully", 'success');
        getPost();
    })
    .catch((err) => {
        let error = err.response.data.message;
        showAlertMessage(error, 'danger');
    })
}

// login function
function login(){
    const inputName = document.getElementById("name").value;
    const inputPassword = document.getElementById("password").value;
    let params = {
        "username": inputName,
        "password": inputPassword,
    }
    axios.post("https://tarmeezacademy.com/api/v1/login", params)
    .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // The modal
        let modal = document.getElementById("loginModal");
        let modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
        setupUi();
        showAlertMessage('Nice, you are logged in successfuly', 'success');
    })
}

// register function
function register(){
    const name = document.getElementById("reg-input-name").value;
    const userName = document.getElementById("reg-input-username").value;
    const password = document.getElementById("reg-input-password").value;
    const image = document.getElementById("personal-img-input").files[0];
    let formData = new FormData();
    formData.append("name", name)
    formData.append("username", userName)
    formData.append("password", password)
    formData.append("image", image)
    axios.post("https://tarmeezacademy.com/api/v1/register", formData)
    .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log(res);
          // The modal
          let regModal = document.getElementById("registerModal");
          let modalInstance = bootstrap.Modal.getInstance(regModal);
          modalInstance.hide();
          setupUi();
          showAlertMessage('Nice, you are registered successfully', 'success');
    })
    .catch((err) => {
        let error = err.response.data.message;
        showAlertMessage(error, 'danger');
    })
}

// logout function
function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setupUi();
    showAlertMessage('Nice, you are logged out successfuly', 'success');
}

// Show and hide the buttons of Login and Logout
function setupUi(){
    // select the element
    let loginDiv = document.getElementById("login-btn");
    let logoutDiv = document.getElementById("logout-btn");
    let addPostDiv = document.getElementById("add-post-btn");

    let token = localStorage.getItem("token");
    // check the token and show the buttons
    if(token == null){
        loginDiv.style.setProperty("display", "flex", "important");
        logoutDiv.style.setProperty("display", "none", "important");
        addPostDiv.style.setProperty("display", "none", "important");

    }else{
        loginDiv.style.setProperty("display", "none", "important");
        logoutDiv.style.setProperty("display", "flex", "important");
        addPostDiv.style.setProperty("display", "flex", "important");
        let user = getCurrentUser();
        document.getElementById("nav-username").innerHTML = user.username;
        document.getElementById("nav-userImg").src = user.profile_image;
    }
}
setupUi();

// Show Alert message when u login
function showAlertMessage(customMessage, typeMessage){
    const AlertMessage = document.getElementById('AlertMessage')
    const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    AlertMessage.append(wrapper)
    }
    alert(customMessage, typeMessage);
}

// function to create a new post
function createNewPost(){
    const titleInput = document.getElementById("title-input").value;
    const bodyInput = document.getElementById("body-input").value;
    const imgInput = document.getElementById("img-input").files[0];
    const token = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("title", titleInput);
    formData.append("body", bodyInput);
    formData.append("image", imgInput);
    const headers = {
        "authorization": `Bearer ${token}`
    }
    axios.post("https://tarmeezacademy.com/api/v1/posts", formData, {headers:headers})
    .then((res) => {
        console.log(res);
        // The modal
        let modal = document.getElementById("addPostModal");
        let modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
        setupUi();
        showAlertMessage('Nice, new post has been created', 'success');
        getPosts();
    })
    .catch((err) => {
        const message = err.response.data.message
        showAlertMessage(message, 'danger');
    })
}

// function get current user
function getCurrentUser(){
    let user = null;
    const storageUser = localStorage.getItem("user");
    if(storageUser != null){
        user = JSON.parse(storageUser);
    }
    return user;
}