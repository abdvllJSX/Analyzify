export const getHashParams = () => {
  if (typeof window !== "undefined") {
    // This code will only run on the client side
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  } else {
    // Handle the case when window is not defined, e.g., during server-side rendering
    return {};
  }
};
