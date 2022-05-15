import React, { useEffect, useState } from 'react'
import Header from '../Header-Footer/Header'
import registerlogo from '../assets/image/registerlogo.jpg'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';
import Footer from '../Header-Footer/Footer'


const Signup = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        cpassword: ''

    })

    const [errormessage, setErrormessage] = useState(null)

    let { fname, lname, email, phone, gender, password, cpassword, username } = data;

    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const validationcommon = (value, type) => {

        switch (type) {

            case 'string': {
                if (value) {
                    const strings = /^[a-zA-Z]{2,20}$/;
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'username': {
                if (value) {
                    if (value && value.trim()) {
                        return true;
                    }

                    else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'email': {
                if (value) {
                    const strings = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }


            case 'number': {
                if (value) {
                    const strings = /^(\+\d{1,3}[- ]?)?\d{10}$/
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }


            case 'password': {
                if (value) {
                    if (value && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'cpassword': {
                if (value) {
                    console.log(password, "password");
                    if (value && value === password && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            default:
                break;
        }

    }

   

    //in this function we call validation common function to set error message
    const keyupValdation = (e, type) => {
        const { name, value } = e.target
        const res = validationcommon(value, type)
        let error
        if (res === 'empty') {
            error = "* Enter your " + name
            return error;

        } else if (res === false) {
            error = "* Enter your valid " + name
            return error;
        }
    }


    //this function is used to show error by clicking on tab
    const onKeyDown = (e, type) => {
        if (e.key === "Tab") {
            const { name, value } = e.target
            keyupValdation(e, type)
            setData({
                ...data, [name]: value
            })
            usernamevalidation(e)

            let error = keyupValdation(e, type)
            if (error) {
                e.preventDefault();

                setErrormessage({ ...errormessage, [name]: error })
                return error;
            } else {
                setErrormessage({ ...errormessage, [name]: '' })
                return error;

            }
        }
    };
    const update = (e, type) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setData({
            ...data, [name]: value
        })
        usernamevalidation(e)
        let error = keyupValdation(e, type)
        if (error) {
            setErrormessage({ ...errormessage, [name]: error })
            return error;
        } else {
            setErrormessage({ ...errormessage, [name]: '' })
            return error;

        }
    }

    const [usercollection, setUsercollection] = useState(null)

    useEffect(() => {
        Axios.get("http://localhost:8080/fetch/usercollection")
            .then(res => {
                setUsercollection(res.data.usercollection)


            })
            .catch(err => {
                console.log("error has occured while insert new member : " + err)
                message.error("Error while create account")
            })

    }, [])

    const [usernameerror, setusernameerror] = useState(null)

    const usernamevalidation = (e) => {
        if (usercollection) {
            for (let i = 0; i < usercollection.length; i++) {

                if (usercollection[i].username === data.username) {
                    setusernameerror("Username is already exist.")

                }
                else {
                    setusernameerror(null)
                }
            }
        }
    }


    const submit = () => {
        // e.preventDefault();
        if (errormessage.cpassword != "" ||
            errormessage.email != "" ||
            errormessage.fname != "" ||
            errormessage.lname != "" ||
            errormessage.password != "" ||
            errormessage.phone != "" ||
            errormessage.username != "" ||
            usernameerror != null) {
            // alert("Filled the all input fields")
            message.error("Fill all the Input field")
        }
        else {
            Axios.post("http://localhost:8080/insert/registerUser", {
                'fname': data.fname,
                'lname': data.lname,
                'email': data.email,
                'phone': data.phone,
                'username': data.username,
                'password': data.password
            })
                .then(res => {
                    console.log(res.data.data)
                    message.success('Account created successfully.');
                    navigate("/login")

                })
                .catch(err => {
                    console.log("error has occured while insert new member : " + err)
                    message.error("Error while create account")
                })

        }

    }

   
    return (
        <>


            <div className='registrationform'>
                {/* Header */}
                <Header></Header>

                {/* register form start here */}
                <div className="container">
                    <div className="row row-no-gutters" id='registerform'>
                        <div className="col-6 m-0 p-0" id='registerlogoimage'>
                            <img src={registerlogo}></img>
                        </div>
                        <div className="col-6 m-0 p-0">
                            <div method='post' encType="multipart/form-data" className='registrationformuserdetails'>

                                <div class="form-group">
                                    <label>First Name <span>*</span></label>

                                    <input type="text"
                                        id='fname'
                                        onChange={(e) => update(e, 'string')}
                                        name="fname"
                                        value={data.fname}
                                        placeholder="Enter First name"
                                        className="fname"
                                        onKeyDown={(e) => onKeyDown(e, 'string')}

                                    />
                                    {errormessage && errormessage.fname !== '' ? <p className='errormessage'>{errormessage.fname}</p> : null}

                                </div>


                                <div class="form-group">
                                    <label>Last Name <span>*</span></label>

                                    <input type="text"
                                        id='lname'
                                        onChange={(e) => update(e, 'string')}
                                        name="lname"
                                        value={data.lname}
                                        placeholder="Enter Last name"
                                        className="lname"
                                        onKeyDown={(e) => onKeyDown(e, 'string')}

                                    />
                                    {errormessage && errormessage.lname !== '' ? <p className='errormessage'>{errormessage.lname}</p> : null}

                                </div>

                                <div class="form-group">
                                    <label>UserName <span>*</span></label>
                                    <input type="text"
                                        id='username'
                                        onChange={(e) => update(e, 'username')}
                                        name="username"
                                        value={data.username}
                                        placeholder="Enter Username"
                                        className="username"
                                        onKeyDown={(e) => onKeyDown(e, 'username')}

                                    />
                                    {errormessage && errormessage.username !== '' ? <p className='errormessage'>{errormessage.username}</p> : null}
                                    {usernameerror && usernameerror != null ? <p className='errormessage'>{usernameerror}</p> : null}
                                </div>

                                <div class="form-group">

                                    <label>Email <span>*</span></label>

                                    <input type="email"
                                        id='email'
                                        onChange={(e) => update(e, 'email')}
                                        name="email"
                                        value={data.email}
                                        placeholder="Enter Email Address"
                                        className="email"
                                        onKeyDown={(e) => onKeyDown(e, 'email')}

                                    />
                                    {errormessage && errormessage.email !== '' ? <p className='errormessage'>{errormessage.email}</p> : null}

                                </div>

                                <div class="form-group">
                                    <label>Phone number <span>*</span></label>
                                    <input type="text"
                                        id='phone'
                                        onChange={(e) => update(e, 'number')}
                                        name="phone"
                                        value={data.phone}
                                        placeholder="Enter phone number"
                                        className="num"
                                        onKeyDown={(e) => onKeyDown(e, 'number')}

                                    />
                                    {errormessage && errormessage.phone !== '' ? <p className='errormessage'>{errormessage.phone}</p> : null}

                                </div>


                                <div class="form-group">
                                    <label>Password <span>*</span></label>
                                    <br></br>

                                    <input type={passwordType}
                                        id='password'
                                        onChange={(e) => update(e, 'password')}
                                        name="password"
                                        //  value={data.phone}
                                        placeholder="Enter password here"
                                        className="pasword"
                                        onKeyDown={(e) => onKeyDown(e, 'password')}

                                    />
                                    <button className="btn" id='passwordhide' onClick={togglePassword}>
                                        {passwordType === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                    </button>
                                    {errormessage && errormessage.password !== '' ? <p className='errormessage'>{errormessage.password}</p> : null}

                                </div>

                                <div class="form-group">
                                    <label>Confirm Password <span>*</span></label>
                                    <br></br>

                                    <input type={passwordType}
                                        id='cpassword'
                                        onChange={(e) => update(e, 'cpassword')}
                                        name="cpassword"
                                        //  value={data.phone}
                                        placeholder="Enter Confirm password here"
                                        className="cpasword"
                                        onKeyDown={(e) => onKeyDown(e, 'cpassword')}

                                    />
                                    <button className="btn  " id='passwordhide' onClick={togglePassword}>
                                        {passwordType === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                    </button>

                                    {errormessage && errormessage.cpassword !== '' ? <p className='errormessage'>{errormessage.cpassword}</p> : null}


                                </div>

                                <button type="button "

                                    onClick={submit}
                                    className="sub btn btn-primary">Create Account</button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Footer start here */}
            <Footer></Footer>
        </>
    )
}

export default Signup