import { NextResponse } from "next/server";

export async function POST(req){
    const {username, password, email, fullName} = await req.json();

    const response = await fetch(`${process.env.API_URL}/auth/register`, {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({username,password,email,fullName}),
    });

    if (response.status !==200) throw new Error("Failed to register user");
    const responseData = await response.json();

    if(responseData.statusCode === 201) return NextResponse.json(responseData);
}