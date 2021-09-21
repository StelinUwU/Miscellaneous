const getLasts = async () => {
  const resp = await fetch(process.env.REACT_APP_BACKEND_URL);
  const data = await resp.json();
  return data.lasts;
};

export default getLasts;
