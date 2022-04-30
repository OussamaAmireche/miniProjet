module.exports = {
    validateNames: (name) => {
        const regex = /([0-9]|\W|_)+/ig;
        const regexAr = /^[\u0621-\u064A ]+$/ig;
        if(!name.match(regex) || name.match(regexAr)){
            return true;
        }else{
            return false;
        }
    }
}