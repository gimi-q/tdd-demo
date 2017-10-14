const conf = require('../../nightwatch.conf.js');

function iter(elems, browser) {
  elems.value.forEach((element) => {
    browser.elementIdText(element.ELEMENT, (result) => {
      browser.assert.ok(result.value.length > 0);
    });
  });
}

module.exports = {
  'Quiz App:: I am shown "Welcome to the Quiz!" on the home page': function (browser) {
    browser
      .url('http://localhost:3000/') // visit the url

      .waitForElementVisible('body')
      .waitForElementVisible('#root')
      .waitForElementVisible('#welcome-message')
      .assert.containsText('#welcome-message', 'Welcome to the Quiz!');
  },

  'Quiz App:: I am asked a question with possible answers': function (browser) {
    browser
      .url('http://localhost:3000/') // visit the url

      .waitForElementVisible('body')
      .waitForElementVisible('#root')
      .waitForElementVisible('#question')
      .assert.containsText('#question', '?')
      .waitForElementVisible('#answers')
      .expect.element('#answers > .answer:nth-child(2)').to.be.present;

    browser.elements('css selector', '.answer', (elems) => { iter(elems, browser); });

    browser.end();
  },
};
