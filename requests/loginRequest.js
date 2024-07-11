import axios from "axios"


let option={
    method:'',
    headers:{
        "Content-Type":"application/json"
    },
}


export const loginRequest=async (user)=>{
    option.method="POST";
    option.url="http://localhost:5100/api/auth/login";
    option.data=JSON.stringify(user);
    return axios(option);
}