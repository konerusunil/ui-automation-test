class Selector {

  readonly fields = {
    validations: {
      yourDetails: {
        applicationTypeSingle: '//*[@id="application_type_single"]',
        applicationTypeJoint: '//*[@id="application_type_joint"]',
        numberOfDependants: '//*[@id="main-container"]/div[1]/div/div/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[1]/div/div[2]/div/select',
        propertyToBuy: {
        homeToLive: '//*[@for="borrow_type_home"]',
        homtToInvest:'//*[@for="borrow_type_investment"]'
        },
      },
      yourEarnings: {
        yourEarnings: 'input[aria-labelledby="q2q1"]',
        otherEarnings: 'input[aria-labelledby="q2q2"]'
      },
      yourExpenses: {
        livingExpenses: '//*[@id="expenses"]',
        loanRepayment: '//*[@id="otherloans"]',
        creditCardLimits:'input[aria-labelledby="q3q5"]'
      },
      estimate: '//*[@id="btnBorrowCalculater"]',
      startOver: '.borrow__result > .box--right > .start-over',
      borrowResult: '//*[@id="borrowResultTextAmount"]'
    }
  }
}

const selectors = new Selector();
export { selectors };
