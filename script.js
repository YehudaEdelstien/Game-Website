class userData {
    constructor(name, user, email, password) {
        this.name = name;
        this.user = user;
        this.email = email;
        this.password = password;
    }
}

window.onload = () => {
    document.getElementById("regButton").addEventListener("click", signIn);
    document.getElementById("loginButton").addEventListener("click", logIn);
    // const arrData = [{ name: "boy", user: "bbb" }, { name: "booy", user: "aaa" }]
    // localStorage.setItem("webGameData", JSON.stringify(arrData))
    console.log(getUsers());
}

function signIn() {
    // ✔️get new user value
    let user = document.getElementById("nUser").value;
    if (doesUserExist(user)) {
        alert("you alredy here! please log in.") // upgrade

    } else {
        addUser(createObjUser())
    }

}

function logIn() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("password").value;
    const obj = doesUserExist(user)
    if (obj.password == pass) {
        console.log("yey")
    }

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
    const arr = JSON.parse(localStorage.getItem("webGameData"));
    return arr;
}

function addUser(obj) {
    const arr = getUsers();
    arr.push(obj);
    localStorage.setItem("webGameData", JSON.stringify(arr));
    console.log(getUsers());
}