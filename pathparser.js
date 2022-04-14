const explode = (sep, str) => {
    const i = str.indexOf(sep)
    return ~i ? [str.substring(0, i), str.substring(i + 1)] : [str]
}
const getExt = (str) => {
    const i = str.lastIndexOf('.')
    return ~i ? str.substring(i + 1) : ''
}

export const pathparser = request => {
    try {
        request = decodeURI(request)
    } catch { }
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
    return {secure, path, ext, get}
}
