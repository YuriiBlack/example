import React, {useRef} from 'react'
import {Link, useNavigate} from "react-router-dom";
import '../styles/Main.css'
import {useDispatch} from "react-redux";
import {setUserId} from "../redux/result_reducer";

export default function Main() {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    
    function startQuiz() {
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

    const handleRedirect = () => {
      window.open('https://dovidka.info/yak-diyaty-v-razi-zastosuvannya-brudnoyi-bomby-yadernoyi-ataky-chy-avariyi-na-aes/', '_blank');
    };


    const handleRedirectLink__2 = () => {
      window.open('https://dovidka.info/yak-diyaty-pid-chas-ataky-iz-zastosuvannyam-himichnoyi-zbroyi/#messages', '_blank');
    };

    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/quiz');
    };
  return (
      <div className='container'>
        <h1 className='title text-light'>Опитування</h1>

        <ol>
          <li>Опитування складається з 10 запитань.</li>
          <li>Кожне правильне запитання - 10 балів.</li>
          <li>До кожного запитання представленно, 3 опції і тільеи 1 правильне.</li>
          <li onClick={handleRedirect} className='redirect'>Ознайомитися з матеріалом по ядерній небезпеці.</li>
          <li onClick={handleRedirectLink__2} className='redirect'>Ознайомитися з матеріалами по хімічні небезпеці</li>
        </ol>

        <form id="form">
          <input  ref={inputRef} className="userid" type="text" placeholder="Ім'я*" />
        </form>

        <div className='start'>
          <Link className='btn' to={'quiz'} onClick={startQuiz} onClickbtn={handleClick}>Почати</Link>
        </div>
       
      </div>
  )
}
