import {  useEffect,useState } from "react"
import {useNavigate} from 'react-router-dom' 
import  db from './db.json'
import './Login'



const Profile =()=>{
    const navigate =useNavigate()
    const [rate,rating]=useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).rate:[])
    // let rate=[null,null,null]
    if(JSON.parse(localStorage.getItem('db'))===null){
            db.map((elel)=>{
                return elel.rate=0
            })
            localStorage.setItem('db',JSON.stringify(db))
    }
    
    
    const saveVote=()=>{
        const preRate=JSON.parse(localStorage.getItem('user')).rate
        // db is updating
        for (let i=0;i<3;i++) {
            if (preRate[2*i]===rate[2*i]  ){
                continue
            }else{
                const jt = JSON.parse(localStorage.getItem('db')).map((e)=>{
                    if (rate[(2*i)]===e.id){
                        e.rate=e.rate+(30-(10*i))
                    }
                    if (preRate[2*i]===e.id){
                        e.rate=e.rate-(30-(10*i))
                    }
                    return e
                })
                localStorage.setItem('db',JSON.stringify(jt))
            }
            
        }
        // updating users
        const jt = JSON.parse(localStorage.getItem('users')).map((e)=>{
            if (JSON.parse(localStorage.getItem('user')).username===e.username){
                e.rate=rate
            }
            return e
        })
        localStorage.setItem('users',JSON.stringify(jt))
        localStorage.setItem('user',JSON.stringify({...JSON.parse(localStorage.getItem('user')),'rate':rate}))
        navigate('/result')

        
    }
    const rate_handler = (id,dishName,rank)=>{
        for (let i=0;i<3;i++){
            if (rate[(2*i)]===id){
                rate[(2*i)+1]=rate[(2*rank)+1]
                rate[(2*i)]=rate[(2*rank)]
                rate[(2*rank)+1]=dishName
                rate[(2*rank)]=id
            }
        }
        rate[(2*rank)+1]=dishName
        rate[(2*rank)]=id
        rating([...rate])
    }
     

    useEffect(()=>{
        if (JSON.parse(localStorage.getItem('user'))===null){navigate('/')}}
        ,[])
    return ( 
        <>
            <header><span> vote your dish</span>
                <button  type="button"
                    onClick={()=>{ localStorage.removeItem('user');navigate('/') }}>logout
                </button>
            </header>
            <section>
                <p>1<sup>st</sup> dish ---- {rate[1]===null?'Please vote your dish':rate[1]} </p>
                <p>2<sup>nd</sup> dish ---- {rate[3]===null?'Please vote your dish':rate[3]}  </p>
                <p>3<sup>rd</sup> dish ---- {rate[5]===null?'Please vote your dish':rate[5]}  </p>
                <button onClick={saveVote}>Submit</button>
            </section >
            <section className="card-container">
                {db.map((elem,ind)=>{
                    return (<div className="card" key={ind}>
                                    <img src={elem.image} alt="can't load"></img>
                                    <h2>{elem.dishName}</h2>
                                    <span>{elem.description}</span>
                                    <div className="rate-div">
                                        <button className="rate_one" onClick={()=>{rate_handler(elem.id,elem.dishName,0)}}>1</button>
                                        <button className="rate_two"  onClick={()=>{rate_handler(elem.id,elem.dishName,1)} }>2</button>
                                        <button className="rate_three"  onClick={()=>{rate_handler(elem.id,elem.dishName,2)}}>3</button>
                                    </div>
                            </div>)
                })}
            </section>
            
        </>
    )
}

export default Profile