var DB = [];

var ID = 0;

export function setData(newData) {    
    DB = newData;
    return DB
}

export function getData() {
    return DB
}

export function getId() {
    return ID
}
export function increaseId() {
    ID += 1;
}
