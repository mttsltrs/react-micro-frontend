# 🌦️ A basic weather app for some Node & React practice

![unit-tests](https://github.com/mttsltrs/react-micro-frontend/actions/workflows/unit-test.yml/badge.svg)

Run using `Node v18.6.0`

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

A node express server that queries the [Open-Meteo weather api](https://open-meteo.com/en/docs) on port 3000

### Shell

A react app which consumes and renders the remote Forecast module on port 3001

### Remote

A react app which exports a Forecast module using webpack module federation on port 3002
