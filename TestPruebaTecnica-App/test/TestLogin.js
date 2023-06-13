module.exports = {
    "Validar la vista del Ingreso": function (browser) {
        
        let email = "jose@gmail.com";
        let pass = "123456789";
        browser
            .url("http://localhost:5173/Login")
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Ingreso')
            .setValue('#email', email)
            .setValue('#password', pass)
            .click('button[type=submit]')
            .waitForElementVisible('.text-bg-success', 1000);

        browser
            .setValue('#password', '123')
            .click('button[type=submit]')
            .getAttribute('#password', 'minlength', (result) => {
                browser.assert.equal(result.value, 8)
            })
            .execute((data) => {
                return document.getElementById('password').validity.valid;
            }, function (result) {
                browser.assert.equal(result.value, false)
            });

        const Element = element({
            selector: '.btn-secondary',
            index: 0
        });
        browser
            .click(Element)
            .waitForElementPresent('body', 1000, 'Page loaded')
            .assert.titleContains('Prueba')
            .assert.textContains('.container .title', 'Usuarios')
    }
};