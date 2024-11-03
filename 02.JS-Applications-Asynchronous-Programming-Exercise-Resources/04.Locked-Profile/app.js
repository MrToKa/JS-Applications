async function lockedProfile() {
  const url = "http://localhost:3030/jsonstore/advanced/profiles";
  const main = document.getElementById("main");

  main.textContent = "";

  async function getProfiles() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function createElement(tag, text, attributes = []) {
    const element = document.createElement(tag);

    if (text) {
      element.textContent = text;
    }

    attributes
      .map((a) => a.split("="))
      .forEach(([name, value]) => {
        element.setAttribute(name, value);
      });

    return element;
  }

  function createProfiles() {
    getProfiles().then((data) => {
      Object.values(data).forEach((profile) => {
        const div = createElement("div", "", ["class=profile"]);
        const img = createElement("img", "", [
          "src=./iconProfile2.png",
          "class=userIcon",
        ]);
        const labelLock = createElement("label", "Lock");
        const inputLock = createElement("input", "", [
          "type=radio",
          "name=user1Locked",
          "value=lock",
          "checked",
        ]);
        const labelUnlock = createElement("label", "Unlock");
        const inputUnlock = createElement("input", "", [
          "type=radio",
          "name=user1Locked",
          "value=unlock",
        ]);
        const br = createElement("br");
        const hr = createElement("hr");
        const labelUsername = createElement("label", "Username");
        const inputUsername = createElement("input", "", [
          "type=text",
          "name=user1Username",
          "value=" + profile.username,
          "disabled",
          "readonly",
        ]);
        const divHiddenFields = createElement("div", "", [
          "class=user1Username" ,
        ]);
        divHiddenFields.style.display = "none";
        const hr2 = createElement("hr");
        const labelEmail = createElement("label", "Email:");
        const inputEmail = createElement("input", "", [
          "type=email",
          "name=user1Email",
          "value=" + profile.email,
          "disabled",
          "readonly",
        ]);
        const labelAge = createElement("label", "Age:");
        const inputAge = createElement("input", "", [
          "type=number",
          "name=user1Age",
          "value=" + profile.age,
          "disabled",
          "readonly",
        ]);
        const btnShowMore = createElement("button", "Show more");
        btnShowMore.addEventListener("click", () => {
          if (inputUnlock.checked) {
            if (btnShowMore.textContent === "Show more") {
              divHiddenFields.style.display = "block";
              btnShowMore.textContent = "Hide it";
            } else {
              divHiddenFields.style.display = "none";
              btnShowMore.textContent = "Show more";
            }
          }
        });

        div.appendChild(img);
        div.appendChild(labelLock);
        div.appendChild(inputLock);
        div.appendChild(labelUnlock);
        div.appendChild(inputUnlock);
        div.appendChild(br);
        div.appendChild(hr);
        div.appendChild(labelUsername);
        div.appendChild(inputUsername);
        div.appendChild(divHiddenFields);
        divHiddenFields.appendChild(hr2);
        divHiddenFields.appendChild(labelEmail);
        divHiddenFields.appendChild(inputEmail);
        divHiddenFields.appendChild(labelAge);
        divHiddenFields.appendChild(inputAge);
        div.appendChild(btnShowMore);
        main.appendChild(div);
      });
    });
  }

    createProfiles();    
}
