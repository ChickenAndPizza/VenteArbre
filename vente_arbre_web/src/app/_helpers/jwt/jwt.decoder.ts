
export function decodeToken(token: string = '') {
    if (token === null || token === '') { return { 'upn': '' }; }
    const parts = token.split('.');
    if (parts.length !== 3) {

        throw new Error('JWT must have 3 parts');
    }
    const decoded = urlBase64Decode(parts[1]);
    if (!decoded) {
        throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
}

function urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
}

export function getPhoneNumber(phoneNumber: String) {
    let toReturn: string;

    toReturn = phoneNumber.substring(0,3);
    toReturn += " ";
    toReturn += phoneNumber.substring(3,6);
    toReturn += "-";
    toReturn += phoneNumber.substring(6,10);
    
    return toReturn;
}