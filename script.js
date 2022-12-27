const dataBase = "webGameData";

class userData {
    constructor(name, user, email, password) {
        this.name = name;
        this.user = user;
        this.email = email;
        this.password = password;
    }
}


window.onload = () => {
    if (!getUsers()) { // check if isn't there a dataBase
        const logedUser = ['none'];
        localStorage.setItem(dataBase, JSON.stringify(logedUser)); // made dataBase
    }

    document.getElementById("regButton").addEventListener("click", signIn);
    document.getElementById("loginButton").addEventListener("click", logIn);
    console.log(getUsers());
}

function signIn() {

    let user = document.getElementById("nUser").value; // get new user value
    if (doesUserExist(user)) {
        alert("you alredy here! please log in.") // ❗upgrade later

    } else {
        addUser(createObjUser())
    }

}

function logIn() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("password").value;
    const obj = doesUserExist(user)
    if (obj.password == pass) {
        const arr = getUsers();
        arr[0] = user;
        localStorage.setItem(dataBase, JSON.stringify(arr));
        console.log("yey")

    } else {
        alert('Error')
    };

}


function doesUserExist(user) {
    const arr = getUsers();

    for (const obj of arr) {
        if (user == obj.user) {
            return obj;
        }
    }
    return false;
}
function updateUserData(user,obj) { ///❗❗❗
    const arr = getUsers();

    for (let index in arr) {
        if (user == arr[index].user) {
            arr[index] = obj;
        }
    }
}

function createObjUser() {
    const userObj = new userData(
        document.getElementById("nName").value,
        document.getElementById("nUser").value,
        document.getElementById("nEmail").value,
        document.getElementById("nPassword").value,
    );
    return userObj;

}

function getUsers() {
    const arr = JSON.parse(localStorage.getItem(dataBase));
    return arr;
}

function addUser(obj) {
    const arr = getUsers();
    arr.push(obj);
    localStorage.setItem(dataBase, JSON.stringify(arr));
    console.log(getUsers());
}