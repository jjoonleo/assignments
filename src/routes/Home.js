import Add from '../components/Add';
import Navbar from '../components/Navbar';
import Tomorrow from '../components/Tomorrow';
import banner from '../images/banner.jpg';
import styles from '../styles/Home.module.css';

function Home() {
    let assignments = [{
        "date": "2022.3.8",
        "subject": "수학",
        "description": "어삼쉬사 30문제 풀기",
    },
    {
        "date": "2022.3.8",
        "subject": "수학",
        "description": "어삼쉬사 30문제 풀기",
    },
    {
        "date": "2022.3.8",
        "subject": "수학",
        "description": "어삼쉬사 30문제 풀기",
    },
];
    return (
        <div className={styles.container}>
        <Navbar />
        <Tomorrow/>
        <Add />
        </div>
    );
}

export default Home;