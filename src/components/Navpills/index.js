import React from "react";

// create the score card at the top of the page
const Navpills = props => (
    <div>
        <ul className="nav nav-pills nav-justified">
            <li><a href="/">Friends Clicky Game</a></li>
            <li
                className={props.message.indexOf('incorrectly') !== -1 ? 
                    "desc-incorrect" : 
                    props.message.indexOf('correctly') !== -1 ?
                        "desc-correct" :
                        "desc-normal"}
            >
                {props.message}
            </li>
            <li>Score:  <span style={{color: "black"}}> {props.curScore}</span> | Top Score: {props.topScore}</li>
        </ul>
    </div>
);

export default Navpills;
