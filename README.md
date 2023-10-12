# jv-gomuku
## Tech Stack
  - TypeScript
  - React JS
  - Express JS
  - Mongodb

## Start the applications

1. The full stack app - `jv-gomuku-app` and `jv-gomuku-service`:
   - at the root directory (you should see `docker-compose.yml` file)
   - run `docker-compose up`
     - if dependencies change, run `docker-compose up --build` to rebuild images
     - to stop, run `docker-compose down`
   - go to [http://localhost:3000](http://localhost:1234)
   - the sever is available at [http://localhost:8080](http://localhost:8080)
   - the mongodb via docker container can be access via mongodb://localhost:27017

## Postman Collection
- 220190510-gumuku-service.postman_collection.json

APIs
- POST /api/games/create
- GET /api/games/retrieve/:id
- GET /api/games/history
- POST /api/auth/register
- POST /api/auth/login
## Live Application
- http://jv-une-gomuku.australiaeast.cloudapp.azure.com/
