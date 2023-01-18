import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styles from "../styles/Seat.module.css";
import Navbar from '../components/Navbar';
import Seat from '../components/Seat';
import io from 'socket.io-client';
import config from '../config';
import axios from "axios";
import Item from "../components/Item";

const socket = io(config.server_address,{ transports : ['websocket'] });
let pre;
let tmp;
let student;
let fetchSeats;
let students = new Array(36);

function Seats() {
  const [isTaken, setIsTaken] = useState(new Array(36).fill(false));
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    tmp = isTaken;

    fetchSeats = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.post(config.server_address+"/get_seats");
        response.data.forEach((seat,index )=> {
          tmp[index] = seat.isTaken;
          students[index] = seat.student;
          if(seat.student == student){
            pre = index;
          }
        });
        setIsTaken({...tmp});
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };


    const createSeats = async () => {
      let response;
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        response = await axios.post(config.server_address+"/create_seats");
        
        // loading 상태를 true 로 바꿉니다.
        
        setLoading(true);
        
        

      } catch (e) {
        setError(e);
      }
      if(!response){
        alert("오류가 발생했습니다.");
      }
      setLoading(false);
    };

    //createSeats();

    pre = -1;
    socket.emit('message', "hi");
    socket.emit("enter");
    socket.on("changed", (err, id, val, student) => {
      if(err){
        alert("에러가 발생하였습니다.  "+err);
      }else{
      tmp[id] = val;
      students[id] = student;
      setIsTaken({...tmp}); 
      }
    })

    socket.on("start", ()=>{
      setIsStarted(true);
      fetchSeats();
    });

    socket.on("stop", ()=>{
      setIsStarted(false);
    });
    socket.emit("isStarted");
    
  }, [])

  function onChange(id){
    if(!tmp[id]){
      if(pre != -1){
        tmp[pre] = false;
        students[pre] = "";
        socket.emit("changed", pre, false, "")
      }
      socket.emit("changed", id, true, student);
      tmp[id] = true;
      students[id] = student;
      setIsTaken({...tmp});
      pre = id;
    }
  }

  function onLogin(){
    if(student){
      fetchSeats();
      setIsLoggedIn(true);
    }else{
      alert("이름을 입력하세요");
    }
  }

  function onStudentNameChanged(event){
    student = event.target.value;
  }

  if(!isStarted){
    return(
      <div className={styles.container}>
        <Navbar />
        <h1>아직 시작되지 않았습니다.</h1>
      </div>
    )
  }

  if(!isLoggedIn){
    return(
      <div className={styles.container}>
        <Navbar />
        <h2 className={styles.label}>
          이름을 입력하세요.
        </h2>
        <input onChange={onStudentNameChanged} type="text"></input>
        <button className={styles.startStop} onClick={onLogin}>확인</button>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <Navbar />
      <span className={styles.tomorrow}>
        <h1>로딩 중...</h1>
      </span>
      </div>
    );
  }
  if (error) {
    return (
      <span className={styles.tomorrow}>
        <h1>{""+error}</h1>
      </span>
    );
  }

  function makeLine(start){
    const options = [];
    let my = false
    for (let i = start; i < start + 6; i++) {
        if(student == students[i]) my = true;
        options.push(<Seat id={i} isTaken={isTaken[i]} my={my} onChange={onChange}/>);
        my=false;
    }
    return(
      <div className={styles.line}>
        {options}
      </div>
    );
  }

  return (
    
    <span className={styles.container}>
      <Navbar />
      <div className={styles.labelContainer}>
        <h2 className={styles.label}>복도</h2>
        <h2 className={styles.label}>칠판</h2>
        <h2 className={styles.label}>창문</h2>
      </div>
      <div className={styles.matrix}>
        
        {(() => {
          const options=[];
          for(let j = 0; j < 6; j++){
            options.push(makeLine(j*6));
          }
          return options;
        })()}
        
        
      </div>
    </span>
  );
}

export default Seats;
