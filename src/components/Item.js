import styles from '../styles/Item.module.css';
import axios from "axios";
import config from "../config.js";

const Item = ({assignment, deleteAssignment}) => {
    
    let today = new Date();
    let date = new Date(assignment.date);
    let dateString;
    if(date.getDate() == today.getDate()+1){
        dateString = "내일";
    }else if(date.getDate() == today.getDate()+2){
        dateString = "모레";
    }
    else{
        dateString = date.getMonth() + "월 " + date.getDate() + "일";
    }

    async function handleDeletion(){
        let data;
        try {
            data = await axios.post(config.server_address+"/assignment_delete",{id: assignment._id});
        } catch {
        }
        deleteAssignment(assignment._id);
    }

    return (
        <ul className={styles.item}>
            <li className={styles.date}>
                <h5>{dateString}</h5>
            </li>
            <li className={styles.subject}>
                <h5>{assignment.subject}</h5>
            </li>
            <li className={styles.description}>
                <h5>{assignment.description}</h5>
            </li>
            <button onClick={handleDeletion}>
                <h5>삭제</h5>
            </button>
        </ul>
    );
};

export default Item;