import Todo from "../components/Todo";
import styles from "../styles/Tomorrow.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tommorow from '../components/Todo';
let today = new Date();
let tomorrow = new Date();
if(today.getHours() > 8){
    tomorrow.setDate(today.getDate() + 1);
}

tomorrow.setHours(0);
tomorrow.setMinutes(0);
tomorrow.setSeconds(0);
const Tomorrow = ({assignments, loading, error}) => {
    
    if (loading){
        return (
            <span className={styles.tomorrow}>
                <h1>로딩 중...</h1>
            </span>
        );
    }
    if (error){
        return (
            <span className={styles.tomorrow}>
                <h1>에러가 발생했습니다</h1>
            </span>
        );
    }
    if (!assignments) return null;
    return (
        <span className={styles.tomorrow}>
            <h1 className={styles.title}>내일 까지 할일</h1>
            {assignments.map((assignment) => {
                assignment.date = new Date(assignment.date);
                if(assignment.date.getYear() == tomorrow.getYear() && 
                assignment.date.getMonth() == tomorrow.getMonth() && 
                assignment.date.getDate() == tomorrow.getDate()){ 
                    return <Todo assignment={assignment} />;
                }
            })}
        </span>
    );
};

export default Tomorrow;
