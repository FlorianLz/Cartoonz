import React from "react";

function Login()  {

    return (
        <div>
            <h2> Sign in</h2>
            <form action="#">
                <input type={"text"} placeholder={"Username"} name={"name"}/>
                <input type={"password"} placeholder={"Password"} name={"password"}/>
                <input type={"submit"} value={"login"}/>
            </form>
            <p> Not registered ? Click <a href={"./register"}> here </a> to register. </p>
        </div>

    );
}

export default Login;