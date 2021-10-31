const dataGenerate = function() {

    const data = [{
            email: 'sberadmin',
            password: 'sberadmin',
        },

        {
            email: 'vtb',
            password: 'vtb',
        },

        {
            email: 'regulator',
            password: 'regulator',
        }
    ]

    return data;
}



const getArrayInnYrLiso = function() { // массив ИНН для создания Юр лиц(10-значные) 
    const arrayInnYrLiso = ['4246021960'];
    return arrayInnYrLiso;
}

const getArrayInnIP = function() { // массив ИНН для создания ИП(12-ти значные) 
    const arrayInnIP = ['420201816829', '661709768960'];
    return arrayInnIP;
}


const getRandomInnYrLiso = function() { // получаем рандомный инн ЮЛ
    const arrayYrLisoInn = getArrayInnYrLiso();
    let randomInnYrLiso = arrayYrLisoInn[Math.floor(Math.random() * arrayYrLisoInn.length)];
    return randomInnYrLiso;
}

const getRandomInnIP = function() { // получаем рандомный инн ИП
    const arrayIPInn = getArrayInnIP();
    let randomInnIP = arrayIPInn[Math.floor(Math.random() * arrayIPInn.length)];
    return randomInnIP;
}

// const deleteUsedInnYrLiso = function(){ // удаляет из массива инн, который уже использован в тесте создания НП
//    let arr = getArrayInnYrLiso(); // массив ИНН
//    let randInn = getRandomInnYrLiso(); // инн коырй создали
//    let newarr = arr.filter(function(item) {
//       return item !== randInn // randInn - инн котрый надо удалить
//    });

//    return newarr; // вернет массив у которо удален использваный иНН

// }




export { dataGenerate, getRandomInnYrLiso, getRandomInnIP }