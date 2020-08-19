import React, { createContext, Component, useState } from 'react'

const GlobalContext = createContext({})
export default GlobalContext

export const Provider = (props) => {
    const [user, setUser] = useState(null)
    const [vault, setVault] = useState(null)
    const [update, setUpdate] = useState(null)
    const [addingFlow, setAddingFlow] = useState(null)
    const [addingBaloon, setAddingBaloon] = useState(null)
    const [flowReserve, setFlowReserve] = useState(null)
    const [baloonReserve, setBaloonReserve] = useState(null)

    return(
      <GlobalContext.Provider value={{
        user, setUser, vault, setVault, update, setUpdate,
        addingFlow, setAddingFlow, addingBaloon, setAddingBaloon,
        flowReserve, setFlowReserve, baloonReserve, setBaloonReserve
      }} >
        {props.children}
      </GlobalContext.Provider>  
    )
}
