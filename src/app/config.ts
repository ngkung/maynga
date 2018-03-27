export let cfg = {
    apiUrl: 'http://maynga01.no-ip.org:8008',
    tokenName: 'token',
    user: {
        register: '/auth/signup',
        login: '/apilogin',
        refresh:'/apiRefreshToken',
    },
    books: '/books',
    originalUrl: 'https://github.com/vmanchev/ionic3-seed-jwt',
    laravelJWT: 'https://github.com/vmanchev/ionic3-seed-jwt'
};
export let oldcfg = {
    apiUrl: 'http://maynga01.no-ip.org:8008',
    tokenName: 'token',
    user: {
        register: '/auth/signup',
        login: '/auth/login',
        refresh:'/refresh',
    },
    books: '/books'
};
