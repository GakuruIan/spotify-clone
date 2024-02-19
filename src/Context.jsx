import { createContext,useState } from "react";


export const MenuContext = createContext()


export const MenuProvider =({children})=>{
    const [isOpen,setIsOpen] = useState(false)

    const toggleMenu = (value)=>{
        setIsOpen(value)
    }
    return (
        <MenuContext.Provider value={{isOpen,toggleMenu}}>
          {children}
        </MenuContext.Provider>
    )
}