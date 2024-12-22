import React, { useRef } from "react";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axios";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { toast } from "react-toastify";

// react-redux
import { connect } from "react-redux";
// actions
import { storeUser, userSignIn, userPassword } from "../../Utility/action";

const SignUp = ({ storeUser, userSignIn, userPassword, password }) => {
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const navigate = useNavigate();

  // const validateSignupForm = (formData) => {
  //   const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   const passwordPattern = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
  //   const userNamePattern = /^[a-zA-Z0-9_]{3,15}$/;
  //   // const phonePattern = /^\+?[0-9]{10,13}$/;
  //   // const dobPattern = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  //   const errors = {};
  //   if (!emailPattern.test(formData.emailDom)) {
  //     errors.emailDom = "Invalid email format.";
  //   }
  //   if (!passwordPattern.test(formData.passwordDom)) {
  //     errors.passwordDom =
  //       "Password must be at least 8 characters and include letters and numbers.";
  //   }
  //   if (!userNamePattern.test(formData.userNameDom)) {
  //     errors.userNameDom =
  //       "Username must be 3-15 characters and can include letters, numbers, and underscores.";
  //   }
  //   // if (!phonePattern.test(formData.phone)) {
  //   //   errors.phone =
  //   //     "Phone number must be 10-13 digits, with an optional leading '+'.";
  //   // }
  //   // if (!dobPattern.test(formData.dob)) {
  //   //   errors.dob = "Date of birth must be in the format YYYY-MM-DD.";
  //   // }

  //   return errors;
  // };
  // const formData = {
  //   emailDom: "test@example.com",
  //   passwordDom: "password123",
  //   userNameDom: "user_01",
  //   // phone: "+1234567890",
  //   // dob: "1995-08-25",
  // };

  const signUpHandling = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/register", {
        userName: userNameDom.current.value,
        firstName: firstNameDom.current.value,
        lastName: lastNameDom.current.value,
        email: emailDom.current.value,
        password: passwordDom.current.value,
      });

      // const errors = validateSignupForm(formData);
      // if (Object.keys(errors).length === 0) {
      //   console.log("Signup form is valid!");
      // } else {
      //   console.log("Errors:", errors);
      //   toast.error(errors);
      //   return;
      // }
      console.log(data);
      // // validation
      if (!data) {
        toast.error(data.message, {
          position: "top-center",
        });
        return;
      }
      storeUser(data.userName);
      localStorage.setItem("token", data.token);
      // console.log(data);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1300);
    } catch (error) {
      toast.error(error.data?.message || "Signup field", {
        position: "top-center",
      });
      navigate("/");
    }
  };

  return (
    <form onSubmit={signUpHandling} className={classes.signup__container}>
      <div className={classes.signup__wrapper}>
        <div className={classes.signup__title}>
          <h4>Join the Network</h4>
          <p>
            Already have an account?{" "}
            <span onClick={() => userSignIn()}>Sign in</span>
          </p>
        </div>
        <input
          required
          // formData={userNamePattern}
          name="userName"
          ref={userNameDom}
          type="text"
          placeholder="User name"
        />
        <div className={classes.multi__inputs}>
          <input
            required
            name="firstName"
            ref={firstNameDom}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            ref={lastNameDom}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          // formData={emailPattern}
          name="email"
          ref={emailDom}
          type="email"
          placeholder="Email address"
        />
        <div className={classes.password__input}>
          <input
            required
            // formData={passwordPattern}
            name="password"
            ref={passwordDom}
            type={password ? "text" : "password"}
            // type="password"
            placeholder="Password"
          />
          <span
            className={classes.password_eye_icon}
            onClick={() => userPassword()}
          >
            {password ? <BsEyeSlash /> : <BsEye />}
          </span>
        </div>
        <div className={classes.signup__terms}>
          <small>
            I agree to the <a href=""> privacy policy</a> and{" "}
            <a href=""> terms of service.</a>
          </small>
        </div>
        <button type="submit">Agree and Join</button>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    password: state.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (users) => dispatch(storeUser(users)),
    userSignIn: () => dispatch(userSignIn()),
    userPassword: () => dispatch(userPassword()),
  };
};
// export default SignUp;
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
