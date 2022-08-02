# 🌦️ A basic react weather app built with micro UIs using webpack module federation

Run using ```Node v18.6.0```
```
cd api && npm i && npm start
```
```
cd remote && npm i && npm start
```
```
cd shell && npm i && npm start
```

Or run with docker:
```
docker-compose up
```

## Structure
### API
A node express server that makes request to the [Open-Meteo weather api](https://open-meteo.com/en/docs) on port 3000

### Shell
A react app which consumes remote components on port 3001

### Remote
A react app which exports components using webpack module federation on port 3002
