import React from "react";

function Login()  {

    return (
        <div className={"log"}>
            <h2> Sign in</h2>
            <form action="#">
                <div className={"infosLog"}>
                    <input type={"text"} placeholder={"Username"} name={"name"}/>
                    <input type={"password"} placeholder={"Password"} name={"password"}/>
                </div>
                <input type={"submit"} value={"login"} className={"buttonLog"}/>
            </form>
            <p> Not registered ? Click <a href={"./register"} className={"lienLog"}> here </a> to register. </p>
        </div>

    );
}

export default Login;