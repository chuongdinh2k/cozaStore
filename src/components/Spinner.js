import React from 'react'
import {Spinner} from 'reactstrap'
function Spinners() {
    return (
        <div>
            <Spinner color="primary"/>
            <p style={{fontSize:"1.6rem"}}>Is loading...</p>
        </div>
    )
}

export default Spinners
