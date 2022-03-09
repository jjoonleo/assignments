import React, { useState, useEffect } from "react";
import styles from "../styles/Tomorrow.module.css";
import axios from "axios";
import Item from "../components/Item";

function Assignments({type}){
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
            const response = await axios.post("http://ejun.kro.kr:8000/assignment");
            setAssignments(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        };

        fetchAssignments();
    },[]);
    console.log(error);
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
    let title;
    if(type == "homeworks"){
        title = "숙제";
    }else if(type == "supplies"){
        title = "준비물";
    }

    return (
        <span className={styles.tomorrow}>
            <h1 className={styles.title}>{title}</h1>
            {assignments.map((assignment) => {
                console.log(assignment);
                let date = new Date(assignment.date);
                if(assignment.type == type && date > new Date()){
                return <Item assignment={assignment} />;}
            })}
        </span>
    );
}

export default Assignments;
