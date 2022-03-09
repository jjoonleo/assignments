import styles from '../styles/FacilitySummary.module.css';

function FacilitySummary(){
    return(
        <div className={styles.container}>
            <div className={styles.office_container}>
                <h1>Danbak<br/>Office</h1>
                <ul className={styles.office_item}>
                    <li className={styles.fifthFloor_container}>
                        <div className={styles.floor}>5F</div>
                        
                        <div className={styles.facility}>Study Zone</div>
                    </li>
                    <hr />
                    <li className={styles.fourthFloor_container}>
                        <div className={styles.floor}>4F</div>
                        <div className={styles.facility}>Study Zone</div>
                    </li>
                </ul>
            </div>
            <hr />
            <div className={styles.studycafe_container}>
                <h1 className={styles.studycafe}>Danbak<br/>Study Cafe</h1>
                <ul className={styles.studycafe_item}>
                    <li className={styles.thirdFloor_container}>
                        <div className={styles.floor}>3F</div>
                        <div className={styles.facility}>Study Zone</div>
                    </li>
                    <hr />
                    <li className={styles.secondFloor_container}>
                        <div className={styles.floor}>2F</div>
                        <div className={styles.facility}>Study Zone</div>
                    </li>
                    <hr />
                    <li className={styles.fistFloor_container}>
                        <div className={styles.floor}>B1</div>
                        <div className={styles.facility}>Cafe & Notebook Zone</div>
                    </li>
                    <hr />
                    
                </ul>
            </div>
        </div>
    );
}

export default FacilitySummary;