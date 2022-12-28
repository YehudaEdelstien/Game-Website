const dataBase = 'webGameData';


function getUsersDB() {    // מחזיר מערך משתמשים מהדאטה-בייס
    const arr = JSON.parse(localStorage.getItem(dataBase));
    return arr;
}


function setUsersDB(arr = []) { // מקבל מערך נתונים ומכניס אותו לדאטה-בייס במקום הקודם
    localStorage.setItem(dataBase, JSON.stringify(arr));
    console.log(getUsersDB());

}

function getCurrentUser() {
    const arr = getUsersDB(); 
    return arr[0];
    
}

function setCurrentUser(user = null) {// רושם משתמש נוכחי שנכנס למערכת
    const arr = getUsersDB();           // אם לא מקבל פרמטר, מוציא את המשתמש מהמערכת
    arr[0] = user;
    setUsersDB(arr);
    if (user === null) {
        location.href = "/index.html";
    }
}

function doesUserExist(user) { // בודק עם המשתמש קיים ומחזיר את האובייקט שלו
    const arr = getUsersDB();

    for (const obj of arr) {
        if (user == obj.user) {
            return obj;
        }
    }
    return false;
}


function updateUserData(obj) { // מקבל גרסה חדשה של אוביקט ומעדכן את הגרסה הקודמת שלו בדאטה-בייס
    const arr = getUsersDB();

    for (let index in arr) {
        if (obj.user == arr[index].user) {
            arr[index] = obj;
            setUsersDB(arr);
        }
    }
}


function addUser(obj) {     // מקבל אובייקט משתמש ומוסיף לדאטה-בייס
    const arr = getUsersDB();
    arr.push(obj);
    setUsersDB(arr);
}