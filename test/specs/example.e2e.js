describe('My Login application', () => {
    it('should login with valid credentials', () => {
        browser.url(`https://the-internet.herokuapp.com/login`);

        $('#username').setValue('tomsmith');
        $('#password').setValue('SuperSecretPassword!');
        $('button[type="submit"]').click(); 

        expect($('#flash')).toBeExisting();
        expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!');
    });
});

