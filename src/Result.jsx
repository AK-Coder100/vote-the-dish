import {useNavigate} from 'react-router-dom' 
import { useEffect } from 'react'

const Result=()=>{
    const navigate=useNavigate()

    localStorage.setItem('db',JSON.stringify((JSON.parse(localStorage.getItem('db')).sort((a,b)=>{
            return b.rate-a.rate
    })))) 

    useEffect(()=>{ 
        if (JSON.parse(localStorage.getItem('user'))===null){
            navigate('/')
        }
    },[])

    return (< >
            <header >
                <span> Poll Result Is Here</span>
                <button  type="button"
                    onClick={()=>{ localStorage.removeItem('user');navigate('/') }}>logout
                </button>
            </header>
        <section className="result-sec">
            <h1>Poll Result</h1>  
            <p>1st dish -------- {JSON.parse(localStorage.getItem('db'))[0].dishName} </p>
            <p>2nd dish -------- {JSON.parse(localStorage.getItem('db'))[1].dishName} </p>
            <p>3rd dish -------- {JSON.parse(localStorage.getItem('db'))[2].dishName} </p>
        </section>
        {localStorage.getItem('user')?
        <section className="selection-show">
        <h1>Your chooice</h1>
            <p>1st dish -------- {JSON.parse(localStorage.getItem('user')).rate[1]!=null?JSON.parse(localStorage.getItem('user')).rate[1]:"No selection" }  </p>
            <p>2nd dish -------- {JSON.parse(localStorage.getItem('user')).rate[3]!=null?JSON.parse(localStorage.getItem('user')).rate[3]:"No selection"}  </p>
            <p>3rd dish -------- {JSON.parse(localStorage.getItem('user')).rate[5]!=null?JSON.parse(localStorage.getItem('user')).rate[5]:"No selection"}  </p>
            <button onClick={()=>{navigate('/profile')}}>Edit Selection</button>
        </section>:<h1></h1>}
        </>
    )
}

export default Result