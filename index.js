const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");

class Questions {
  constructor() {
    this.projectTitle = "Title of project: ";
    this.developer = "Name of developer: ";
    this.gitHubName = "Add gitHub username: ";
    this.gitHubLink = "Add gitHub link: ";
    this.description = {
      title: `
 ===========
 Description
 ===========
`,
      input: "Describe the project: ",
    };

    this.installation = {
      title: `
 ============
 Installation
 ============
`,
      input: "Describe the set-up process: ",
    };
    this.usage = {
      title: `
 =====
 Usage
 =====
`,
      input: "Provide instructions and examples for use: ",
    };
    this.screenshot = {
      verify: "Would you like to include a screenshot? ",
      input: "Provide relative path(ex:../images/screenshot.png): ",
    };
    this.deployed = {
      verify: "Would you like to include a link to deployed application? ",
      input: "Provide link: ",
    };

    this.contribution = {
      title: `
 ============
 Contribution
 ============
`,
      inputDefault: "Would you like to default Contributor Covenant? ",
      inputUser: "Provide instructions for contributtion: ",
    };

    this.license = {
      title: `
=======
License
=======
`,
      input: "Choose from the following license: ",
    };

    this.tests = {
      title: `
 =====
 Tests
 =====
`,
      input: "Describe how to run any tests:  ",
    };

    this.contact = {
      title: `
 =========
 Questions
 =========
`,
      input: "Provide contact details or instructions: ",
    };
  }
}
const getBadges = function (data) {
  class Badges {
    constructor() {
      this.apache =
        "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      this.gnuAGPLv3 =
        "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
      this.gnuGPLv3 =
        "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      this.gnuLGPLv3 =
        "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
      this.mozilla =
        "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
      this.mit =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      this.boost =
        "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
      this.unlicense =
        "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
    }
  }
  const badges = new Badges();
  data.badges = badges;
  return data;
};

const questions = new Questions();
const promptQuestions = (questions) => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: questions.projectTitle,
    },
    {
      type: "input",
      name: "developer",
      message: questions.developer,
    },
    {
      type: "input",
      name: "gitHubName",
      message: questions.gitHubName,
    },
    {
      type: "input",
      name: "gitHubLink",
      message: questions.gitHubLink,
    },
    {
      type: "checkbox",
      name: "license",
      prefix: questions.license.title,
      message: questions.license.input,
      choices: [
        " Apache",
        " GNU AGPL v3",
        " GNU GPL v3",
        " GNU LGPL v3",
        " Mozilla",
        " MIT",
        " Boost",
        " Unlicense",
      ],
    },
    {
      type: "input",
      name: "description",
      prefix: questions.description.title,
      message: questions.description.input,
    },
    {
      type: "input",
      name: "installation",
      prefix: questions.installation.title,
      message: questions.installation.input,
    },
    {
      type: "input",
      name: "usage",
      prefix: questions.usage.title,
      message: questions.usage.input,
    },
    {
      type: "confirm",
      name: "verifyScreenshot",
      message: questions.screenshot.verify,
      default: false,
    },
    {
      type: "input",
      name: "screenshot",
      message: questions.screenshot.input,
      when: ({ verifyScreenshot }) => {
        if (verifyScreenshot) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "verifyDeployed",
      message: questions.deployed.verify,
      default: false,
    },
    {
      type: "input",
      name: "deployed",
      message: questions.deployed.input,
      when: ({ verifyDeployed }) => {
        if (verifyDeployed) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "contributionDefault",
      prefix: questions.contribution.title,
      message: questions.contribution.inputDefault,
      default: false,
    },
    {
      type: "input",
      name: "contribution",
      message: questions.contribution.inputUser,
      when: ({ contributionDefault }) => {
        if (!contributionDefault) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      type: "input",
      name: "tests",
      prefix: questions.tests.title,
      message: questions.tests.input,
    },
    {
      type: "input",
      name: "contact",
      prefix: questions.contact.title,
      message: questions.contact.input,
    },
  ]);
};

promptQuestions(questions)
  .then(getBadges)
  .then((data) => {
    fs.writeFile(
      "./generated-README/README.md",
      generateMarkdown(data),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
  });
