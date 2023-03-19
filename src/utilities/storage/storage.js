function getStorage(key) {
  let now = Date.now();

  let expirationTime = localStorage.getItem(key + '_expiresIn');
  if (expirationTime === undefined || expirationTime === null) {
    expirationTime = 0;
  }

  if (expirationTime < now) {
    // Expired
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_expiresIn`);

    return null;
  }
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function setStorage(key, value, expirationTime) {
  expirationTime = Math.abs(expirationTime); // make sure it's positive
  let now = Date.now();
  expirationTime = now + expirationTime * 1000;
  try {
    localStorage.setItem(key, value);
    localStorage.setItem(key + '_expiresIn', expirationTime);
  } catch (e) {
    return false;
  }
  return true;
}
export { setStorage, getStorage };
