
let save = (user) => {
    localStorage.setItem('id',user.id);
    localStorage.setItem('token', user.token);
    localStorage.setItem('isAuth', true);
}

let useAuth = (user = null) => {
    if(user){
        save(user);
        return [user, save];
    } else {
        let user = {};
        user.token = localStorage.getItem('token');
        user.id = localStorage.getItem('id');
        user.isAuth = localStorage.getItem('isAuth');
        if(!(user.token && user.id && user.isAuth)) return [user, save];
        return [user, save];
    }
}

export {useAuth}