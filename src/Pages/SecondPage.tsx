import React, { useEffect } from 'react';
import Posts from '../components/Posts';
import Departments from '../components/Departments';
import { useNavigate } from "react-router-dom";

const SecondPage: React.FC = () => {

    let navigate = useNavigate();

    useEffect(()=>{
        const userData = localStorage.getItem('userData');
        if (!userData){
            navigate("/", { state: { message: "please login first" }})
        }
    })

  return (<>
    <Posts/>
    <Departments/>
  </>);
};



export default SecondPage;