import Todo from "../components/Todo";
import styles from "../styles/Add.module.css";
import React, { useState, useEffect} from "react";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from 'react-alert'

const Add = ({setRefresh}) => {
    const inputType = useRef(null);
    const inputSubject = useRef(null);
    const inputDate = useRef(null);
    const inputDescription = useRef(null);

    async function onClick() {
        if(inputType.current.value == "" || inputDate.current.value == "" || inputSubject.current.value == "" || inputDescription.current.value == ""){
            alert("모든 항목을 입력해주세요");
            return;
        }else{
            let data;
            try {
                data = await axios.post("http://ejun.kro.kr:8000/assignment_add",{date: inputDate.current.value, subject: inputSubject.current.value, description: inputDescription.current.value, type: inputType.current.value});
            } catch {
            }
            console.log(data);
            if(data.data.success){
                alert("추가되었습니다");
                setRefresh(true);
            }else{
                alert("추가에 실패했습니다");
            }
        }
        
    }
    
    return (
    <div className={styles.add}>
        <h1>추가하기</h1>
        <ul>
            <div>
            <li className={styles.type}>
                <label htmlFor="type">종류</label>
                <select name="type" ref={inputType}>
                    <option value="">선택</option>
                    <option value="homeworks">숙제</option>
                    <option value="supplies">준비물</option>
                </select>
            </li>
            <li className={styles.date}> 
                <label htmlFor="date">날짜</label>
                <input type="date" name="date" ref={inputDate}/>
            </li>
            <li className={styles.subject}>
                <label htmlFor="subject">과목</label>
                <input type="text" name="subject"  ref={inputSubject}/>
            </li>
            <li className={styles.description}>
                <label htmlFor="description">내용</label>
                <input type="text" name="description" ref={inputDescription}/>
            </li>
            </div>
            <button onClick={onClick} className={styles.submit}>
                <h5>추가</h5>
            </button>
            
        </ul>
        
    </div>
  );
};

export default Add;
