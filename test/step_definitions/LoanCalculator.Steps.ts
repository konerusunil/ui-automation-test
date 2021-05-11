/* eslint-disable no-undef */
import { Given, Then } from 'cucumber';
import { selectors } from '../pageobjects/Selectors';
import { expect } from 'chai';

// import {} from WebdriverIO;


Then(/^validate the home loan borrowing estimate$/, (details) => {
  const values = details.hashes();

  // eslint-disable-next-line no-restricted-syntax
  for (const data of values) {
    switch(data.ApplicationType ){
      case 'Single' :
    $(selectors.fields.validations.yourDetails.applicationTypeSingle).click();
    break;
    case 'Joint' :
      $(selectors.fields.validations.yourDetails.applicationTypeJoint).click();
      break;
      default:
        console.log('default, Nothing to select');
        break;
    }

    $(selectors.fields.validations.yourDetails.numberOfDependants).selectByVisibleText(data.NoofDependents);

    switch(data.PropertytoBuy){
      case 'Home to live in' :
    $(selectors.fields.validations.yourDetails.propertyToBuy.homeToLive).click();
    break;
    case 'Residential investment' :
      $(selectors.fields.validations.yourDetails.propertyToBuy.homtToInvest).click();
      break;
      default:
        console.log('default, Nothing to select');
        break;
    }

    $(selectors.fields.validations.yourEarnings.yourEarnings).setValue(data.YourIncome);
    $(selectors.fields.validations.yourEarnings.otherEarnings).setValue(data.OtherIncome);
    $(selectors.fields.validations.yourExpenses.livingExpenses).setValue(data.LivingExpences);
    $(selectors.fields.validations.yourExpenses.loanRepayment).setValue(data.OtherLoanRepayment);
    $(selectors.fields.validations.yourExpenses.creditCardLimits).setValue(data.TotalCreditLimit);

  $(selectors.fields.validations.estimate).click();
  browser.pause(5000);
  console.log($(selectors.fields.validations.borrowResult).getText(),'testtttttttttttttttt');
  expect($(selectors.fields.validations.borrowResult).getText()).to.be.equal(data.BorowingEstimate);
}
});

Then(/^start over the form for re-estimation$/, () => {
 
  // eslint-disable-next-line no-restricted-syntax
  $(selectors.fields.validations.startOver).click();
  browser.pause(3000);
  
});

