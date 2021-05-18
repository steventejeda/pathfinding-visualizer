import React from 'react'
import '../styles/Node.css'

const Node = ({start, end, row, col}) => {
    //If start is true, add node-start class. Otherwise add node-end start
    const classes = start ? "node-start" : end ? "node-end" : "";
    return (
        <div className={`node ${classes}`} id={`node-${row}-${col}`}>
            
        </div>
    )
}

export default Node
