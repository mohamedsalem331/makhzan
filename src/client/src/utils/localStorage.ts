export const localStorageHandler = () => {
    const getTokenLocalStorage = () => {
        const myToken = localStorage.getItem("userData")
            ? localStorage.getItem("userData")
            : "";

        return myToken;
    };

    const setTokenLocalStorage = (data: object) => JSON.stringify(localStorage.setItem("userData", JSON.stringify(data)));

    const removeTokenLocalStorage = () => JSON.stringify(localStorage.setItem("userData", ''));

    return {
        getTokenLocalStorage,
        setTokenLocalStorage,
        removeTokenLocalStorage,
    };
};