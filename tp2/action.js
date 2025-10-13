window.onload = () => {
  const paramsString = document.location.search; // '?name=John&firstname=Doe&...'
  const searchParams = new URLSearchParams(paramsString);

  for (const param of searchParams) {
    const key = param[0];    // ex: 'name'
    const value = decodeURIComponent(param[1]); // ex: 'John'
    const element = document.getElementById(key);

    if (element !== null) {
      if (key === "address") {
        element.textContent = value;
        element.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
      } else if (key === "email") {
        element.textContent = value;
        element.href = `mailto:${value}?subject=Hello!&body=What's up?`;
      } else {
        element.textContent = value;
      }
    }
  }
};
