module.exports = {
    'Validar los datos del Login ': function (browser) {
        browser
            .url('https://www.saucedemo.com/')
            .waitForElementVisible('body', 1000)
            .assert.titleContains('Swag Labs')
            .assert.visible('#user-name')
            .assert.visible('#login-button')
            .setValue('#user-name', process.env.STANDARD)
            .setValue('#password', process.env.PASSWORD)
            .click('#login-button')
            .waitForElementVisible('.app_logo')
            .assert.visible('.app_logo')
            .end();
    },
}