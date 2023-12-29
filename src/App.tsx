import { useState } from "react"
import { languages } from "./types"
import { Selectors } from "./components/selectors"



function App() {
  const [langFrom,setLangFrom] = useState<languages>(languages.Spanish)
  const [translation,setTranslation] = useState("")
  const [langto,SetLangto] = useState<languages>(languages.English)
  const [translated,setTranslated] = useState("")
  const executeTranslation = async(event:any) =>{
      fetch(`https://api.mymemory.translated.net/get?q=${translation}&langpair=${langFrom}|${langto}`)
      .then(r =>{
        r.json()
        .then(resp =>{
          setTranslated(resp.responseData.translatedText)
        })
      })
  }
  const copyTranslaction = () =>{
    navigator.clipboard.writeText(translated)
    alert("copied")
  }
  const copyToTranslate = () => {
    navigator.clipboard.writeText(translation)
    alert("copied")
  }
  return (
    <>
      <section className="w-screen h-screen flex-col flex items-center justify-center">
          <div className="w-11/12 h-auto md:flex flex-wrap items-center justify-center">
              <div className="w-full md:w-2/5 md:m-10 h-64 p-4 bg-slate-800/75 my-4 rounded-2xl border-2 border-slate-400/10 flex flex-col">
                  <div className="w-full h-1/6 border-b-2 flex border-gray-100/10">
                    <span className="w-2/4 font-Lexend text-slate-400"><i className="bi bi-translate"></i> Translate from</span><div className="w-1/2 h-5/6"><Selectors selectorState={langFrom} change={setLangFrom}></Selectors></div>
                  </div>
                  <textarea className="w-full h-3/5 outline-none border-none bg-transparent p-2 font-Lexend text-slate-400" placeholder="Place a text to translate"  onChange={(ev)=> setTranslation(ev.target.value)}></textarea>
                  <div className="w-full h-1/4 flex items-center relative">
                      <button className="w-1/6 h-4/5 border-2 border-mischka-700 m-2 rounded-full text-slate-400 text-xl"><i className="bi bi-soundwave"></i></button>
                      <button onClick={copyToTranslate} className="w-1/6 h-4/5 border-2 border-mischka-700 m-2 rounded-full text-slate-400 text-xl"><i className="bi bi-copy"></i></button>
                      <span className="font-Lexend text-slate-400">{translation.length}/500</span>
                      <button onClick={executeTranslation}  className="w-1/3 shadow-md font-Lexend text-base z-0 absolute right-2 text-gray-900 shadow-gray-800 rounded-lg bg-sky-500 h-4/5"><i className="bi bi-globe"></i>Translate</button>
                  </div>
              </div>
              <div className="w-full h-64 md:w-2/5 md:m-10 p-4 bg-slate-900/75 my-4 rounded-2xl border-2 border-slate-400/10">
                  <div className="w-full h-1/6 border-b-2 flex border-gray-100/10">
                    <span className="w-2/4 font-Lexend text-slate-400"><i className="bi bi-translate"></i> Translate To</span><div className="w-1/2 h-5/6"><Selectors selectorState={langto} change={SetLangto}></Selectors></div>
                  </div>
                  <p className="w-full h-3/5 text-sm overflow-y-auto p-2 font-Lexend text-slate-400">{translated} ..</p>
                  <div className="w-full h-1/4 flex items-center relative">
                      <button className="w-1/6 h-4/5 border-2 border-mischka-700 m-2 rounded-full text-slate-400 text-xl"><i className="bi bi-soundwave"></i></button>
                      <button onClick={copyTranslaction} className="w-1/6 h-4/5 border-2 border-mischka-700 m-2 rounded-full text-slate-400 text-xl"><i className="bi bi-copy"></i></button>
                  </div>
              </div>  
          </div>
      </section>
    </>
  )
}

export default App
