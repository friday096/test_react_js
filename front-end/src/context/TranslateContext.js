import React from "react";

// import Translate from "../utils/Translate";
import engTranslate from "../utils/English_Translate";
import itTranslate from "../utils/Italian_Translate";
const TranslateContext = React.createContext({})


export const TranslateProvider = (props) =>{
    // const [translate, setTranslate] = React.useState(Translate)
    // const [translateEng, settranslateEng] = React.useState(engTranslate)
    // const [translateIt, settranslateIt] = React.useState(itTranslate)

    const [data, setData] = React.useState(engTranslate)

    // const [language, setLanguage] = React.useState('us')

    // const [translate, setTranslate] = React.useState({Translate})


    const checkLanguage = (val) =>{
        if(val === 'it'){
            // console.log('setLanguage Italian')
            return setData(itTranslate);
        }else{
            console.log('setLanguage English',val)
             return setData(engTranslate);
        }
     
    }

    //Old
    // const translateFunc = (val) =>{

    //     if(language == 'it'){
    //         // console.log('setLanguage Italian')
    //         let find = translate.filter(data => data.english == val)
    //         // console.log('transFunctionContext' , find)
    //         return find[0].Italian;
    //     }else{
    //         // console.log('setLanguage English',val)
    //         let find = translate.filter(data => data.english == val)
    //         // console.log('transFunctionContext' , find)
    //          return find[0].english;
    //     }
       
    // }

    const translateFunc = (val) =>{

       
       
    }

    // console.log('translatedata', translate)
    return (
        <TranslateContext.Provider value={{checkLanguage,translateFunc, data}}>
            {props.children}
        </TranslateContext.Provider>
    )

}


export default TranslateContext; 