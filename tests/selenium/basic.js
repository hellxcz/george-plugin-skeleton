
//http://webdriver.io/api/utility/waitForExist.html

// https://github.com/michaelguild13/Selenium-WebdriverIO-Mocha-Chai-Sinon-Boilerplate/blob/master/


var expect = require('chai').expect;


describe('try plugin', () => {


  describe('happy day', () => {

    it('login to sandbox should pass', () => {

      browser.url('https://localhost:8080');

      browser.waitForExist('input.enable-plugin');

      saveScreenshot();

      browser.element('input.enable-plugin').click();

      saveScreenshot();

      browser.element('button.btn.login').click();

      saveScreenshot();

      // wait till load
      browser.waitForExist('#pageContainer', 60 * 1000);
      browser.waitForExist('#accountName', 60 * 1000);

      saveScreenshot();

    })

  });

});
