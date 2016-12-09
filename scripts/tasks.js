// 1) Написать функцию getFieldValues, которая будет принимать на вход массив объектов, 
// а возвращать будет массив значений одного из полей (отсортированных в порядке возрастания):

function getFieldValues(usersData, key) {
    var values = [];
    
    for (var i = 0; i < usersData.length; i++) {
        values.push(usersData[i][key]);
    }
    
    return values.sort();
}

var usersData = [
	{ 'user' : 'Alex', 'password' : 'MyNameIsAlex' },
	{ 'user' : 'Bob', 'password' : 'MyNAmeIsBob' }
];
console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob']


// 2) Написать функцию, фильтрующую массив с использованием предиката:

function filter(array, test) {
    var filtered = [];
    
    for (var i = 0; i < array.length; i++) {
        if (isEven(array[i]))
            filtered.push(array[i]);
    }
    
    return filtered;
}

var numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55];
function isEven(x) { return x % 2 == 0; }
console.log(filter(numbers, isEven)); // --> [2, 8, 34]


// 3) Даны 2 строки со словами (без знаков препинания), 
// вывести те слова (по одному разу), которые встречаются в обоих строках

function findSimilarWords(string1, string2) {
    string1 = string1.split(' ');
    string2 = string2.split(' ');
    var uniqWords = [];

    return string1.filter(word => {
        return string2.includes(word) && !uniqWords.includes(word) ?
               uniqWords.push(word) :
               false;
    });
}

var firstLongString = 'Load up on guns and bring your friends it\'s fun to lose and to pretend';
var secondLongString = 'She\'s over bored and self assured oh no I know a dirty word';
console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and'];


// 4) Дан IP-адрес (строка) и маска подсети (десятичное число). Написать функцию, которая будет валидировать
// IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:

function generateBroadcastAndNetworkAddresses(ipv4Adress, subnetMask) {
    var ip = ipv4Adress.split('.').map(octet => { return Number(octet); });
    
    var isValid = ip.length == 4 && 
                  ip.every(octet => { return octet >= 0 && octet <= 255; });
    
    if (!isValid) {
        console.log(ipv4Adress + " is not a valid IPv4 adress");
        return null;
    }
    
    if (subnetMask < 0 || subnetMask > 32) {
        console.log("Invalid subnet mask");
        return null;
    }
    
    var networkAdress = [],
        broadcastAdress = [];
    
    if (subnetMask < 32) {
        var mask = [255, 255, 255, 255];

        var octetIndex = subnetMask / 8 | 0;
        var shift = 8 - subnetMask % 8;
        mask[octetIndex] = mask[octetIndex] << shift & 255;
        for (var i = octetIndex + 1; i < 4; i++)
            mask[i] = 0;

        for (var i = 0; i < 4; i++) {
            networkAdress[i] = ip[i] & mask[i];
            broadcastAdress[i] = networkAdress[i] + (mask[i] ^ 255);
        }
    }
    else networkAdress = broadcastAdress = ip;
    
    return "Broadcast - " + broadcastAdress.join('.') + ", " +
           "Network - " + networkAdress.join('.');
}

var IpAddress = '10.223.98.2';
var subnetMask = 28;
console.log(generateBroadcastAndNetworkAddresses(IpAddress, subnetMask)); // Broadcast - 10.223.98.15, Network - 10.223.98.0


// 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):
// P. S. 1 == '1' (строковое и числовое представление number'ов считать идентичными)

function makeItClean(array) {
    array = [].concat.apply([], array);
    var uniqElements = [];
    
    return array.filter(e => {
        for (var i = 0; i < uniqElements.length; i++) {
            if (uniqElements[i] == e)
                return false;
        }
        uniqElements.push(e);
        return true;
    });
}

var totalMessArray = [['a', 1, true], [true, 99, 'aa', undefined], ['1']];
console.log(makeItClean(totalMessArray)); // --> ["a", 1, 99, "aa", undefined];