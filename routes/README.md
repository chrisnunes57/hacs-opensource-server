Place for our API routes to be defined

- Calendar
- Login
- Site Content
- Opportunities

## Creating a new route

1. Create the route in a new file named `<ROUTE_NAME>.route.js`, following the structure below and examples already in place.
2. Import this route in `/routes/index.route.js` and add it to the existing routes.
3. Define request logic for the route in a new file named  `/controllers/<ROUTE_NAME>.controller.js`
4. Update the READMEs to include your new route and logic.

## Basic route file structure

### **Imports**

```
const <MODULE_NAME> = require(<MODULE_PROVIDER_PATH>)
...
```
Import all modules needed for this route's logic (e.g. `express`, `asyncHandler`, etc.)

### **Route creation/export**

```
const router = express.Router();
module.exports = router;
```
Create the router needed to route each request. Then export this router, which will be imported in the central routes file at `/routes/index.route.js`.

### **Request definition**

```
router.get("/", asyncHandler(getDataExample));
...
```
Define the type(s) of request(s) the server will handle for this endpoint. The most common methods we will use are: 
- **GET**: To retrieve data from the server.
- **POST**: To submit data to the server.

Follow good style and handle each request's logic in a separate function (i.e.: `getDataExample`). This function will be asynchronous (async), meaning it will give an implicit promise to return its result while the app's event loop continues to run.

The `asyncHandler(...)` is a tool to handle exceptions in these async functions and pass them to our exception handlers.


### **Request handlers**
```
async function getDataExample(req, res, next) {
  try{
    /* Call outside controller logic, respond to request. */
  } catch (e) {
    if (config.env !== "dev") {
      e.message = "Error response for production..."
    }
    next(e);
  }
}
```
Handle the high-level logic for each request in an async function, passing the major workload to the endpoint's controller, defined in `/controllers`.

Send a response if successful, or define an error message for the production error response. Pass errors to the error handler with `next(e)`.