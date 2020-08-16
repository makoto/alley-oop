import React, { createContext, Component, useState } from 'react'

const GlobalContext = createContext({})
export default GlobalContext

export const Provider = (props) => {
    const [user, setUser] = useState(null)
    const [vault, setVault] = useState(null)
    return(
      <GlobalContext.Provider value={{user, setUser, vault, setVault}} >
        {props.children}
      </GlobalContext.Provider>  
    )
}
