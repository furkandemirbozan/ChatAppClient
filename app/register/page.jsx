"use client";
import { Alert, Button, Link, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

export default function Page() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    const passwordAgain = e.currentTarget.passwordAgain.value;
    const email = e.currentTarget.email.value;
    const fullName = e.currentTarget.fullName.value;
    setError("");
    if(password !== passwordAgain){
        setError("Passwords are not the same");
        return;
    }
    fetch("/api/users", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            username, password, email, fullName
        }),
    }).then(response=>{
        return response.json();
    }).then(data=>{
        setSuccess("");
        if(data && data.statusCode===201){
            setSuccess("User registered successfully")
            location.href="/";
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
            backgroundImage: 'url("images/register.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
          }}
        ></Grid>
        <Grid xs={3}>
          <h1>Chat App Register Page</h1>
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
            label="Email"
            variant="outlined"
            name="email"
            type="email"
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            name="fullName"
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
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password Again"
            variant="outlined"
            type="password"
            name="passwordAgain"
          />
        </Grid>
        {error && (
          <Grid xs={3}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        {success && (
          <Grid xs={3}>
            <Alert severity="success">{success}</Alert>
          </Grid>
        )}
        <Grid xs={3}>
          <Button
            variant="contained"
            color="primary"
            label="Log In"
            fullWidth
            type="submit"
          >
            Register
          </Button>
          <Link href="/register">Register</Link>
        </Grid>
      </Grid>
    </form>
  );
}

































// "use client";
// import { Alert, Button, Link, TextField } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
// import { useState, useRef } from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import "./style.css"; // CSS dosyasını dahil edin

// const theme = createTheme({
//     components: {
//         MuiTextField: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: "#000",
//                     color: "#fff",
//                     transition: "background-color 0.5s, color 0.5s",
//                     "&:hover": {
//                         backgroundColor: "#333"
//                     },
//                     "&:focus-within": {
//                         backgroundColor: "#fff",
//                         color: "#000",
//                     },
//                     "&.Mui-focused": {
//                         backgroundColor: "#fff",
//                         color: "#000",
//                     }
//                 },
//             },
//         },
//     },
// });

// export default function Page() {
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const leftEyeRef = useRef(null);
//     const rightEyeRef = useRef(null);
//     const leftPupilRef = useRef(null);
//     const rightPupilRef = useRef(null);
//     const leftEyelidRef = useRef(null);
//     const rightEyelidRef = useRef(null);

//     function handleSubmit(e) {
//         e.preventDefault();

//         const username = e.currentTarget.username.value;
//         const password = e.currentTarget.password.value;
//         const passwordAgain = e.currentTarget.passwordAgain.value;
//         const email = e.currentTarget.email.value;
//         const fullName = e.currentTarget.fullName.value;
//         setError("");
//         if (password !== passwordAgain) {
//             setError("Passwords are not the same");
//             return;
//         }
//         fetch("/api/users", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 username, password, email, fullName
//             }),
//         }).then(response => {
//             return response.json();
//         }).then(data => {
//             setSuccess("");
//             if (data && data.statusCode === 201) {
//                 setSuccess("User registered successfully");
//                 location.href = "/";
//             }
//         })
//     }

//     function handleMouseMove(e) {
//         const eyes = [
//             { eye: leftEyeRef.current, pupil: leftPupilRef.current },
//             { eye: rightEyeRef.current, pupil: rightPupilRef.current }
//         ];
//         eyes.forEach(({ eye, pupil }) => {
//             const rect = eye.getBoundingClientRect();
//             const eyeX = rect.left + rect.width / 2;
//             const eyeY = rect.top + rect.height / 2;
//             const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
//             const distance = Math.min(rect.width / 4, rect.height / 4);
//             const pupilX = distance * Math.cos(angle);
//             const pupilY = distance * Math.sin(angle);
//             pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
//         });
//     }

//     function handleFocus(e) {
//         if (e.target.name === "password" || e.target.name === "passwordAgain") {
//             leftEyelidRef.current.classList.add("close");
//             rightEyelidRef.current.classList.add("close");
//         } else {
//             leftEyelidRef.current.classList.remove("close");
//             rightEyelidRef.current.classList.remove("close");
//         }
//     }

//     return (
//         <ThemeProvider theme={theme}>
//             <form onSubmit={handleSubmit} className="form-container" onMouseMove={handleMouseMove}>
//                 <Grid
//                     container
//                     height="100vh"
//                     direction="column"
//                     justifyContent="center"
//                     alignItems="center"
//                     style={{
//                         backgroundImage: 'url("/images/register.jpeg")',
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                     }}
//                 >
//                     <div className="eyes-container">
//                         <div className="eye" ref={leftEyeRef}>
//                             <div className="eye-ball" ref={leftPupilRef}></div>
//                             <div className="eyelid" ref={leftEyelidRef}></div>
//                         </div>
//                         <div className="eye" ref={rightEyeRef}>
//                             <div className="eye-ball" ref={rightPupilRef}></div>
//                             <div className="eyelid" ref={rightEyelidRef}></div>
//                         </div>
//                     </div>
//                     <Grid item xs={12} sm={6} md={4} className="form-content">
//                         <h1 className="form-title">Chat App Register Page</h1>
//                         <TextField
//                             fullWidth
//                             id="outlined-basic"
//                             label="Username"
//                             variant="outlined"
//                             name="username"
//                             onFocus={handleFocus}
//                             style={{ marginBottom: "15px" }}
//                         />
//                         <TextField
//                             fullWidth
//                             id="outlined-basic"
//                             label="Email"
//                             variant="outlined"
//                             name="email"
//                             type="email"
//                             onFocus={handleFocus}
//                             style={{ marginBottom: "15px" }}
//                         />
//                         <TextField
//                             fullWidth
//                             id="outlined-basic"
//                             label="Full Name"
//                             variant="outlined"
//                             name="fullName"
//                             onFocus={handleFocus}
//                             style={{ marginBottom: "15px" }}
//                         />
//                         <TextField
//                             fullWidth
//                             id="outlined-basic"
//                             label="Password"
//                             variant="outlined"
//                             type="password"
//                             name="password"
//                             onFocus={handleFocus}
//                             style={{ marginBottom: "15px" }}
//                         />
//                         <TextField
//                             fullWidth
//                             id="outlined-basic"
//                             label="Password Again"
//                             variant="outlined"
//                             type="password"
//                             name="passwordAgain"
//                             onFocus={handleFocus}
//                             style={{ marginBottom: "15px" }}
//                         />
//                         {error && (
//                             <Grid item xs={12}>
//                                 <Alert severity="error">{error}</Alert>
//                             </Grid>
//                         )}
//                         {success && (
//                             <Grid item xs={12}>
//                                 <Alert severity="success">{success}</Alert>
//                             </Grid>
//                         )}
//                         <Grid item xs={12}>
//                             <Button
//                                 variant="contained"
//                                 color="success"
//                                 fullWidth
//                                 type="submit"
//                                 className="submit-button"
//                             >
//                                 Register
//                             </Button>
//                             <Link href="/register" className="form-link">Register</Link>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </form>
//         </ThemeProvider>
//     );
// }
