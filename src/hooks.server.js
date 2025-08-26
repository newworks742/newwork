// /* eslint-disable no-unused-vars */

//   import mongoose from "mongoose";
//   import { sequence } from '@sveltejs/kit/hooks';

//   let isConnected = false;
//   const MONGODB_URI =`mongodb+srv://bhavana:kkt13TqY5QYiTgPe@cluster0.2pqyzxs.mongodb.net/`

  
//   export const main = async ({ event, resolve }) => {
//     if (!isConnected) {
//       try {
//         await mongoose.connect(MONGODB_URI);
//         isConnected = true;
//         console.log("Connected to MongoDB");
//       } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw new Error("Failed to connect to the database");
//       }
//     }
  
//     const sessionId = event.cookies.get('auth_session') || null;
  
//       let user = null;
//       let session = null;
  
//     //   if (sessionId) {
//     //       try {
//     //           session = await auth.validateSession(sessionId);
//     //           user = session?.user || null;
//     //       } catch (error) {
//     //           console.error('Failed to validate session:', error);
//     //           event.cookies.delete('auth_session', { path: '/' });
//     //       }
//     //   }
//       event.locals.user = user;
//       event.locals.session = session;
  
//       const path = event.url.pathname;
  
//       if (event.locals.user) {
//           event.locals.authedUser = {
//               id: event.locals.user?.userId,
//               email: event.locals.user?.email,
//               username: event.locals.user?.username
//           };
//       }
  
//     const response = await resolve(event);
//     return response;
//   };
  
//   export async function handleError({ error, event, status, message }) {
//     const errorId = crypto.randomUUID();
  
//     const isNotFound = !event.route.id && event.url.pathname !== '/';
    
//     return {
//       message: error?.message || 'Whoops !',
//       status: isNotFound ? 404 : (error?.status || 500),
//       errorId
//     };
//   }
  
//   export const handle = sequence(main);




/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import { sequence } from '@sveltejs/kit/hooks';
import { MONGODB_URI } from '$env/static/private';

let isConnected = false;

export const main = async ({ event, resolve }) => {
  if (!isConnected) {
    try {
      // Simple connection for testing
      await mongoose.connect(MONGODB_URI);
      isConnected = true;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      // Don't throw error, let the app continue without DB connection
      // You can handle this gracefully in your routes
      console.warn("App running without database connection");
    }
  }

  const sessionId = event.cookies.get('auth_session') || null;

  let user = null;
  let session = null;

  // if (sessionId) {
  //     try {
  //         session = await auth.validateSession(sessionId);
  //         user = session?.user || null;
  //     } catch (error) {
  //         console.error('Failed to validate session:', error);
  //         event.cookies.delete('auth_session', { path: '/' });
  //     }
  // }
  
  event.locals.user = user;
  event.locals.session = session;

  const path = event.url.pathname;

  if (event.locals.user) {
    event.locals.authedUser = {
      id: event.locals.user?.userId,
      email: event.locals.user?.email,
      username: event.locals.user?.username
    };
  }

  const response = await resolve(event);
  return response;
};

export async function handleError({ error, event, status, message }) {
  const errorId = crypto.randomUUID();

  const isNotFound = !event.route.id && event.url.pathname !== '/';
 
  return {
    message: error?.message || 'Whoops !',
    status: isNotFound ? 404 : (error?.status || 500),
    errorId
  };
}

export const handle = sequence(main);