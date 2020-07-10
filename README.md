<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://res.cloudinary.com/vinhhai/image/upload/v1594373035/nvf6jx1coelrjfdwnvoj.png" width="150" height="150">
  </a>
  <h3 align="center">Gada SMS</h3>
  <p align="center">
    <br />
    Provide you a service to send sms and manage sms
    <br />
    <a href="https://smsgcalls.tk/">View Demo</a>
    ·
    <a href="https://github.com/gada121982/Gada-sms-project/issues">Report Bug</a>
    ·
    <a href="https://github.com/gada121982/Gada-sms-project/issues">Request Feature</a>
  </p>
</p>


:warning: **If you want to run this app**: You might have an api to send sms, so this document is for reference purposes only, you can see demo bellow!

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## About The Project

Gada SMS is a service that provide to client on Salesforce can send sms to their customer. We will get contact list fom client's Salesforce account. Beside that, we support an application to client for manage the messages was sent
<br />

![Gada sms Screen Shot](https://res.cloudinary.com/vinhhai/image/upload/v1594391237/pthqzboisozkmwcpchlo.png)

![Gada sms Screen Shot](https://res.cloudinary.com/vinhhai/image/upload/v1594391576/nxqmr6smjuntkfpawimv.png)


### Built With

* [ReactJS](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [NodeJS](https://nodejs.org/)
* [JWT](https://jwt.io/)
* [ExpressJS](https://expressjs.com/)
* [JSforce](https://jsforce.github.io/)
* [MongooseJS](https://mongoosejs.com/)
* [Docker](https://www.docker.com/)



<!-- GETTING STARTED -->
## Getting Started

Follow instructions bellow to setting up your project locally.

### Prerequisites

1. Install Nodejs: [Install NodeJS Document](https://nodejs.org/en/download/)
2. Install Docker: [Install Docker Document](https://nodejs.org/en/download/)
3. Sign up Salesforce account: [Sign up Salesforce Account](https://www.salesforce.com/form/signup/freetrial-elf-v2)
4. Setup connected apps on Salesforce for OAuth: [Setting OAuth Salesforce Application](https://help.salesforce.com/articleView?id=connected_app_create_api_integration.htm&type=5)
```
Now, you can copy Client ID, Client Secret to set up dotenv file later
```
5. Create an api to send sms

<br/>

:bangbang: Now you have to buy an api from 3rd party provider to send sms purpose. I suggest: [Vietguys](https://www.vietguys.biz/)



### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
```sh
git clone https://github.com/your_username_/Project-Name.git
```
3. Install NPM packages
```sh
npm install
```
4. Enter your API in `config.js`
```JS
const API_KEY = 'ENTER YOUR API';
```





