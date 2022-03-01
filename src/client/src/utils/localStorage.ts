export const localStorageHandler = () => {
    const getTokenLocalStorage = (): string | null => {
        const myToken = localStorage.getItem("userData")
            ? localStorage.getItem("userData")
            : "";

        return myToken;
    };

    const setTokenLocalStorage = (data: object) => JSON.stringify(localStorage.setItem("userData", JSON.stringify(data)));

    const removeTokenLocalStorage = (): void => localStorage.removeItem("userData");

    return {
        getTokenLocalStorage,
        setTokenLocalStorage,
        removeTokenLocalStorage,
    };
};