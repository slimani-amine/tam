export const verif = (email, password, username = "amine") => {
  if (email && password && username) {
    return email.length > 4 && password.length > 8 && username.length > 3;
  }
  return false;
};

export const login = async (inputValues) => {
  try {
    const res = await fetch(`http://localhost:1337/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValues),
    });
    if (!res.ok) {
      throw new Error("Failed to register user");
    }
    const data = await res.json();
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("userId", data.user.id);
      window.location.assign("../index.html");
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (inputValues) => {
  try {
    const res = await fetch(`http://localhost:1337/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValues),
    });
    if (!res.ok) {
      throw new Error("Failed to register user");
    }
    const data = await res.json();
    
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("userId", data.user.id);
      window.location.assign("../index.html");
    }
    console.log(data, "registred");
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.assign("http://127.0.0.1:5500/frontend/auth/login.html");
};
