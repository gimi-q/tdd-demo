var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Demo test Webforms': function (browser) {
    browser
      .url('http://www.wf.dev/forms/1193')   // visit the url
      browser.pause(10000);
      .waitForElementVisible('body'); // wait for the body to be rendered

      // check if we are seeing the Mobile Version of GitHub
      browser.element('css selector', '.switch-to-desktop', function(result) {

        if(result.status != -1) { //Element exists, do something
          browser.click('.switch-to-desktop')
          .waitForElementVisible('body'); // wait for the body to be rendered
        }
      });


    // part two:
    browser
      .assert.containsText('body', 'dwyl.io') // assert contains
      .saveScreenshot(conf.imgpath(browser) + 'dwyl.png')
      .end();
    }
  };
