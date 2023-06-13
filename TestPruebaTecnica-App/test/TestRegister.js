module.exports = {
    "Validar la vista de Registro" : function (browser) {
        let fullName = "DAVID RUEDA";
        let email = "David@hotmail.com";
        let pass = "1000123456";
        let idNumber = "1000123456";
        let idType = "TI";
        browser
            .url("http://localhost:5173/Register")
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Registro')
            .setValue('#fullName', fullName)
            .click('option[value='+idType+']')
            .setValue('#idNumber', idNumber)
            .setValue('#email', 'David')
            .setValue('#password', pass)
            .click('button[type=submit]')
            .execute((data) => {
                return document.getElementById('email').validity.valid;
            }, function (result) {
                browser.assert.equal(result.value, false)
            })


            browser
            .setValue('#email', email)
            .click('button[type=submit]')
            .waitForElementVisible('.text-bg-success', 10000)
            .click('.bi-house-door-fill')
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Ingreso')
            .setValue('#email', email)
            .setValue('#password', pass)
            .click('button[type=submit]')
            .waitForElementVisible('.text-bg-success', 1000);


            const Element = element({
                selector: '.btn-secondary',
                index: 1
            });
            browser
                .click(Element)
                .waitForElementPresent('body', 1000, 'Page loaded')
                .assert.titleContains('Prueba')
                .assert.textContains('.container .title', 'Usuarios')
                .waitForElementVisible('tbody tr', 10000)
                .assert.textContains('tbody tr', email)
    }
};