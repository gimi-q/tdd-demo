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
      .getText('#question', function(result) {
        browser.assert.ok(result.value.length > 0);
      })
      .waitForElementVisible('#answers')
      .expect.element('#answers > .answerWrapper:nth-child(2)').to.be.present;

    browser.elements('css selector', '.answer', (elems) => { iter(elems, browser); });

  },

  'Quiz App:: When I click on a possible answer I am told whether I am right or not': function (browser) {
    browser
      .url('http://localhost:3000/') // visit the url
      .waitForElementVisible('body')
      .waitForElementVisible('#root')
      .waitForElementVisible('#question')
      .waitForElementVisible('#answers')
      .waitForElementVisible('.answer')
      .click("#answers .answer")
      .getAttribute("#question", "answered-correctly", (result) => {
        browser.assert.ok(result.value == 'yes' || result.value == 'no' );
      })
      .assert.attributeContains('#question', 'question-answered', true);
    browser.end();
  },
};
