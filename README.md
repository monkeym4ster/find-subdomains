# find-subdomains

Do you miss AXFR technique? This tool allows to get the subdomains from a HTTP**S** website in a few seconds.  
How it works? find-subdomains does not use neither dictionary attack nor brute-force, it just abuses of Certificate Transparency logs.  
For more information about CT logs, check www.certificate-transparency.org and [crt.sh](https://crt.sh/).

## Getting Started
Please, follow the instructions below for installing and run find-subdomains.

### Pre-requisites
Make sure you have installed the following tools:

```
# Installing Node.js via package manager
https://nodejs.org/en/download/package-manager/
# Installing Yarn (Node.js dependency management tools, Like python-pip)
https://yarnpkg.com/en/docs/install
```

### Installing
```bash
# 1. Global install
$ yarn global add find-subdomains
# 1.1 Running
$ find-subdomains github.com

# Or

# 2. Clone from GitHub
$ git clone https://github.com/monkeym4ster/find-subdomains.git
$ cd find-subdomains
$ yarn install
# 2.1 Running
$ node find-subdomains.js github.com
```

### Running
```bash
$ node find-subdomains.js
```

## Thanks
* *Sheila A. Berta - [(@UnaPibaGeek)](https://www.twitter.com/UnaPibaGeek).*
