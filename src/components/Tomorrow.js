import Todo from "../components/Todo";
import styles from "../styles/Tomorrow.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tommorow from '../components/Todo';
let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0);
tomorrow.setMinutes(0);
tomorrow.setSeconds(0);
const Tomorrow = () => {
    const [assignments, setAssignments] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setAssignments(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            
            console.log(tomorrow);
            const response = await axios.post("http://ejun.kro.kr:8000/assignment");
            setAssignments(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        };

        fetchAssignments();
    }, []);
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
                console.log(assignment.date.getDate());
                console.log("tomorrow " + tomorrow.getDate()); 
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
