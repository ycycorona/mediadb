
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## unit test

```
npm i 
npm install --global ava
npm i nyc -g
set THINK_UNIT_TEST=1 && ava test/model --verbose
set THINK_UNIT_TEST=1 && D:\Code\front-end_workspace\mediadb\node_modules\.bin\ava test/model --verbose

```
