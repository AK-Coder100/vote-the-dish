import { useRef,useState,useEffect,createContext } from "react";
import {useNavigate} from 'react-router-dom' 
import users from './users.json'

const AuthContext = createContext({})

const Login=()=>{
    
    const userRef=useRef()
    const errRef=useRef()

    const navi=useNavigate()

    const [user,setUser]=useState('')
    const [pwd,setPwd]=useState('')
    const [errMsg,setErrMsg]=useState('')

    
    if(JSON.parse(localStorage.getItem('users'))===null){
        users.map((elel)=>{
            return elel.rate=[null,null,null,null,null,null]
        })
    
        localStorage.setItem('users',JSON.stringify(users))
    }
    
    useEffect(()=>{
        userRef.current.focus();
    },[])
    const handleSubmit=async (e)=>{
        e.preventDefault();
        JSON.parse(localStorage.getItem('users')).forEach((elem)=>{
            if (elem.username===user && elem.password===pwd){
                localStorage.setItem('user',JSON.stringify(elem) )
                navi('/profile')
                }else{setErrMsg('Incorrect credentials')}
            })
        setUser('')
        setPwd('')
    }

    return(<>
        <section className="loginFormContainer" >
            <h1>Sign in</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="username" >Username:</label>
                <input 
                    type='text' 
                    id='username'
                    placeholder="🖋 user name" 
                    ref={userRef} 
                    value={user} 
                    onChange={(e)=>setUser(e.target.value)} 
                    required />
                <label htmlFor="password" >Password:</label>
                <input 
                    type='password' 
                    id='password' 
                    placeholder="🖊 password" 
                    value={pwd} 
                    onChange={(e)=>setPwd(e.target.value)} 
                    required />
                <span ref={errRef} className={errMsg? "errMsg" : "offscreen" } aria-live='assertive'>{errMsg}</span>
                <button>Login</button>

            </form>
        </section>
        </>
    )
}

export default Login;
export {AuthContext }