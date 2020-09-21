

export function checkPhone(phone, search) {
    try {
        return phone.match(/[0-9]/g).join('').includes(search.match(/[0-9]/g).join(''));
    }
    catch (e) {
        return false;
    }
}