module.exports = {
    "Validar la vista de los Usuarios": function (browser) {

        let email = "jose@gmail.com";
        let pass = "123456789";
        const btnusers = element({
            selector: '.btn-secondary',
            index: 1
        });
        const btnregister = element({
            selector: '.btn-secondary',
            index: 0
        });

        const filter = element({
            selector: '.p-column-filter',
            index: 1
        });

        browser
            .url("http://localhost:5173/Login")
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Ingreso')
            .setValue('#email', email)
            .setValue('#password', pass)
            .click('button[type=submit]')
            .waitForElementVisible('.text-bg-success', 1000)
            .click(btnusers)
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Usuarios')
            .waitForElementVisible('tbody tr', 10000)
            .setValue(filter, "TI")
            .click(".bi-filetype-txt")

        browser
            .click(".bi-file-earmark-excel")

            let newfullName = "LUCIA RAMIREZ";
            let newemail = "LUCIA132@gmail.com";
            let newpass = "100956822";
            let newidNumber = "100956822";
            let newidType = "PP";

        browser
            .click('.bi-house-door-fill')
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Ingreso')
            .click(btnregister)
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Registro')
            .setValue('#fullName', newfullName)
            .click('option[value=' + newidType + ']')
            .setValue('#idNumber', newidNumber)
            .setValue('#email', newemail)
            .setValue('#password', newpass)
            .click('button[type=submit]')
            .waitForElementVisible('.text-bg-success', 10000)
            .click('.bi-house-door-fill')
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Ingreso')
            .setValue('#email', newemail)
            .setValue('#password', newpass)
            .click('button[type=submit]')
            .waitForElementVisible('.text-bg-success', 1000)

            btnusers = element({
                selector: '.btn-secondary',
                index: 1
            });

            browser
            .click(btnusers)
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Usuarios')
            .waitForElementVisible('tbody tr', 100000)
            .assert.textContains('tbody tr', newemail)
            .click(".bi-file-earmark-excel")



    }
};