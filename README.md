# Calc App

## Calculator app built with:
- Docker
- AWS (Localstack)
- Backend: FastAPI (Python 3.11)
- Frontend: Angular v17
- Database Postgres v15.2

Links:
- [App - UI](http://localhost/)
- [Swagger Docs](http://127.0.0.1:8000/docs#)

## Installation
Before executing docker command provide an .env file at the root of the project with these variables:
```
POSTGRES_DB=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
SECRET_KEY=
```
```bash
docker-compose up --build --force-recreate
```

The application will be served at localhost:80 unless port 80 is allocated before executing docker-compose command.