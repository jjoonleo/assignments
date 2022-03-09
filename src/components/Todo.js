import styles from '../styles/Todo.module.css';

const Tommorow = ({assignment}) => {
    return (
        <div className={styles.todo}>
            <span className={styles.subject}>
                {assignment.subject}
            </span>
            <span className={styles.description}>
                {assignment.description}
            </span>
        </div>
    );
};

export default Tommorow;
