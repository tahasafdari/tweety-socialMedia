export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("items") !== "undefined"
      ? JSON.parse(localStorage.getItem("items"))
      : localStorage.clear();

  return userInfo;
};
