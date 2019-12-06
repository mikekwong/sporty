// Middleware for async requests

// function that checks to see whether an action’s payload is a Promise, which it does by looking for function or objects that have a then function.
const isPromise = payload =>
  (typeof payload === "object" || typeof payload === "function") &&
  typeof payload.then === "function";

// The asyncAction function will be used as the data store middleware, and it calls then on the Promise to wait for it to be resolved, at which point it uses the result to replace the payload and passes it on, using the next function, which continues the normal path through the data store
export const asyncActions = () => next => action => {
  if (isPromise(action.payload)) {
    action.payload.then(result => next({ ...action, payload: result }));
  } else {
    next(action);
  }
};
