"use client";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, TextField,Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { loginRequest } from "@/requests/loginRequest";
import {getSession, signIn} from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const session = getSession();
  useEffect(()=>{
    session.then(s=>{
      if(s){
        location.href="/Chat";
      }
    })
  },[]);
  function handleSubmit(e){
    e.preventDefault();
    
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    signIn("credentials",{
      username, password, redirect:false
    }).then(res=>{
      if(res.ok){
        location.href="/Chat";
      }else if(res.error){
        console.log(res.error);
        setError(res.error);
      }
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        height="100vh"
        direction="column"
        container
        justifyContent="center"
        alignItems="center"
        rowGap={2}
      >
        <Grid
          xs={3}
          height={"30vh"}
          style={{
            textAlign: "center",
            backgroundImage: 'url("images/FurkanChatApp.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
          }}
        ></Grid>
        <Grid xs={3}>
          <h1>Chat App Login Page</h1>
        </Grid>
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
          />
        </Grid>
        {error &&<Grid xs={3}>
        <Alert severity="error">{error}</Alert>
        </Grid>}
        
        <Grid xs={3}>
          <Button
            variant="contained"
            color="primary"
            label="Log In"
            fullWidth
            type="submit"
          >
            Log In
          </Button>
          <Link href="/register">Register</Link>
        </Grid>
      </Grid>
    </form>
  );
}