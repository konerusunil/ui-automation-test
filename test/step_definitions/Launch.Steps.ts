import { Given, Then } from 'cucumber';
// import {} from WebdriverIO;


Given(/^user launch the home loan borrowing calculator application$/, () => {
  // eslint-disable-next-line no-undef
  browser.maximizeWindow();
  browser.url('https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/');
  expect($('#q1heading').isDisplayed()).toBe(true);
  expect($('#q2heading').isDisplayed()).toBe(true);
  expect($('#q2heading').isDisplayed()).toBe(true);

});
