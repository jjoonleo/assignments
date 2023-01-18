import styles from '../styles/Seat.module.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config.js";

const Seat = ({id, isTaken, student = "", my=false, onChange}) => {
    let stat = isTaken?styles.taken:styles.notTaken;
    if(my){
        stat = styles.my;
    }

    function onClick(){
        onChange(id);
    }

    return (
        <button className={styles.seat} id={stat} onClick={onClick}>
            {student}
        </button>
    );
};

export default Seat;