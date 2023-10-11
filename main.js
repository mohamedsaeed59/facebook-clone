
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
        let modal = document.querySelector(".modal");
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
    let params = {
        "name": name,
        "username": userName,
        "password": password
    }
    axios.post("https://tarmeezacademy.com/api/v1/register", params)
    .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
          // The modal
          let regModal = document.getElementById("registerModal");
          let modalInstance = bootstrap.Modal.getInstance(regModal);
          modalInstance.hide();
          setupUi();
          showAlertMessage('Nice, you are registered successfully');
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

    let token = localStorage.getItem("token");
    // check the token and show the buttons
    if(token == null){
        loginDiv.style.setProperty("display", "flex", "important");
        logoutDiv.style.setProperty("display", "none", "important");

    }else{
        loginDiv.style.setProperty("display", "none", "important");
        logoutDiv.style.setProperty("display", "flex", "important");
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