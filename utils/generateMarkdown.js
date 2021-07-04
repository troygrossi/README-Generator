// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const generateMarkdown = (data) => {
  const {
    title,
    developer,
    license,
    badges,
    gitHubName,
    gitHubLink,
    description,
    installation,
    usage,
    verifyScreenshot,
    screenshot,
    verifyDeployed,
    deployed,
    contributionDefault,
    contribution,
    tests,
    contact,
  } = data;
  return `
${getBadges(license, badges)}
# ${title}
### Developed By: ${developer}

# Description
${description}

# Table of Contents
${getInstallation(installation, true)}
${getUsage(usage, true)}
${getContribution(contributionDefault, contribution, true)}
${getLicense(license, true)}
${getTests(tests, true)}
${getQuestions(contact, gitHubName, gitHubLink, true)}

${getInstallation(installation, false)}
${getContribution(contributionDefault, contribution, false)}
${getLicense(license, false)}
${getUsage(usage, false)}
${getDeployed(deployed, verifyDeployed)}
${getScreenshot(screenshot, verifyScreenshot)}
${getTests(tests, false)}
${getQuestions(contact, gitHubName, gitHubLink, false)}
 `;
};

const getInstallation = (installation, TOC) => {
  if (TOC && installation) {
    return `
- [Installation](#installation)
    `;
  }
  if (installation) {
    return `
# Installation
${installation}
    `;
  }
  return "<!---->";
};
const getUsage = (usage, TOC) => {
  if (TOC && usage) {
    return `
- [Usage](#usage)
    `;
  }
  if (usage) {
    return `
# Usage
${usage}
  `;
  }
};

const getDeployed = (deployed, verifyDeployed) => {
  if (verifyDeployed) {
    return `
  
Deployed url: 
${deployed}
  `;
  }
  return "<!---->";
};

const getScreenshot = (screenshot, verifyScreenshot) => {
  if (verifyScreenshot) {
    return `

Screenshot:
<img src="${screenshot}"/>
  `;
  }
  return "<!---->";
};

const getContribution = (contributionDefault, contribution, TOC) => {
  if ((TOC && contributionDefault) || (TOC && contribution)) {
    return `
- [Contribution](#contribution)
    `;
  }
  if (contributionDefault) {
    return `
# Contribution
Refer to:
[Contribution Convenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)
    `;
  }
  if (contribution) {
    return `
# Contribution
${contribution}
    `;
  }
  return "<!---->";
};
const getBadges = (license, badges) => {
  if (license) {
    const badgeArr = license.map((license) => {
      switch (license) {
        case " Apache":
          return badges.apache;
        case " GNU AGPL v3":
          return badges.gnuAGPLv3;
        case " GNU GPL v3":
          return badges.gnuGPLv3;
        case " GNU LGPL v3":
          return badges.gnuLGPLv3;
        case " Mozilla":
          return badges.mozilla;
        case " MIT":
          return badges.mit;
        case " Boost":
          return badges.boost;
        case " Unlicense":
          return badges.unlicense;
      }
    });
    return `
${badgeArr}
        `;
  }
  return "<!---->";
};

const getLicense = (license, TOC) => {
  if (TOC && license) {
    return `
- [License](#license)
    `;
  }
  if (license) {
    return `
# License
${license}
        `;
  }
  return "<!---->";
};

const getTests = (tests, TOC) => {
  if (TOC && tests) {
    return `
- [Tests](#tests)
    `;
  }
  if (tests) {
    return `
# Tests
${tests}
  `;
  }
  return "<!---->";
};

const getQuestions = (contact, gitHubName, gitHubLink, TOC) => {
  if (TOC) {
    return `
- [Questions](#questions)
    `;
  }
  if (contact) {
    return `
# Questions
Contact: ${contact}
GitHub Name: ${gitHubName}
GitHub Link: ${gitHubLink}
  `;
  } else {
    return `
# Questions
GitHub Name: ${gitHubName}
GitHub Link: ${gitHubLink}
      `;
  }
};
module.exports = generateMarkdown;

// function renderLicenseBadge(license) {}

// // TODO: Create a function that returns the license link
// // If there is no license, return an empty string
// function renderLicenseLink(license) {}

// // TODO: Create a function that returns the license section of README
// // If there is no license, return an empty string
// function renderLicenseSection(license) {}

// // TODO: Create a function to generate markdown for README
// function generateMarkdown(data) {
//   return `# ${data.title}

// `;
// }
