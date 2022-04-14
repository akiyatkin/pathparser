const explode = (sep, str) => {
    const i = str.indexOf(sep)
    return ~i ? [str.substring(0, i), str.substring(i + 1)] : [str]
}
const getExt = (str) => {
    const i = str.lastIndexOf('.')
    return ~i ? str.substring(i + 1) : ''
    // const ext = ~i ? str.substring(i + 1) : ''
    // return /^\w{3,4}$/.test(ext) ? ext : ''
}

export const pathparser = request => {
    try {
        request = decodeURI(request)
    } catch (e) {
        console.log(e)
    }
    const [path, params] = explode('?', request)
    const get = { };
    if (params) {
        const ar = params.split('&');
    	for (let i = 0; i < ar.length; i++) {
            const [key, value] = explode('=', ar[i])
            get[key] = value;
    		//get[decodeURI(key)] = decodeURI(value);
    	}
    }
    const ext = getExt(path)
    const secure = !!~path.indexOf('/.')
    return {secure, path, ext, get}
}
