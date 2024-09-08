## LOCAL SETUP

### 1. Clone the project
```
git clone https://github.com/Nandeeswar7/chrysalis-api.git
cd chrysalis-api
```

### 2. Create .env file (optional)
This step can be skipped. Application will run on port 4000 if skipped.  
Create a .env file in the root directory of the project.  
Configure PORT.

```
PORT=4000
```

### 3. Install dependencies

```
npm i
```

### 4. Start the application

```
npm start
```
or 
```
npm run dev
```
npm run dev uses nodemon to watch for changes in .ts files and automatically restart the server on file changes


The application will be running at `http://localhost:4000` (or your defined `PORT`).
