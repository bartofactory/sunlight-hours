# sunlight-hours

## Features
The PWA exposes two endpoint:


* `https://daylight-in-month.netlify.app/`
**Daylight throught the year** 
This is the home of the application, that given the current user browser location and the actual date. It shows the time of light during the same day throught the months of the year

* `https://daylight-in-month.netlify.app/month/:monthOfTheYear`
**Daylight in a specific month** 
Given the current user browser location and the month passed via path param. It shows the time of light in a specific month

## Project setup
In order to run the project follow the steps
### Install the dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```