const LocatorPage = function() {
    this.getLocator = async function(locator) {
        return locator;
    };

    this.getElement = async function(page, locator) {
        await page
            .waitForSelector(locator)
            .then(() => console.log("Загрузился элемент"));

        const elemText = await page.textContent(locator);
        return elemText;
    };
};

export { LocatorPage };
await page.click(checkButton);

await page.click(prodolgitButton);

await page.click(queryTab);

await page.click(innTab);

await page.click(queryTab);

const statusLocator = ('table>tbody>tr:nth-child(2)>td:nth-child(2)>div>div');


let timerId = setInterval(() => {

    if (await page.textContent(locator) !== 'Подтвержден') console.log(cellStatusText);

}, 10000); // через каждые 10 секунд будет проверять условие
console.log('timerId ', timerId);

// остановить проверку через 50 секунд(50сек/10сек) = 5 раз вызовется фукнция проверки
setTimeout(() => {
    clearInterval(timerId);
    console.log('stop');
}, 50000);




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

export { CreateTaxpayerPage };