import Add from '../components/Add';
import Navbar from '../components/Navbar';
import Tomorrow from '../components/Tomorrow';
import banner from '../images/banner.jpg';
import styles from '../styles/Home.module.css';
import config from '../config.js';
import React, { useState, useEffect} from "react";
import axios from "axios";

function Home() {
    const [assignments, setAssignments] = useState(null);
    const [refresh, setRefresh] = useState(false);
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
            
            const response = await axios.post(config.server_address+"/assignment");
            setAssignments(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        };

        fetchAssignments();
    }, [refresh]);

    return (
        <div className={styles.container}>
            <script
          src="https://kit.fontawesome.com/1a2b716621.js"
          crossorigin="anonymous"
          
        ></script>
        <Navbar />
        <Tomorrow assignments={assignments} loading={loading} error={error}/>
        <Add setRefresh={setRefresh}/>
        </div>
    );
}

export default Home;