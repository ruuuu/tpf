import { app } from '../framework/pages/index';
import chai from 'chai';
import { goto, run, stop } from '../lib/browser/browser';
import { getRandomInnYrLiso, getRandomInnIP } from '../framework/pages/data';


const { expect } = chai;
let page;
let url = process.env.url;
let i = process.env.i; //  (для сбера 0, для втб 1)
// запускам тесты командой: url=<значение> i=<значение> npm test, пример url=https://vtb.cprr-dev.weintegrator.com i=1 npm test

beforeEach(async() => {
    await run();
    page = await goto(url + '/login');
});

afterEach(async() => {
    await stop();
});





describe('Create taxpayer tests', () => {

    it.only('Создание НП-10 значный', async() => {

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        const inn = getRandomInnYrLiso();
        console.log('рандомный innYL: ', inn);
        await app().createTaxpayerPage().createTaxpayer(page, inn);


        // ИНН:        
        const cellInn = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInRequestsTab()); // в гриде, на вкладке Запросы, ячейка где хранится ИНН
        const cellInnText = await app().locatorPage().getElement(page, cellInn); // получаем текст элемента
        expect(cellInnText)
            .to
            .have
            .string(inn);


        // Активность:  
        const cellActivity = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorCellActivityInRequestsTab()); // в гриде, на вкладке Зарпосы, ячейка где хранится АКтивность
        const cellActivityText = await app().locatorPage().getElement(page, cellActivity);
        expect(cellActivityText)
            .to
            .have
            .string('Получение карты сведений о НП');



        // Статус:  
        const cellStatus = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorCellStatusInRequestsTab()); // в гриде, на вкладке Зарпосы, ячейка где хранится Статус
        const cellStatusText = await app().locatorPage().getElement(page, cellStatus);


        let timerId = setInterval(() => {

            if (cellStatusText !== 'Подтвержден') console.log(cellStatusText);

        }, 10000); // через каждые 10 секунд будет проверять условие
        console.log('timerId ', timerId);

        // остановить проверку через 50 секунд(50сек/10сек) = 5 раз вызовется фукнция проверки
        setTimeout(() => {
            clearInterval(timerId);
            console.log('stop');
        }, 50000);

        console.log('cellStatusText in test: ', cellStatusText);
        // expect(cellStatusText)
        //     .to
        //     .have
        //     .string('Подтвержден'); //   Обработка   

    });



    it('Создание НП-12 значный', async() => {

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);


        const inn = getRandomInnIP();
        console.log('рандомный innIP: ', inn);
        await app().createTaxpayerPage().createTaxpayer(page, inn);



        // ИНН:  
        const cellInn = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInRequestsTab());
        const cellInnText = await app().locatorPage().getElement(page, cellInn);
        expect(cellInnText)
            .to
            .have
            .string(inn);


        // Активность:   
        const cellActivity = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorCellActivityInRequestsTab());
        const cellActivityText = await app().locatorPage().getElement(page, cellActivity);
        expect(cellActivityText)
            .to
            .have
            .string('Получение карты сведений о НП');


        // Статус:  
        const cellStatus = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorCellStatusInRequestsTab());
        const cellStatusText = await app().locatorPage().getElement(page, cellStatus);
        expect(cellStatusText)
            .to
            .have
            .string('Подтвержден');
    });


    it('Создание НП, который уже есть в системе', async() => {

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        const inn = await app().loginPage().getAllInn(url, i);
        await app().createTaxpayerPage().createTaxpayerAlreadyExist(page, inn);


        const redBlock = await app().locatorPage().getLocator(await app().createTaxpayerPage().getLocatorForRedMessage());

        const redBlockText = await app().locatorPage().getElement(page, redBlock);

        expect(redBlockText)
            .to
            .have
            .string('По данному ИНН уже создана карточка НП');
    });

});

describe('Search && filter tests', () => {

    it('Поиск по ИНН на вкладке НП', async() => {

        const inn = await app().loginPage().getAllInn(url, i);
        //console.log('inn: ', inn);

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        await app().filterSearchPage().searchTaxpayerByInnAtTaxpayers(page, inn);

        const innCell = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInTaxpayerTab());

        const innCellText = await app().locatorPage().getElement(page, innCell);
        expect(innCellText)
            .to
            .have
            .string(inn);
    });


    it('Поиск по ИНН на вкладке Запросы', async() => {

        const inn = await app().loginPage().getAllInn(url, i);
        //console.log('inn: ', inn);

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password); // вызов метода login

        await app().filterSearchPage().searchTaxpayerByInnAtRequests(page, inn);


        const innCell = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInRequestsTab());
        const innCellText = await app().locatorPage().getElement(page, innCell);
        expect(innCellText)
            .to
            .have
            .string(inn);
    });



    it('Фильтр по ИНН на вкладке НП', async() => {

        const inn = await app().loginPage().getAllInn(url, i);
        //console.log('inn: ', inn);

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        await app().filterSearchPage().filterTaxpayerByInnAtTaxpayers(page, inn);

        const innCell = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInTaxpayerTab());

        const innCellText = await app().locatorPage().getElement(page, innCell);
        expect(innCellText)
            .to
            .have
            .string(inn);
    });



    it('Фильтр по ИНН на вкладке Запросы', async() => {

        const inn = await app().loginPage().getAllInn(url, i);
        //console.log('inn: ', inn);

        const email = await app().data()[i].email;
        const password = await app().data()[i].password;
        await app().loginPage().login(page, email, password);

        await app().filterSearchPage().filterTaxpayerByInnAtRequests(page, inn);

        const innCell = await app().locatorPage().getLocator(await app().filterSearchPage().getLocatorInnCellInRequestsTab());

        //console.log('innCell', innCell);
        const innCellText = await app().locatorPage().getElement(page, innCell);
        expect(innCellText)
            .to
            .have
            .string(inn);
    });


    it('Фильтр по Статус на вкладке Запросы', async() => {

        const statuses = ['PENDING', 'ACCEPTED', 'DECLINED', 'ERROR'];
        let statusRequest = statuses[Math.floor(Math.random() * statuses.length)];
        console.log('statusRequest ', statusRequest);

        const arrayStatus = await app().filterSearchPage().filterByStatusAtRequests(url, statusRequest, i);

        for (let i = 0; i < arrayStatus.length; i++) {
            expect(arrayStatus[i]).to.equal(statusRequest);
        }

        if (arrayStatus.length === 0) {
            expect(arrayStatus.length).to.equal(0);
        }

    });

});