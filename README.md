# cvXplorer 🛡️

![GitHub license](https://img.shields.io/github/license/SrMatheus2000/cvxplorer)
![GitHub issues](https://img.shields.io/github/issues/SrMatheus2000/cvxplorer)
![GitHub forks](https://img.shields.io/github/forks/SrMatheus2000/cvxplorer)

## Overview

cvXplorer is a web application aimed at cybersecurity professionals and enthusiasts. The application provides an interface for searching and analyzing security vulnerabilities defined in the Common Vulnerabilities and Exposures (CVE) system. Users can input a CVE identifier, and the application fetches the relevant data from the OpenCVE API. It presents the results in an organized manner, and allows users to view detailed information, including the Common Vulnerability Scoring System (CVSS) metrics.

## Features

- **CVE Search:** Users can search for CVEs by typing the identifier in the search bar.
- **CVE Details:** Detailed view of the CVE, including description and CVSS metrics.
- **CVSS Calculator:** When CVSS scores are not available, users can manually calculate them by inputting relevant metrics.
- **Secure Communication:** Application is hosted with HTTPS, ensuring encrypted communication.

## Security Practices and Tools

cvXplorer was developed with a security-first mindset. The following tools and practices were used to protect the application against Common Weakness Enumerations (CWEs):

- **ESLint:** Linting tool for identifying and fixing code issues.
- **Input Validation and Formatting:** Protects against CWEs such as Cross-site Scripting (XSS) and Improper Input Validation.
- **SonarCloud:** Static code analysis tool for identifying vulnerabilities and code issues.
- **Snyk:** Identifies and fixes vulnerabilities in project dependencies.
- **Semgrep:** Static code analysis tool similar to SonarCloud.
- **Dependabot:** Keeps dependencies updated and secure.
- **CodeQL:** Code analysis tool for identifying complex vulnerabilities such as SQL Injection and Buffer Overflow.

## Getting Started

1. Clone this repository:
``git clone git@github.com:SrMatheus2000/cvxplorer.git``

2. Navigate to the project directory and install dependencies with pnpm:
``pnpm install``

3. Run the application:
``pnpm dev``

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.

