import React, {useEffect} from 'react'
import '../styles/Result.css'
import {Link} from "react-router-dom";
import ResultTable from "./ResultTable";
import {useDispatch, useSelector} from "react-redux";
import {resetAllAction} from "../redux/question_reducer";
import {resetResultAction} from "../redux/result_reducer";
import {attempts_Number, earnPoints_Number, flagResult} from "../helper/helper";
import { usePublishResult } from '../hooks/setResult.js';
export default function Result() {
    const dispatch = useDispatch()
    const {questions: {queue, answers},result:{result, userId}} = useSelector(state => state)


    const totalPoints = queue.length * 10;
    const earnPoints = earnPoints_Number(result,answers,10)
    const flag = flagResult(totalPoints,earnPoints)
 
    usePublishResult({
        result,
        username : userId,
        points: earnPoints,
        achived : flag ? "Успішно" : "Не Успішно" ,});

    console.log({result, username:userId,  points:earnPoints, achived:flag ? "Успішно" : "Не успішно",})

    function onRestart() {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
    return (
        <div className='container'>
            <h1 className='title text-light'>Опитування</h1>

            <div className="result flex-center">
                <div className="flex">
                    <span>Ім'я</span>
                    <span className='bold'>{userId}</span>
                </div>
                <div className="flex">
                    <span>Максимальна кількість балів : </span>
                    <span className='bold'>{totalPoints || 0 }</span>
                </div>
                <div className="flex">
                    <span>Кількість запитань : </span>
                    <span className='bold'>{queue.length || 0 }</span>
                </div>
    
                <div className="flex">
                    <span>Кількусть набраних балів: </span>
                    <span className='bold'>{earnPoints || 0 }</span>
                </div>
                <div className="flex">
                    <span>Результат опитування : </span>
                    <span style={{color:`${flag ? "green" : "red"}`}} className='bold'>{flag ? "Пройдено" : "Не пройдено"}</span>
                </div>
            </div>

            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Спробувати ще раз</Link>
            </div>
        </div>
    )
}