// var config = require('../../nightwatch.conf.js');
//
// module.exports = { // addapted from: https://git.io/vodU0
//   '@tags': ['guineaPig'],
//   'Guinea Pig Assert Title': function(browser) {
//     browser
//       .url('https://saucelabs.com/test/guinea-pig')
//       .waitForElementVisible('body')
//       .assert.title('I am a page title - Sauce Labs')
//       .saveScreenshot(config.imgpath(browser) + 'a-screenshot-description.png')
//       .clearValue('#i_am_a_textbox')
//       .setValue('#i_am_a_textbox', 'nightwatch roolz!')
//       .saveScreenshot(config.imgpath(browser) + 'nightwatch-roolz.png')
//       .end();
//   }
// };


var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Demo test Webforms': function (browser) {
    browser
      .url('http://wf.dev/forms/1193')   // visit the url
      .pause(10000)
      .waitForElementVisible('form'); // wait for the body to be rendered

      // check if we are seeing the Mobile Version of GitHub
      browser.element('css selector', '.form-component', function(result) {
        console.log(result);
        if(result.status != -1) { //Element exists, do something
          browser.click('.form-component label')
          .waitForElementVisible('body'); // wait for the body to be rendered
        }
      });


    // part two:
    browser
      .assert.containsText('body', 'Compare Telephone System Prices & Save Up To 60%!') // assert contains
      .saveScreenshot(conf.imgpath(browser) + 'webforms.png')
      .end();
    }
  };
