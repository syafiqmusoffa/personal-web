const xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.npoint.io/37b03059009dda95802a", true);

xhr.onload = function () {
  if (xhr.status === 200) {
    const response = xhr.responseText;
    console.log("Response :", JSON.parse(response));
  } else {
    console.error("Error :", xhr.status);
  }
};

xhr.send();