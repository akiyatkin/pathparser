const explode = (sep, str) => {
    const i = str.indexOf(sep)
    return ~i ? [str.slice(0, i), str.slice(i + 1)] : [str]
}
const getExt = (str) => {
    const i = str.lastIndexOf('.')
    return ~i ? str.slice(i + 1) : ''
}
const getRoot = (str) => {
    const i = str.indexOf('/',1)
    return ~i ? str.slice(1, i) : ''
}

export const pathparser = request => {
    //request всегда со слэшом в начале
    request = request.slice(1);
    try { request = decodeURI(request) } catch { }

    const [path, params] = explode('?', request)
    const get = { };
    if (params) {
        const ar = params.split('&');
    	for (let i = 0; i < ar.length; i++) {
            const [key, value] = explode('=', ar[i])
            get[key] = value;
    	}
    }
    const ext = getExt(path)
    const secure = !!~path.indexOf('/.')

    const crumbs = path.split('/')
    //const root = split[0]
    //const query = pathar.pop()
    //path без ведущего слэша
    //query после последнего слэша
    return {secure, crumbs, path, ext, get}
}
