# SmoothStore
An easy to use datastore framework for Node.js.

## Why SmoothStore?
SmoothStore is a super lightweight framework, meaning it has no dependencies and it's only composed of one JavaScript source file.  It's also cross platform!

## Installing
```sh
npm i smoothstore
# OR
yarn add smoothstore
```

## Example
```js
const { Datastore } = require('smoothstore');

const myDatastore = new Datastore("APPLICATION_NAME", "SCOPE");
let firstLaunch = myDatastore.get("first");

if (!firstLaunch) {
    console.log("Hello, world!");
    myDatastore.set("first", true);
} else
    console.log("Hello again, world!");
```
**Or TypeScript:**
```ts
import { Datastore } from 'SmoothStore';

const myDatastore: Datastore = new Datastore("APPLICATION_NAME", "SCOPE");
let firstLaunch: boolean | null = myDatastore.get("first");

if (!firstLaunch) {
    console.log("Hello, world!");
    myDatastore.set("first", true);
} else
    console.log("Hello again, world!");
```

## API
### `new Datastore(name: string, scope?: string)`
Creates and configures a new `Datastore` object.

### `Datastore.get(key: string): any`
Returns the stored value with the name provided.  If it does not already exist, it returns `null`.

### `Datastore.set(key: string, value: any): void`
Sets a value with the name provided to the value provided.

### `Datastore.load(): object`
Loads the datastore to memory.

### `Datastore.save(): void`
Writes the data stored in memory to a file.

### `Datastore.watch(callback: Function): void`
Watches for changes in the datastore from the current running script.  It calls the `callback` with the key and value that were changed.

```js
datastore.watch((key, value) => {
    console.log("CHANGED!");
});
```

### `Datastore.getStoreData(): object`
Returns the data stored in the datastore's file (converted to an object).