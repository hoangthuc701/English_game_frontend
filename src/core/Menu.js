import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout,isAuthenticate} from '../auth/index'
const isActive = (history,path) =>{
    if (history.location.pathname === path) return {color: "#ff9900"}
    return {color:"#ffffff"}
}



const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history,"/")} >Home</Link>
            </li>    
          


            {(!isAuthenticate())&&(
                <React.Fragment>
                     <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={isActive(history,"/signin")}>Sign In</Link>
                    </li>    
      
       
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={isActive(history,"/signup")}>Sign Up</Link>
                    </li>    
                </React.Fragment>
            )}
        
           {(isAuthenticate())&&(
               <React.Fragment>

                <li className="nav-item">
                    
                        <Link  className="nav-link" 
                                style={(isActive(history,`/user/${isAuthenticate().user._id}`))}
                        >
                            {`${isAuthenticate().user.name}`}
                        </Link>
                       
                </li>       
                <li className="nav-item">
                    <a 
                    className="nav-link"  
                    style={(isActive(history,"/signout"),{cursor:"pointer", color:"#fff"})} 
                    onClick={()=>signout(()=>history.push("/"))}
                    >Sign Out</a>
                </li>    
               </React.Fragment>
           )}
        </ul>
    </div>
)
export default withRouter(Menu);