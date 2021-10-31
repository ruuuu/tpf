const CreateTaxpayerPage = function() {

    const createTaxpayerButton = ('text="Создать карточку"'); // кнопка "Создать карточку"    
    const innField = ('[data-field-name = "inn"]'); // поле ввода ИНН
    const checkButton = ('text="Найти"'); //  кнопка  Найти(check) 
    const prodolgitButton = ('text="Продолжить"'); // кнопка Продолжить
    const queryTab = ('text="Заявки на получение сведений"'); // вкладка  Запросы
    const innTab = ('text="Налогоплательщики"'); // вкладка Налогоплательщики




    this.createTaxpayer = async function(page, inn) {

        await page.click(createTaxpayerButton);

        await page.fill(innField, inn);

        await page.click(checkButton);

        await page.click(prodolgitButton);

        await page.click(queryTab);

        const cellStatusLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(2)>div>div');

        while(await page.textContent(cellStatusLocator) !== 'Подтвержден'){
            await page.waitForTimeout(30000); // 30 сек ждем 
            if(await page.textContent(cellStatusLocator) === 'Подтвержден') break;
        }

        
  
    };




    this.createTaxpayerAlreadyExist = async function(page, inn) { // Создаем НП, котрый уже есть в системе

        await page.click(createTaxpayerButton);

        await page.fill(innField, inn);

        await page.click(checkButton);

        await page.click(prodolgitButton);

        await page.click(prodolgitButton);

    };

    this.getLocatorCellActivityInRequestsTab = async function() {
        const activityLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(3)>div');
        return activityLocator;
    }

    this.getLocatorCellStatusInRequestsTab = async function() { // локатор для статуса
        const statusLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(2)>div>div');
        return statusLocator;
    }

    this.getLocatorForRedMessage = async function() {
        const redMessageLocator = ('text="По данному ИНН уже создана карточка НП"');
        return redMessageLocator;
    }


};

export { CreateTaxpayerPage }