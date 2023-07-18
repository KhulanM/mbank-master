// import React from "react";
// import Message from "../components/Message";

// function notValidated(value) {
//   if (value === null || value === undefined || value === "") return true;
//   else return false;
// }

// function nameValidate(name) {
//   if (isNullOrUndefined(name))
//     return { error: true, message: "name is required" };
// }

// function emailValidate(email) {
//   if (notValidated(email))
//     return { error: true, message: "email is required :(" };
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return {
//     error: !re.test(email),
//     message: "check ur email cuz it looks wrong",
//   };
// }

// function passwordValidate(password) {
//   var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
//   return {
//     error: !re.test(password),
//     message: "ur password looks weak. pls make it stronger :)",
//   };
// }

// export function signupValidate(form) {
//   const name = nameValidate(form.name);
//   if (name?.error) return <Message error={name.error} message={name.message} />;

//   const email = emailValidate(form.email);
//   if (email?.error)
//     return <Message error={email.error} message={email.message} />;

//   const password = passwordValidate(form.password);
//   if (password?.error)
//     return <Message error={password.error} message={password.message} />;
// }

// export function signinValidate(form) {
//   const email = emailValidate(form.email);
//   if (email?.error)
//     return <Message error={email.error} message={email.message} />;
// }
