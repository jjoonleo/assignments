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
let students = new Array();
let createSeats;

function Teacher() {
  const [isTaken, setIsTaken] = useState(new Array(36).fill(false));
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    tmp = isTaken;

    const fetchSeats = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.post(config.server_address+"/get_seats");
        response.data.forEach((seat,index )=> {
          tmp[index] = seat.isTaken;
          students.push(seat.student);
        });
        setIsTaken({...tmp});
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchSeats();

    createSeats = async () => {
      let response;
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        response = await axios.post(config.server_address+"/create_seats");
        if(response.data.success){
          socket.emit("start");
          setStarted(true);
        }
        tmp.fill(false);
        students.fill("");
        setIsTaken({...tmp});
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

    

    pre = -1;
    socket.emit('message', "hi");
    socket.emit("enter");
    socket.emit("isStarted");
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
      setStarted(true);
      fetchSeats();
    });


  }, [])

  function onChange(id){
    if(tmp[id]){
      tmp[id] = false;
      students[id] = "";
      socket.emit("changed", id, false, "");
      setIsTaken({...tmp});
    }
  }

  let onStart = () => {
    
    createSeats();
    
  }

  function onStop(){
    socket.emit("stop");
    setStarted(false);
  }


  function makeLine(start){
    const options = [];
    for (let i = start; i < start + 6; i++) {
      options.push(<Seat id={i} isTaken={isTaken[i]} student={students[i]} onChange={onChange}/>);
    }
    return(
      <div className={styles.line}>
        {options}
      </div>
    );
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


  return (
    
    <span className={styles.container}>
      <Navbar />
      
      {(()=>{
        if(!started){
          return(<button className={styles.startStop} onClick={onStart}>시작하기</button>);
        }else{
          return(<button className={styles.startStop} onClick={onStop}>멈추기</button>);
        }
      })()}
      
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

export default Teacher;
