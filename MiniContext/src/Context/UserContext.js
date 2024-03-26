import React from "react";

const UserContext = React.createContext() 
export default UserContext; 
{/*
 We have to make a ContextProvider Once the context has built, Why provider -  it provied the data. Then how can we use it - we can use it like a wrapper (like we still use fragments <> </>  as wrapper on components) on top level of all elements/Components. 

 Every Context is a provider itself,because at last it provieds a variable "userContext" to you. It is used a wrapper on top of all elements like this

         <UserContext>    
        <Login/>
        <Card/>
        <Data/>
        </UserContext>

         // Now it became a provider for all elements. Now, All the component and elements have access of all state through this userContext.

That's the story of how we will build userContext in this project  */}

