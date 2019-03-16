# cathlab
This is a MERN app. mangoDB express react amd nodejs app

## Folder structure
Client i.e react runs inside client folder in dev mode.
### Server folder structure
1. /server.js :- Entry (index) file. for server (express)
2. /routes :- Folder contines server side routes
    1. /routes/api :- This folder containes files api routes
        1. /routes/api/user.js :- this conatines user releted routes. login, signup, logout, change passwword, change activity, change role.
3. /roles :- This folder files for roles.
    1. /roles/roles.js :- This file containes roleMiddleware for routes. 
    2. /roles/userRole.js :- This file contianes roles privaleges for /routes/api/user.jsuser.js routes
4. /validate :- This folder containes validation files both for schema(mongoose) as well for frontend.
    1. /validate/userValidate.js :- This file comtaines validation for userSchema of mongoose.
5. /model :- This folder conatines mongoose schema
<!-- Here plan keep all schemas in single file -->
6. /middleware :- This folder containes middleware.
7. /config :- This file is config file for declarattaion objects like dabase connection string
8. /client :- This is clinet conatining react app.


<!-- [## Client (reactjs) folder structure](/client/FOLDER.md) -->

## Scripts
```json
  "scripts": {
    "client-install": "cd client && npm install",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
  
  1. npm install :- to install all server node modules
    2. npm run client-install :- installs all react node modules inside client folder.
    3. npm start :- starts express only
    4. npm run server :- expres with nodemon
    5. npm run dev :- start express on with nodemon as well react with concurrently.
    6. To build react :-  cd into client and type npm run build
```

## Production
Run npm run build inside client folder
then set `process.env.NODE_ENV === production`


## To Do
  1. prevent parent group cration in database by validation 
  2. consider adding sessions 
  3. add sundry credators debitors, direct income indirect income direct expense indirect expense fixed assets as parent group these to added under approprite parents groups
  4. make patients as parent group under sundry credadtors
  5. ledgers validation write

