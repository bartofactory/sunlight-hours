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
The project could run on host machine or in docker environment

### Host Machine
Follow these steps

1. Install the dependencies
```
yarn install
```

2. Compiles and hot-reloads for development
```
yarn serve
```

3. To compile and minify for production
```
yarn build
```

### Docker environment
1. Install docker environment
2. Build the image
```
docker build . -t bartolomeotiralongo/sunlight-hours
```
3. Run the image
```
docker run -p 8080:8080 bartolomeotiralongo/sunlight-hours
```
4. Visit the website at http://localhost:8080