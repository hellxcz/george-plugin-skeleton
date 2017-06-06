var screenshotsCounter = 0;

exports.saveScreenshot = function(name) {

  if (name == undefined){

    name = screenshotsCounter++ + '.png';

  }

  browser.saveScreenshot('./tests/_screenshots/' + name);

};
