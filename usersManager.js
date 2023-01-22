const dataBase = 'webGameData';


// מחזיר מערך משתמשים מהדאטה-בייס
function getUsersDB() {
    const arr = JSON.parse(localStorage.getItem(dataBase));
    if (arr) {
        return arr;
    } else {
        return ['guest'];
    }
}


// מקבל מערך נתונים ומכניס אותו לדאטה-בייס במקום הקודם
function setUsersDB(arr = []) {
    localStorage.setItem(dataBase, JSON.stringify(arr));
    console.log(getUsersDB());

}

//  מחזיר שם משתמש בסטרינג
function getCurrentUser() {
    const arr = getUsersDB();
        return arr[0] ;
}

// רושם משתמש נוכחי שנכנס למערכת
// אם לא מקבל פרמטר, מוציא את המשתמש מהמערכת
function setCurrentUser(user) {
    const arr = getUsersDB();
    arr[0] = user != 'getOut'? user : null;
    setUsersDB(arr);
    
    if (user === 'getOut') {
        location.href = "/index.html";
    }
}

// בודק עם המשתמש קיים ומחזיר את האובייקט שלו
function doesUserExist(user) {
    const arr = getUsersDB();

    for (const obj of arr) {
        if (obj === null) continue;

        if (user == obj.user) {
            return obj;
        }
    }
    return false;
}


// מקבל גרסה חדשה של אוביקט ומעדכן את הגרסה הקודמת שלו בדאטה-בייס
function updateUserData(obj) {
    const arr = getUsersDB();
    
    for (let index in arr) {
        if (obj.user) {
            if (obj.user == arr[index].user) {
                arr[index] = obj;
                setUsersDB(arr);
            }
        }
    }
}


// מקבל אובייקט משתמש ומוסיף לדאטה-בייס
function addUser(obj) {
    const arr = getUsersDB();
    arr.push(obj);
    setUsersDB(arr);
}