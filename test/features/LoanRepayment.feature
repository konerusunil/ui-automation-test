Feature: To test home loan borrowing calculator

  @chrome
  Scenario: Verify the home loan borrowing calculator
    Given user launch the home loan borrowing calculator application
    Then validate the home loan borrowing estimate
      | ApplicationType | NoofDependents | PropertytoBuy   | YourIncome | OtherIncome | LivingExpences | OtherLoanRepayment | TotalCreditLimit | BorowingEstimate |
      | Single          | 0              | Home to live in | 80000      | 10000       | 500            | 140                | 10000            | $500,000         |
    Then start over the form for re-estimation
