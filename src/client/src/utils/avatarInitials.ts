export const stringAvatar = (name: string) => {
    const myArr = name.split(' ')
    let letter = ''

    if (myArr[1]) {
        letter = myArr[0].slice(0, 1) + myArr[1].slice(0, 1)
    } else {
        letter = myArr[0].slice(0, 1)
    }

    if (letter.length === 0) {
        return 'NN'
    }

    return letter.toUpperCase()
}