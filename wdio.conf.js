const { ReportAggregator, HtmlReporter} = require( '@rpii/wdio-html-reporter' );
exports.config = {
    
    specs: [
        './test/**/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
      {
      browserName: 'chrome',

        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
      //   maxInstances: 5,
      //   //
      //   browserName: 'chrome',
        acceptInsecureCerts: true,
      "google:chromeOptions":  {
          args: [
            "--headless",
            "--disable-gpu",
            "--window-size=1640,1050",
            "--disable-dev-shm-usage",
            "--no-sandbox",
            "--ignore-certificate-errors",
            "--test-type",
            "--incognito"
          ]
        }
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }


// If outputDir is provided WebdriverIO can capture driver session logs
// it is possible to configure which logTypes to include/exclude.
// excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
// excludeDriverLogs: ['bugreport', 'server'],
],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'trace',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 1,
  
  services: ['chromedriver'],
  
  framework: "cucumber",
  cucumberOpts: {
    backtrace: false,   // <boolean> show full backtrace for errors
    compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false,      // <boolean> invoke formatters without executing steps

    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true,       // <boolean> disable colors in formatter output
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    source: true,       // <boolean> hide source URIs
    profile: [],        // <string[]> (name) specify the profile to use
    name: [],           // Only execute the scenarios with name matching the expression (repeatable)

    timeout: 500000,
    requireModule: [
      "tsconfig-paths/register",
      () => {
        require("ts-node").register({files: true});
      }
    ],
    ailAmbiguousDefinitions: true,
    failFast: false,
    ignoreUndefinedDefinitions: false,
    require: [
      "./test/step_definitions/*.ts"
     
    ],
    strict: true,
    tagExpression: "@chrome",
    tagsInTitle: true
   
  },
   
    reporters: ['spec',
        [HtmlReporter, {
            debug: true,
            outputDir: './reports',
            filename: 'report.html',
            reportTitle: 'Loan Calculator',
            
            //to show the report in a browser when done
            showInBrowser: true,

            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false,

            // to use the template override option, can point to your own file in the test project:
            // templateFilename: path.resolve(__dirname, '../template/wdio-html-reporter-alt-template.hbs'),
            
            // to add custom template functions for your custom template:
            // templateFuncs: {
            //     addOne: (v) => {
            //         return v+1;
            //     },
            // },

            //to initialize the logger
            // LOG: log4j.getLogger("default")
        }
        ]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    onPrepare: async function(config, capabilities) {
      let reportAggregator = new ReportAggregator({
        outputDir: './reports/',
        filename: 'results.html',
        reportTitle: 'Master Report',
        browserName : capabilities.browserName,
        collapseTests: true,
        // to use the template override option, can point to your own file in the test project:
        // templateFilename: path.resolve(__dirname, '../template/wdio-html-reporter-alt-template.hbs')
    });
    reportAggregator.clean() ;

    global.reportAggregator = reportAggregator;
},

onComplete: function(exitCode, config, capabilities, results) {
    (async () => {
        await global.reportAggregator.createReport();
    })();
    }
}
