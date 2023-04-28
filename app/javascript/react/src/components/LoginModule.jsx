import React, { useState } from 'react';



const LoginModule = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

//   const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (isSignUp) {
//       try {
//         const response = await fetch("/api/v1/users", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-CSRF-Token": csrf,
//           },
//           body: JSON.stringify({
//             user: {
//               email: formFields.email,
//               password: formFields.password,
//               password_confirmation: formFields.passwordConfirmation,
//             },
//           }),
//         });

//         if (response.ok) {
//           alert("Sign up successful!");
//           window.location.href = "/";
//         } else {
//           const errorData = await response.json();
//           //  debugger;
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     } else {
//       try {
//         const response = await fetch("/api/v1/users/sign_in", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-CSRF-Token": csrf,
//           },
//           body: JSON.stringify({ user: { email: formFields.email, password: formFields.password } }),
//         });

//         if (response.ok) {
//           setIsLoggedIn(true);
//           localStorage.setItem("isLoggedIn", true);
//         } else {
//           const errorData = await response.json();
//           alert(errorData.error || "An error occurred during login.")
//           console.log("errorData:", errorData);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

//   const handleFormFields = (event) => {
//     setFormFields({ ...formFields, [event.target.name]: event.target.value });
//   };

//   const switchForm = () => {
//     setIsSignUp(!isSignUp);
//   };

  return (
   
        <div className="container ">
          <div className="row justify-content-center mb-10">
            <div className="col-md-6">
              <div className="card mt-5">
                <div className="card-body">
                  <h1 className="card-title text-center">{isSignUp ? 'Sign Up' : 'Login'}</h1>
                  <form >
                    {isSignUp && (
                      <div className="form-group">
                        <label className="form-label mt-3 mb-3">Name</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3"
                        //   value={formFields.name}
                        //   onChange={handleFormFields}
                          name="name"
                          required
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <label className="form-label mt-3 mb-3">Email</label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        // value={formFields.email}
                        // onChange={handleFormFields}
                        name="email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label mt-3 mb-3">Password</label>
                      <input
                        type="password"
                        className="form-control form-control-lg rounded-3"
                        // value={formFields.password}
                        // onChange={handleFormFields}
                        name="password"
                        required
                      />
                    </div>
                    {isSignUp && (
                      <div className="form-group">
                        <label className="form-label mt-3 mb-3">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg rounded-3"
                        //   value={formFields.passwordConfirmation}
                        //   onChange={handleFormFields}
                          name="passwordConfirmation"
                          required
                        />
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                      {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                  </form>
                  <div className="text-center mt-3">
                    <small>
                      {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                      {/* <button type="button" className="btn btn-link" onClick={switchForm}> */}
                      <button type="button" className="btn btn-link" >
                        {isSignUp ? 'Login' : 'Sign Up'}
                      </button>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default LoginModule;
