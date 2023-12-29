import { useState } from "react";
import { languages } from "../types";
import {motion} from 'framer-motion'
type tselector = {
    selectorState:languages
    change:React.Dispatch<React.SetStateAction<languages>>
}
const selectorAnimations = {
    closed: {
        scale:0
    },
    open: {
        scale:1
    }
}
export const Selectors = ({selectorState,change}:tselector) =>{
    const [isActive,setActive] = useState(false)
    return(
        <div className="w-full h-full relative font-Lexend text-slate-50 bg-slate-800 rounded-md">
            <div onClick={() => {setActive(!isActive)}} className="w-full h-full flex items-center justify-center font-Lexend relative">{Object.keys(languages)[Object.values(languages).indexOf(selectorState)]}<i className={`${isActive ? "bi bi-caret-up" : "bi bi-caret-down"} absolute right-2`}></i></div>
            <motion.div 
            variants={selectorAnimations}
            initial={"closed"}
            animate = {isActive ? "open": "closed"}
            className="w-full absolute z-40 max-h-52 overflow-y-auto my-1 rounded-sm flex flex-col items-center bg-slate-800 ">
                {
                    Object.values(languages).map((elem,key)=>{
                        return(
                            <div key={key} onClick={()=> {
                                change(elem as languages)
                                setActive(!isActive)
                            }}>{elem}</div>
                        )
                    })
                }
            </motion.div>
        </div>
    )
}