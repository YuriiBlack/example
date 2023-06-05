import {useEffect, useState} from "react";
// import data, {answers} from "../database/data";
import {useDispatch} from "react-redux";
import {getServerData} from "../helper/helper"

import * as Action from "../redux/question_reducer";
export const useFetchQuestion = () =>{
    const [getData,setGetData] = useState({isLoading:false, apiData:[], serverError:null});
    const dispatch = useDispatch();

    useEffect(()=>{
        setGetData(prev => ({...prev, isLoading : true}));



        (async ()=>{
            try {
                // let question = await data;
                const [{questions, answers}] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data)=> data)

                console.log({questions, answers}) 
                if (questions.length > 0){
                    setGetData(prev =>({...prev, isLoading:false}))
                    setGetData(prev =>({...prev, apiData:questions}))

                    dispatch(Action.startExamAction({question:questions, answers}))
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData(prev =>({...prev,isLoading: false}))
                setGetData(prev =>({...prev,serverError: error}))
            }
        })();
    },[dispatch]);

    return [getData,setGetData];
}


export const MoveNextQuestion =() => async (dispach) =>{
    try {
        dispach(Action.moveNextAction());
    } catch (error) {
        console.log(error)
    }
}

export const MovePrevQuestion =() => async (dispach) =>{
    try {
        dispach(Action.movePrevAction());
    } catch (error) {
        console.log(error)
    }
}