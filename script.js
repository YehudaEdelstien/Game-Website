
class userData {
    constructor(name, user, email, password) {
        this.name = name;
        this.user = user;
        this.email = email;
        this.password = password;
    }
}


window.onload = () => {
    if (!getUsersDB()) { // check if isn't there a dataBase
        const logedUser = ['none'];
        localStorage.setItem(dataBase, JSON.stringify(logedUser)); // made dataBase
    }
    document.getElementById('regButton').addEventListener('click', signIn);
    document.getElementById('loginButton').addEventListener('click', logIn);
    console.table(getUsersDB()); //👍
}

function signIn() {

    let user = document.getElementById('nUser').value; // get new user value
    if (doesUserExist(user)) {
        alert('you alredy here! please log in.') // ❗upgrade later

    } else {
        addUser(createObjUser())
    }

}

function logIn() {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('password').value;
    const obj = doesUserExist(user)

    if (obj.password == pass) {
        setCurrentUser(user)
        alert('wellcome')
    } else {
        alert('Error')
    };

}


function createObjUser() {
    const userObj = new userData(
        document.getElementById('nName').value,
        document.getElementById('nUser').value,
        document.getElementById('nEmail').value,
        document.getElementById('nPassword').value,
    );
    return userObj;
    
}

