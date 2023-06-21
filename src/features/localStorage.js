export const setUser = (userData) => {
  return localStorage.setItem("User", JSON.stringify(userData));
};

export const getUser = () => {
  const data = localStorage.getItem("User");
  return data === null ? null : JSON.parse(data);
};

export const removeUser = () => {
  return localStorage.removeItem("User");
};
