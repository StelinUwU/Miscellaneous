const getUserStorage = () => {
  return {
    user: localStorage.getItem("user"),
    desk: localStorage.getItem("desk"),
  };
};

export default getUserStorage;
