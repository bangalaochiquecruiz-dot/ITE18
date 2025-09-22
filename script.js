const editBtn = document.getElementById("edit-btn");
const modal = document.getElementById("edit-modal");
const closeModal = document.getElementById("close-modal");
const sectionSelect = document.getElementById("edit-section-select");
const editFields = document.getElementById("edit-fields");
const saveBtn = document.getElementById("save-edit-btn");

const aboutSection = document.querySelector("#about p");
const skillsSection = document.querySelector("#skills ul");
const contactSection = document.querySelector("#contact address");
const projectsContainer = document.querySelector(
  "#projects .project-container"
);

const uploadsForm = document.getElementById("uploads-form");
const uploadsStatus = document.getElementById("uploads-status");

// === Theme Toggle ===
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "🌙";
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});

// === Modal Controls ===
editBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  loadFields(sectionSelect.value);
});
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// === Hamburger Menu ===
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// === Load Fields ===
function loadFields(section) {
  editFields.innerHTML = "";

  if (section === "profile") {
    editFields.innerHTML = `
    <label>Profile Image (URL):</label>
    <input type="text" id="edit-profile-img" style="width:100%" value="${
      document.getElementById("profile-img").src
    }">
    
    <label>Or Upload New Profile Image:</label>
    <input type="file" id="edit-profile-file" accept="image/*">
  `;
  }

  if (section === "about") {
    editFields.innerHTML = `
      <label>Edit About:</label>
      <textarea id="edit-about" rows="5" style="width:100%">${aboutSection.textContent.trim()}</textarea>
    `;
  }

  if (section === "skills") {
    const skills = Array.from(skillsSection.querySelectorAll("li"))
      .map((li) => li.textContent)
      .join(", ");
    editFields.innerHTML = `
      <label>Edit Skills (comma-separated):</label>
      <input type="text" id="edit-skills" style="width:100%" value="${skills}">
    `;
  }

  if (section === "contact") {
    const email = contactSection.querySelector("a").textContent.trim();
    const location =
      contactSection.innerHTML.split("Location:")[1]?.trim() || "";
    editFields.innerHTML = `
      <label>Email:</label>
      <input type="email" id="edit-email" style="width:100%" value="${email}">
      <label>Location:</label>
      <input type="text" id="edit-location" style="width:100%" value="${location}">
    `;
  }

  if (section === "projects") {
    editFields.innerHTML = `
      <label>Project Title:</label>
      <input type="text" id="edit-project-title" style="width:100%">
      
      <label>Description:</label>
      <textarea id="edit-project-desc" rows="3" style="width:100%"></textarea>
      
      <label>Image (URL):</label>
      <input type="text" id="edit-project-img" style="width:100%">
      
      <label>Or Uploads Image:</label>
      <input type="file" id="edit-project-file" accept="image/*">
    `;
  }
}
sectionSelect.addEventListener("change", (e) => loadFields(e.target.value));

// === Save Changes ===
saveBtn.addEventListener("click", () => {
  const section = sectionSelect.value;

  if (section === "profile") {
    const profileImg = document.getElementById("profile-img");
    const imgUrl = document.getElementById("edit-profile-img").value;
    const imgFile = document.getElementById("edit-profile-file").files[0];

    if (!imgUrl && !imgFile) {
      alert("Please provide a profile image (URL or file)!");
      return;
    }

    if (imgFile) {
      const formData = new FormData();
      formData.append("image", imgFile);

      fetch("/uploads", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          profileImg.src = data.filePath;
        })
        .catch((err) => {
          console.error("Profile image upload error:", err);
          alert("Profile image upload failed!");
        });
    } else {
      profileImg.src = imgUrl;
    }
  }

  if (section === "about") {
    const newText = document.getElementById("edit-about").value;
    aboutSection.textContent = newText;
  }

  if (section === "skills") {
    const newSkills = document
      .getElementById("edit-skills")
      .value.split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    skillsSection.innerHTML = newSkills.map((s) => `<li>${s}</li>`).join("");
  }

  if (section === "contact") {
    const newEmail = document.getElementById("edit-email").value;
    const newLocation = document.getElementById("edit-location").value;
    contactSection.innerHTML = `
      Email: <a href="mailto:${newEmail}">${newEmail}</a><br>
      Location: ${newLocation}
    `;
  }

  if (section === "projects") {
    const title = document.getElementById("edit-project-title").value;
    const desc = document.getElementById("edit-project-desc").value;
    const imgUrl = document.getElementById("edit-project-img").value;
    const imgFile = document.getElementById("edit-project-file").files[0];

    if (!title || !desc || (!imgUrl && !imgFile)) {
      alert("Please fill in all project fields!");
      return;
    }

    if (imgFile) {
      const formData = new FormData();
      formData.append("image", imgFile);

      fetch("/uploads", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          addProjectCard(title, desc, data.filePath);
        })
        .catch((err) => {
          console.error("Uploads error:", err);
          alert("Image uploads failed!");
        });
    } else {
      addProjectCard(title, desc, imgUrl);
    }
  }

  modal.style.display = "none";
});

<<<<<<< HEAD
// === Add Project Card ===
=======

>>>>>>> fb9bb693fc961c37dafd6e22249ca7eb86cdd7e2
function addProjectCard(title, desc, imgPath) {
  const newCard = document.createElement("div");
  newCard.classList.add("cards");
  newCard.innerHTML = `
    <article class="card">
      <img src="${imgPath}" alt="${title}">
      <div class="card-body">
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    </article>
  `;
  projectsContainer.appendChild(newCard);
}

<<<<<<< HEAD
// === Uploads Form (profile/project images) ===
=======
>>>>>>> fb9bb693fc961c37dafd6e22249ca7eb86cdd7e2
if (uploadsForm) {
  uploadsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadsForm);

    try {
      const res = await fetch("/uploads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Uploads failed");

      const data = await res.json();
      uploadsStatus.textContent = "Uploads successful!";
      uploadsStatus.style.color = "green";

<<<<<<< HEAD
      // Example: update profile photo automatically
=======
      
>>>>>>> fb9bb693fc961c37dafd6e22249ca7eb86cdd7e2
      const profileImg = document.querySelector("#profile-img");
      if (profileImg) {
        profileImg.src = data.filePath;
      }

      const projectImgField = document.getElementById("edit-project-img");
      if (projectImgField) {
        projectImgField.value = data.filePath;
      }
    } catch (err) {
      console.error(err);
      uploadsStatus.textContent = "Uploads failed!";
      uploadsStatus.style.color = "red";
    }
  });
}
