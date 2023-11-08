const item = 'user';

export function getUser() {
    return JSON.parse(localStorage.getItem(item));
};

export function setUserData(data) {
    return localStorage.setItem(item, JSON.stringify(data));
};

export function clearUser() {
    localStorage.removeItem(item);
};

export function formHandller(callback) {
    return function (event) {
        event.preventDefault();
        const myForm = new FormData(event.target);
        const data = Object.fromEntries(myForm.entries());

        callback(data, event.target);
    };
}