import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const URL = window.location.pathname;
  const [usercollection, setUsercollection] = useState("")

  useEffect(()=>{
    if(sessionStorage.length != 0)
    {setUsercollection({
      "Username" : sessionStorage.getItem("UserName"),
      "token" : sessionStorage.getItem("token"),
      "fname" : sessionStorage.getItem("First_Name"),
      "lname" : sessionStorage.getItem("Last_Name"),

    })}
    else{
      setUsercollection("")
    }
  },[])

  const logoutuser =() => {
    sessionStorage.clear()
    setUsercollection("")

  }
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#"> <i class="fa-solid fa-house-user"></i>AG SOCIAL BLOG</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
{usercollection === "" ? 
          <ul className="navbar-nav mr-auto">
            {URL && URL === "/signup" ?
              <span>
                <NavLink className="navbar-item" to="/" exact ><i className="fa fa-home"></i> Home </NavLink>
                <NavLink className="navbar-item" to="/login" exact> <ion-icon name="log-in-outline"></ion-icon> Login</NavLink></span> :
              <span>{URL && URL === "/login" ?
                <span>
                  <NavLink className="navbar-item" to="/" exact ><i className="fa fa-home"></i> Home </NavLink>
                  <NavLink className="navbar-item" to="/signup" exact><ion-icon name="arrow-redo-circle-outline"></ion-icon>Sign Up </NavLink>
                </span> :
                <span>
                  <NavLink className="navbar-item" to="/" exact ><i className="fa fa-home"></i> Home </NavLink>
                  <NavLink className="navbar-item" to="/signup" exact><ion-icon name="arrow-redo-circle-outline"></ion-icon>Sign Up </NavLink>
                  <NavLink className="navbar-item" to="/login" exact> <ion-icon name="log-in-outline"></ion-icon> Login</NavLink>
                </span>}</span>}

            {/* <NavLink className="navbar-item" to="/" exact > Home </NavLink>
            <NavLink className="navbar-item" to="/signup" exact>Sign Up </NavLink>
            <NavLink className="navbar-item" to="/login" exact>  Login</NavLink> */}

          </ul>
          :
          <ul className="navbar-nav mr-auto my-2 my-lg-0 text-right">
            <li className='float-right' ><ion-icon name="person-circle-outline" size="large" id="icon" ></ion-icon></li >

            <li className='float-right' ><h3 className='text-white ml-3  username'>{usercollection.fname} {""} {""} {usercollection.lname}</h3></li >
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <ion-icon name="key-outline"></ion-icon> Account
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#"><ion-icon name="create-outline"></ion-icon>Edit Image</a>
                    <button class="dropdown-item" onClick={() => logoutuser()} ><ion-icon name="log-out-outline"></ion-icon>Logout</button>
                  </div>
                </li>
          </ul>
          }
         
        </div>
      </nav>
    </>
  )
}

export default Header