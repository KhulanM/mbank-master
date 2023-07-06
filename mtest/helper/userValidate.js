function notValidated(value) {
  if (value === null || value === undefined || value === "") return true;
  else return false;
}
function nameValidate(name) {
  if (isNullOrUndefined(userName))
    return { error: true, message: "name is required" };
}

function emailValidate(email) {
  if (notValidated(email))
    return { error: true, message: "email is required :(" };
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return {
    error: !re.test(email),
    message: "check ur email cuz it looks wrong",
  };
}

function passwordValidate(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return {
    error: !re.test(password),
    message: "ur password looks weak. pls make it stronger :)",
  };
}

export function signupValidate(user) {
  const name = nameValidate(user.name);
  if (name?.error) return name;

  const email = emailValidate(user.email);
  if (email?.error) return email;

  const password = passwordValidate(user.password);
  if (password?.error) return password;
}

export function signinValidate(form) {
  const email = emailValidate(user.email);
  if (email?.error) return email;
}
