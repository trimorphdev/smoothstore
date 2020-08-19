const { Datastore } = require('./dist/index');

const myDatastore = new Datastore("APPLICATION_NAME", "SCOPE");
let firstLaunch = myDatastore.get("first");

myDatastore.watch((key, value) => {
    console.log("CHANGED!");
});

if (!firstLaunch) {
    console.log("Hello, world!");
    myDatastore.set("first", true);
} else
    console.log("Hello again, world!");