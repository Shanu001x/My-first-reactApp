import {createContext, useContext} from "react"

// useContext is a hook. it is helping to build a custom hook. 

export const ThemeContext = createContext({
    themeMode: 'light',
     darktheme: ()=> {},
      lighttheme: ()=> {}
})

export const ThemeProvider = ThemeContext.Provider // themeProvider is wrapper

// prevent for multiple use of thi sytax " useContext(ThemeContext)" we are creating a custom hook  for ease  of access to the context data. 
export default function useTheme() {
    return  useContext(ThemeContext)
}


// we are exporting three things from here 
// 1. context Data in the form of ThemeContext
// 2.  Provider component that will wrap our app and provide data to its child components using this context
// 3. Custom Hook called useTheme which can be used inside any functional component to access the data provided by the provider