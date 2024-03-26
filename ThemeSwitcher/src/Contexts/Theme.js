import {createContext, useContext} from "react"

export const ThemeContext = createContext({
    themeMode: 'light',
     darktheme: ()=> {},
      lighttheme: ()=> {}
})

export const ThemeProvider = ThemeContext.Provider // themeProvider is wrapper

// custom hook for ease  of access to the context data. 
export default function useTheme() {
    return  useContext(ThemeContext)
}