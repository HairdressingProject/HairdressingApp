# Admin Portal - Frontend

- [Resources API](#resources-api)
  * [A quick note](#a-quick-note)
  * [API overview](#api-overview)
  * [API tutorial](#api-tutorial)
    + [Importing required modules](#importing-required-modules)
    + [Sending API requests](#sending-api-requests)
  * [API Reference](#api-reference)
    + [`resourceNames`](#resourcenames-object)
    + [`resourceActions`](#resourceactions-object)
    + [`getAll(resourceName, URL, token)`](#getallresourcename-resourcenames-url-string--httpslocalhost5000-token-string)
    + [`get(resourceName, id, URL, token)`](#getresourcename-resourcenames-id-string--number-url-string--httpslocalhost5000-token-string)
    + [`post(resourceName, resource, URL, token)`](#postresourcename-resourcenames-resource-object-url-string--httpslocalhost5000-token-string)
    + [`put(resourceName, id, resource, URL, token)`](#putresourcename-resourcenames-id-string--number-resource-object-url-string--httpslocalhost5000-token-string)
    + [`deleteResource(resourceName, id, URL, token)`](#deleteresourceresourcename-resourcenames-id-string--number-url-string--httpslocalhost5000-token-string)
    + [`userActions`](#useractions-object)
    + [`login(usernameOrEmail, password, URL)`](#loginusernameoremail-string-password-string-url-string--httpslocalhost5000)
    + [`logout()`](#logout)
    + [`authenticate(token, URL)`](#authenticatetoken-string-url-string--httpslocalhost5000)
    + [`changeUserRole(updatedUser, token, URL)`](#changeuserroleupdateduser-object-token-string--null-url-string--httpslocalhost5000)
  * [Cheat Sheet](#cheat-sheet)
    + [Imports](#imports)
    + [Initial set up](#initial-set-up)
    + [GET requests](#get-requests)
      - [GET ALL](#get-all)
      - [GET](#get)
    + [POST requests](#post-requests)
    + [PUT requests](#put-requests)
    + [DELETE requests](#delete-requests)
- [Adding styles](#adding-styles)

## Resources API

### A quick note
Before making any HTTP requests, make sure that you have already signed in. To do so, navigate to the [sign_in route](http://localhost:3000/sign_in "Sign In") after you start the application (with `yarn start`) and enter the details below:

```
Username or email: admin
Password: 123456
```

You only have to do this once every seven days, which is the expiration time of the token that is stored in your browser. You can see it in the _Application_ tab of your developer tools (if you are using Chrome).

### API overview
The Resources API was created for this application in order to manage the state of all items associated with tables in the database, such as `face_shapes` and `colours`. 

It makes use of [redux-thunk](https://github.com/reduxjs/redux-thunk#motivation "redux-thunk")'s asynchronous action creators to perform HTTP requests and handle eventual errors. In case you are not yet familiar with Redux and want to know more about it, the official [website](https://redux.js.org/introduction/getting-started "redux.js.org") has good tutorials to get started with its concepts, such as [_actions_](https://redux.js.org/basics/actions "Actions"), [_reducers_](https://redux.js.org/basics/reducers "Reducers") and [_store_](https://redux.js.org/basics/store "Store").

The main advantages of using Redux over traditional React stateful components are:

1. You no longer have to worry about juggling the application's state around like a hot potato, which can become particularly complicated when you need to pass it between two completely unrelated components (i.e. those that are not under the same parent-child hierarchy).

2. Since every state change is represented through atomic actions, it becomes much easier to [write tests](https://redux.js.org/recipes/writing-tests "Writing tests - Redux"). This also overcomes one of the shortcomings of [Context](https://reactjs.org/docs/context.html "React Context"), which I found a bit convoluted to test.

3. Redux comes with nice debugging tools that allow you to navigate throughout the history of state changes, which can be accessed through [this extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en "Redux DevTools - Chrome"), if you are using Chrome. It is also available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/ "Redux DevTools - Firefox"). Other browsers may be added here.

### API tutorial

#### Importing required modules
If the component that you are working on - say, `DummyComponent`, a [functional component](https://reactjs.org/docs/components-and-props.html#function-and-class-components "Function and Class Components") - requires you to send HTTP requests to the backend in order to query the database, first you add the following import statement to the `DummyComponent/index.js` file:

```js
import { useDispatch, useSelector } from 'react-redux';
```

> `useDispatch` and `useSelector` are [React hooks](https://reactjs.org/docs/hooks-intro.html "Introducing Hooks"), which this application uses extensively. In short, they are nothing but functions that hook into the component's [lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle "The Component Lifecycle"), which essentially void the need for us to use class-based components with methods such as [`componentDidMount()`](https://reactjs.org/docs/react-component.html#componentdidmount "componentDidMount") and [`componentDidUpdate()`](https://reactjs.org/docs/react-component.html#componentdidupdate "componentDidUpdate").

You also have to import the [`resourceActions`](https://github.com/HairdressingProject/HairdressingApp/blob/master-d/Admin/Frontend/src/_actions/resource.actions.js#L6 "resourceActions") needed to call the request(s) that you are interested in. Suppose that you have the following directory tree structure with the `DummyComponent` included:

```
src
│   ...      
│____ _actions
|     |  ...
|     |  index.js
|     |
|
|
|____ _constants
|    |  ...
|    |  index.js
|    |
|
|
└─── components
│   │   ...
│   │
│   └─── DummyComponent
│       │   index.js
│       │   DummyComponent.module.scss
│       │   ...
│        
...
```

This is how you would import [`_actions/index.js`](https://github.com/HairdressingProject/HairdressingApp/blob/master-d/Admin/Frontend/src/_actions/index.js "_actions/index.js") (which exports [`resourceActions`](https://github.com/HairdressingProject/HairdressingApp/blob/master-d/Admin/Frontend/src/_actions/resource.actions.js#L6 "_actions/resource.actions.js")) from `DummyComponent/index.js`, using relative path:

```js
import { resourceActions } from '../../_actions';
```

Another import statement that you should include refers to [`resourceNames`](https://github.com/HairdressingProject/HairdressingApp/blob/master-d/Admin/Frontend/src/_constants/resource.constants.js "resourceNames"), which works as an Enum with convenient constants that you can pass to `resourceActions` methods to identify what kind of resource you are working with. According to the previous directory tree, this is how you would do it in this case:

```js
import { resourceNames } from '../../_constants';
```

Now you should be ready to perform HTTP requests through `resourceActions`.

#### Sending API requests
Using the `DummyComponent` from the previous section, this is how you would have a very basic component that requests all _face shapes_ from the database and stores them locally:

```js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../_actions';
import { resourceNames } from '../../_constants';

const DummyComponent = () => {
    const [localFaceShapes, setLocalFaceShapes] = useState(null);
    const dispatch = useDispatch();
    const faceShapes = useSelector(state => state.resources.faceShapes);

    useEffect(() => {

        dispatch(resourceActions.getAll(resourceNames.FACE_SHAPES));

    }, []);

    useEffect(() => {
        // faceShapes was updated, store results in localFaceShapes

        setLocalFaceShapes({ faceShapes });
        
    }, [faceShapes]);

    return (
        // ...
    )
}
```

For a more comprehensive example that uses other methods, see [DummyComponent/index.js](https://github.com/HairdressingProject/HairdressingApp/blob/master-d/Admin/Frontend/src/components/DummyComponent/index.js "DummyComponent/index.js example").

The `DummyComponent` can be accessed via the `/dummy` route (i.e. `http://localhost:3000/dummy` if you are working locally).

### API Reference

#### `resourceNames: Object`
Works as an `Enum` that represents a specific resource.

```js
const resourceNames = {
    USERS: 'USERS',
    COLOURS: 'COLOURS',
    FACE_SHAPES: 'FACE_SHAPES',
    FACE_SHAPE_LINKS: 'FACE_SHAPE_LINKS',
    HAIR_LENGTHS: 'HAIR_LENGTHS',
    HAIR_LENGTH_LINKS: 'HAIR_LENGTH_LINKS',
    HAIR_STYLES: 'HAIR_STYLES',
    HAIR_STYLE_LINKS: 'HAIR_STYLE_LINKS',
    SKIN_TONES: 'SKIN_TONES',
    SKIN_TONE_LINKS: 'SKIN_TONE_LINKS',
    USER_FEATURES: 'USER_FEATURES'
};
```

#### `resourceActions: Object`
Contains functions that call HTTP requests.

```js
const resourceActions = {
    getAll,
    get,
    post,
    put,
    deleteResource
};
```
#### `getAll(resourceName: resourceNames, URL: string | "https://localhost:5000", token: string)`
Thunk middleware that dispatches actions to `GET` all resource of type `resourceName` from the database. `URL` and `token` are optional parameters with default values, if you are authenticated and working locally (in `localhost`) you do not need to pass them. 

Accessed from `resourceActions`.

```js
// Dispatch an action to GET all FACE_SHAPES from the database

dispatch(resourceActions.getAll(resourceNames.FACE_SHAPES));
```

#### `get(resourceName: resourceNames, id: string | number, URL: string | "https://localhost:5000", token: string)` 
Thunk middleware that dispatches actions to `GET` a resource of type `resourceName` with a given `id` from the database. Accessed from `resourceActions`. `URL` and `token` are optional parameters with default values, if you are authenticated and working locally (in `localhost`) you do not need to pass them. 

```js
// Dispatch an action to GET a FACE_SHAPE with id = 3 from the database

dispatch(resourceActions.get(resourceNames.FACE_SHAPES, 3));
```

#### `post(resourceName: resourceNames, resource: Object, URL: string | "https://localhost:5000", token: string)` 
Thunk middleware that dispatches actions to `POST` a `resource` of type `resourceName` from the database. Accessed from `resourceActions`. `URL` and `token` are optional parameters with default values, if you are authenticated and working locally (in `localhost`) you do not need to pass them. 

__NOTE__: All properties of the `resource` object should be in _PascalCase_ (to match the ones in the backend).

__NOTE 2__: The `resource` object should not have `Id`, `DateCreated` and `DateModified` fields in `POST` requests. These will be automatically set by the database.

```js
// Dispatch an action to POST a FACE_SHAPE to the database

dispatch(resourceActions.post(resourceNames.FACE_SHAPES, { ShapeName: "square" }));
```

#### `put(resourceName: resourceNames, id: string | number, resource: Object, URL: string | "https://localhost:5000", token: string)`
Thunk middleware that dispatches actions to `PUT` a `resource` of type `resourceName` with a given `id` in the database. Accessed from `resourceActions`. `URL` and `token` are optional parameters with default values, if you are authenticated and working locally (in `localhost`) you do not need to pass them. 

__NOTE__: All properties of the `resource` object should be in _PascalCase_ (to match the ones in the backend).

__NOTE 2__: Since ASP.NET Core closely follows the HTTP specification, the `resource` object is required to contain __all__ properties in `PUT` requests, __except__ `DateModified`, which will be automatically updated by the database. You should be able to access them by storing your resources locally in your component (with `useState`) after dispatching a `GET ALL` action.

```js
// Dispatch an action to PUT a FACE_SHAPE with id = 3 in the database

dispatch(resourceActions.put(resourceNames.FACE_SHAPES, 3, { Id: 3, ShapeName: "square", DateCreated: dateCreated, FaceShapeLinks: faceShapeLinks }));
```

#### `deleteResource(resourceName: resourceNames, id: string | number, URL: string | "https://localhost:5000", token: string)`
Thunk middleware that dispatches actions to `DELETE` a resource of type `resourceName` with a given `id` from the database. Accessed from `resourceActions`. `URL` and `token` are optional parameters with default values, if you are authenticated and working locally (in `localhost`) you do not need to pass them. 

```js
// Dispatch an action to DELETE a FACE_SHAPE with id = 3 from the database

dispatch(resourceActions.deleteResource(resourceNames.FACE_SHAPES, 3));
```

#### `userActions: Object`
Contains functions that handle user-related actions.

```js
const userActions = {
    login,
    logout,
    authenticate,
    changeUserRole,
    getAll
};
```

#### `login(usernameOrEmail: string, password: string, URL: string | "https://localhost:5000")`
Dispatches login actions asynchronously. Redirects to "/" if login is successful.

URL is optional (defaults to [localhost](https://localhost:5000 "localhost")).

```js
// Example usage
dispatch(userActions.login("username", "password"));
```

#### `logout()`
Dispatches logout action to delete token stored locally.

```js
// Example usage
dispatch(userActions.logout());
```

#### `authenticate(token: string, URL: string | "https://localhost:5000")`
Dispatches actions to validate the locally stored token.

URL is optional (defaults to [localhost](https://localhost:5000 "localhost")).

```js
// Example usage
dispatch(userActions.authenticate("your-token-string"));
```

#### `changeUserRole(updatedUser: Object, token: string | null, URL: string | "https://localhost:5000")`
Dispatches actions to change a user's role. 

- `updatedUser`: User object with new `UserRole` to be sent in the request body. The following format is required:

```js
{
    Id: string | number,
    UserName: string,
    UserEmail: string,
    UserRole: "user" | "developer" | "admin"
}
```
- `token`: Optional token to validate the request. If not passed, the function will try to retrieve it from `localStorage`.
- `URL`: Optional request URL (defaults to [localhost](https://localhost:5000 "localhost")).

```js
// Example usage
dispatch(userActions.changeUserRole({
    Id: 1,
    UserName: "admin",
    UserEmail: "admin@mail.com",
    UserRole: "developer"
}));
```

### Cheat Sheet
#### Imports
```js
import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../_actions';
import { resourceNames } from '../../_constants';
```

__NOTE__: Do not forget to change relative paths as needed for the specific component that you are working on.

#### Initial set up
```js
const DummyComponent = () => {

    const dispatch = useDispatch();
    const hairStyles = useSelector(state => state.resources.hairStyles);

    useEffect(() => {

    }, []);

    useEffect(() => {

    }, [hairStyles]);

    // ...
}
```
#### GET requests

##### GET ALL
```js
useEffect(() => {

    dispatch(resourceActions.getAll(resourceNames.HAIR_STYLES));

}, []);

useEffect(() => {

    console.log('all hair styles:');

    console.dir(hairStyles);

}, [hairStyles]);
```

##### GET
```js
useEffect(() => {

    dispatch(resourceActions.get(resourceNames.HAIR_STYLES, 2));

}, []);

useEffect(() => {
    console.log('hair style with id = 2:');

    console.dir(hairStyles);

}, [hairStyles]);
```

#### POST requests
```js
useEffect(() => {

    dispatch(resourceActions.post(resourceNames.HAIR_STYLES, {
            HairStyleName: 'hair style name'
    }));

}, []);

useEffect(() => {
    console.log('hair style posted:');

    console.dir(hairStyles);

}, [hairStyles]);

```

__NOTE__: __ALL__ properties in the resource object that you pass to `resourceActions.post()` must be named in _PascalCase_, as they were in the backend. Take a look at the [HairStyles model](https://github.com/HairdressingProject/HairdressingApp/blob/master/Admin/Backend/AdminApi/Models/HairStyles.cs "HairStyles.cs") in the backend as an example.

#### PUT requests
```js
useEffect(() => {

    dispatch(resourceActions.put(resourceNames.HAIR_STYLES, 3, {
            Id: 3,
            HairStyleName: 'updated hair style'
    }));

}, []);

useEffect(() => {
    console.log('hair style with id = 3 updated:');

    console.dir(hairStyles);

}, [hairStyles]);

```

__NOTE__: __ALL__ properties in the resource object that you pass to `resourceActions.put()` must be named in _PascalCase_, as they were in the backend. Take a look at the [HairStyles model](https://github.com/HairdressingProject/HairdressingApp/blob/master/Admin/Backend/AdminApi/Models/HairStyles.cs "HairStyles.cs") in the backend as an example.

#### DELETE requests
```js
useEffect(() => {

    dispatch(resourceActions.deleteResource(resourceNames.HAIR_STYLES, 3));

}, []);

useEffect(() => {
    console.log('hair style with id = 3 deleted:');

    console.dir(hairStyles);

}, [hairStyles]);

```

## Adding styles
Adding styles to your components is done via `SCSS`. In the same directory of the `index.js` file of your component (say, `StylishComponent/index.js`), you should have a `SCSS` file named `StylishComponent.module.scss`. 

Then you can import the `SCSS` file in your `StylishComponent/index.js` file like so:

```js
import classes from './StylishComponent.module.scss';
```

`classes` is an object that provides scoped access to all classes from your `StylishComponent.module.scss` file, which means that there is no risk of overriding classes with the same name from `SCSS` files of other components. See the example below to understand how everything ties together.

`StylishComponent/StylishComponent.module.scss`
```scss
.stylish-container {
  height: 100vh;
  background: radial-gradient(circle, rgba(105,226,245,1) 0%, rgba(141,214,197,1) 100%);
  text-align: center;
}

.stylish-text-1 {
  font-family: 'Comic Sans', sans-serif;
  font-size: 8rem;
  color: #333333;
  text-shadow: 15px 6px 4px rgba(109,62,195,0.6);
  margin: 0;
}

.stylish-text-2 {
  text-transform: uppercase;
  letter-spacing: 3rem; 
  padding-top: 50vh;
}
```

`StylishComponent/index.js`
```js
import React from 'react';
import classes from './StylishComponent.module.scss';

export const StylishComponent = () => (
    <div className={classes["stylish-container"]}>
        <h1 className={[classes["stylish-text-1"], classes["stylish-text-2"]].join(' ')}>
            bruh
        </h1>
    </div>
);
```

See the result [here](https://codesandbox.io/s/thirsty-lehmann-ojlgq "Result - CodeSandbox").
