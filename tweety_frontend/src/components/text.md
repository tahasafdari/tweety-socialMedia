import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assests/a.png";
import logoImg from "../assests/t.png";
import jwt_decode from "jwt-decode";

import { client } from "../client";

const Login = () => {
const navigate = useNavigate();
const responseGoogle = (response) => {
var profileObj = jwt_decode(response.credential);
localStorage.setItem("user", JSON.stringify(response));
const { clientId, name, imageUrl } = response;
const doc = {
\_id: clientId,
\_type: "user",
userName: name,
image: imageUrl,
};

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });

};
return (
<div className="flex justify-start items-center flex-col h-screen">
<div className="relative w-full h-full">
<img
          src={backgroundImg}
          alt="background"
          className="w-full h-full object-cover"
        />
<div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
<div className="p-5">
<img src={logoImg} width="50px" alt="logo" />
</div>
<div className="shadow-2xl ">
<GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
</div>
</div>
</div>
</div>
);
};

export default Login;
