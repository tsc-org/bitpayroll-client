import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
import landing from "../assets/landing.svg";


export default function Home() {
    return (
        <div>
            <Link to ="work-in-progress"><img src={landing} alt="Landing Dummy"/></Link>
        </div>
    );
    }