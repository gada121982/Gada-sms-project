<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://res.cloudinary.com/vinhhai/image/upload/v1594373035/nvf6jx1coelrjfdwnvoj.png" width="150" height="150">
  </a>
  <h3 align="center">Gada SMS</h3>
  <p align="center">
    Provide you a service to send sms and manage sms
    <br />
    <a href="#">View video introduce</a>
    ·
    <a href="https://smsgcalls.tk/">View product</a>
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
* [API](#api)
* [Contributing](#contributing)
* [Contact](#contact)

## About The Project

Gada SMS is a service that provide to client on Salesforce can send sms to their customer. We will get contact list fom client's Salesforce account. Beside that, we support an application to client for manage the messages was sent.

![Gada sms Screen Shot](https://res.cloudinary.com/vinhhai/image/upload/v1594391237/pthqzboisozkmwcpchlo.png)
<br />
![Gada sms Screen Shot](https://res.cloudinary.com/vinhhai/image/upload/v1594391576/nxqmr6smjuntkfpawimv.png)
<br />
![Gada  Screen Shot](https://res.cloudinary.com/vinhhai/image/upload/v1594400166/qnmlzzh7lyuyjoptjsxr.png)

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
5. Create an api to send sms: :bangbang: Now, you have to buy an api from 3rd party provider to send sms purpose. I suggest: [Vietguys](https://www.vietguys.biz/)

### Installation
1. Clone the repository
```sh
git clone https://github.com/gada121982/Gada-sms-project
```
2. Move to server foler
```sh
cd Gada-sms-project/server/
```
3. Setting up .env file

![.env file screenshot](https://res.cloudinary.com/vinhhai/image/upload/v1594399110/vodlfmjd9olliah7emqy.png)


4. Build Dockerfile
```sh
docker build -t gcalls-app .
```
```sh
docker run -p 8000:8000 -d gcalls-app
```

<!-- USAGE EXAMPLES -->
## API
Authencation api
- GET  /auth/loginsf
- POST /auth/loginsf
- GET  /auth/loginsf/callback
- GET  /auth/login
- POST /auth/login
- POST /auth/logout
- POST /auth/admin/logout

Admin api
> Those api have ***admin middleware*** for authentication admin account

- GET  /admin

- GET  /admin/history
- GET  /admin/usersf/all

- POST /admin/user/add
- POST /admin/user/delete
- POST /admin/user/edit
- GET  /admin/user/all

- POST /admin/template/add
- POST /admin/template/update
- POST /admin/template/delete
- GET  /admin/template/all

- POST /admin/category/add
- POST /admin/template/delete
- POST /admin/template/getall

Message api
> Those api have ***manage middleware*** for authentication user account

- GET  /api/message/contactlist
- GET  /api/message/category/getall
- GET  /api/message/template/all
- GET  /api/template/all
- GET  /api/template/getbycategory

Proxy api
> Those api have ***manage middleware*** for authentication user account
- POST /api/proxy/send

Render message page
> Those api have ***manage middleware*** for authentication user account
- GET  /message

Render manage page
> Those api have ***manage middleware*** for authentication user account
- GET /
- GET /api/allcontact

<!-- CONTRIBUTING -->
## Contributing
Any contributions you make are **greatly appreciated**.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

| <a href="https://gadadev.tk" target="_blank">**Nguyen Vinh Hai**</a>
| :---: |
| [![Nguyen Vinh Hai ](https://avatars.githubusercontent.com/gada121982?s=200)](https://gadadev.tk)| 
| <a href="https://github.com/gada121982" target="_blank">`github.com/gada121982`</a> |

[@NguynVnhHi1](https://twitter.com/NguynVnhHi1) - [Linkedin](https://www.linkedin.com/in/vinhhai/) - gada121982@gmail.com







