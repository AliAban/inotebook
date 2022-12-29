module.exports = {
    port: 3000,
    db: {
      production: "mongodb://user:pass@example.com:1234/sample",
      development: "mongodb://127.0.0.1:27017/iNoteBook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0",
      test: "mongodb://localhost:27017/sample",
    },
    dbParams: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    authentication: {
      JWT_SECRET: "SECRET_STRING"
    }
};