async function getUsers() {
    let responseUsers = await fetch('https://api.github.com/search/users?q=location:kiev+followers:%3E100');
    // https://api.github.com/search/users?q=location:kiev+followers:%3E100
    // https://simple-blog-api.crew.red/posts
    let users = await responseUsers.json(); // will not work without "await" word
    // users = JSON.stringify(users, '', ' ');

    users = users.items;
    function compare(a, b) {
        if (a.login < b.login)
            return -1;
        if (a.login > b.login)
            return 1;
        return 0;
    }
    users = users.sort(compare);
    console.log(users);
    var keys = Object.keys(users);
    console.log(keys);


    await new Promise((resolve) => setTimeout(resolve, 200));// this works like Sleep(3000) in threads
    return { users };
}

export function fetchUsers() {
    return dispatch => {
        dispatch(fetchUsersBegin());
        return getUsers()
            .then(json => {
                dispatch(fetchUsersSuccess(json.users));
                return json.users;
            })
            .catch(error =>
                dispatch(fetchUsersFailure(error))
            );
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS =
    "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE =
    "FETCH_USERS_FAILURE";

export const fetchUsersBegin = () => ({
    type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = users => ({
    type: FETCH_USERS_SUCCESS,
    payload: { users }
});

export const fetchUsersFailure = error => ({
    type: FETCH_USERS_FAILURE,
    payload: { error }
});
