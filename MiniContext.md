  In this project we are learning how to use context APi with this mini project. in this project we are simply trying to share data between components from top to down manner without using props on every single different level with the help and use case of context API.  

*Some tutorial knowledge of Context API *

// How to make Context API , what is context Api  and why we need it?- 

-- ContextProviders are a crucial part of React's Context API, which allows you to share state and functions between different components without having to pass them down through every level of your component tree. 

Before the Context API, the most common way to manage global state was to use a library like Redux or MobX. However, these libraries can be complex and require a lot of boilerplate code. With the Context API, you can manage global state in a simpler way, without the need for a third-party library.


Code Example - How to create it userContext

import React from "react";

const UserContext = React.createContext() 
export default UserContext; 

how to Use userContext. 
{/*
 Once the context is established, we need to create a ContextProvider which provides data and functions to the children components and elements. 

 Code example - 

 import React, { useState } from "react";
 import UserContext from "./UserContext";

const UserContextprovider = ({children}) => {
    const [user, setUser] = useState(null);
    return(
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
    )

}
export default UserContextprovider;


The Function is telling all the components would wrap by this provider have access to these props without passing the props on every single components.
 
 
how to use it - we can use it like a wrapper  on top level of all elements/Components.  (like we still use fragments <> </>  as wrapper on JSx components).

Jsx Elements - 

         <UserContext>    
        <Login/>
        <Card/>
        <Data/>
        </UserContext>

         // Now it became a provider for all elements. Now, All the component and elements have access of all state through this userContext.


        * one more important thing you have to use a new hook called useContext to manage userContext*

 */}


How i build this, Step by Step guide - 

1. firstly, i create a folder  called `context` and inside that folder create two files `UserContext.js` and `UserContextProvider.jsx`.

2. Create Context in `UserContext.js` and Create provider in `UserContextProvider.jsx`. 

3. Create a folder "Components" in src to make neccessary components used in this projects. In this miniproject we creating a login form and showing user data with usecontext. 

4. In Login Component we are setting the user input data like username password in user State. 

5. in Profile component we will display that data using useContext Hook. 

6. Now we have profile, login form. so we can render them in app.jsx. Dont  forget to wrap App with Provider.