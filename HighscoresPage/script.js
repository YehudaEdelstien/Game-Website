function getHighScores(game, scoreKey, id) {

    const usersArr = getUsersDB()
    // const usersArr = [
    //     {
    //         user: 'A',
    //         TicTacToe: { vsSmartBot: 3 }
    //     },
    //     {
    //         user: 'B',
    //         TicTacToe: { vsSmartBot: 4 }
    //     },
    //     {
    //         user: 'C',
    //         TicTacToe: { vsSmartBot: 3 }
    //     },
    //     {
    //         user: 'D',
    //         TicTacToe: {}
    //     },
    //     {
    //         user: 'E',
    //         TicTacToe: { vsSmartBot: 1 }
    //     },
    // ];
    const scoresArr = []

    usersArr.forEach(userObj => {
        if (userObj[game]) {
            let user = userObj.user
            let value = userObj[game][scoreKey];
            if (value) {
                const obj = {
                    user: user,
                    value: value
                }
                scoresArr.push(obj);
                scoresArr.sort((a, b) => b.value - a.value);
            }
        }
    });
    lengthFixer(scoresArr)
    setScore(scoresArr, id)
}

function lengthFixer(arr=[]) {
    const emptyObj = {
        user: '',
        value: ''
    }
    if (arr.length < 3) {
        arr.push(emptyObj)
        lengthFixer(arr)
    }
}

function setScore(arr, id) {
    for (let i = 0; i < 3; i++) {
        let text = arr[i].user + ' ' + arr[i].value
        document.getElementById(id + (i + 1)).innerText = text

    }
}
getHighScores('TicTacToe', 'vsSmartBot', 'TTT')
getHighScores('HyperBreakout', 'highScore', 'HB')
getHighScores('Fire', 'highScore', 'F')
getHighScores('Nonograms', 'highScore', 'NN')