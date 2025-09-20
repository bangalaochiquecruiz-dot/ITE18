const editBtn = document.getElementById("edit-btn");
const editProfileBtn = document.getElementById("edit-profile-btn");
const addProjectBtn = document.getElementById("add-project-btn");
const addSkillBtn = document.getElementById("add-skill-btn"); // <-- added
const profileImg = document.getElementById("profile-img");

const aboutSection = document.querySelector("#about p");
const skillsSection = document.querySelector("#skills ul");
const contactSection = document.querySelector("#contact address");
const projectsContainer = document.querySelector(
  "#projects .project-container"
);

const skillsList = document.querySelector("#skills ul"); // <-- added

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

// === Hamburger Menu ===
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// === Inline Editing Mode ===
let isEditing = false;

editBtn.addEventListener("click", () => {
  isEditing = !isEditing;

  if (isEditing) {
    editBtn.textContent = "Save";

    // Show profile, project & skill edit buttons
    editProfileBtn.style.display = "inline-block";
    addProjectBtn.style.display = "inline-block";
    addSkillBtn.style.display = "inline-block";

    [aboutSection, skillsSection, contactSection, projectsContainer].forEach(
      (el) => {
        el.contentEditable = true;
        el.style.border = "1px dashed gray";
      }
    );
  } else {
    editBtn.textContent = "Edit";

    // Hide profile, project & skill edit buttons
    editProfileBtn.style.display = "none";
    addProjectBtn.style.display = "none";
    addSkillBtn.style.display = "none";

    [aboutSection, skillsSection, contactSection, projectsContainer].forEach(
      (el) => {
        el.contentEditable = false;
        el.style.border = "none";
      }
    );

    console.log("Saved content:", {
      about: aboutSection.textContent.trim(),
      skills: skillsSection.innerHTML.trim(),
      contact: contactSection.innerHTML.trim(),
      projects: projectsContainer.innerHTML.trim(),
    });
  }
});

// === Add New Skill ===
addSkillBtn.addEventListener("click", () => {
  const newSkill = prompt("Enter a new skill:");
  if (newSkill && newSkill.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = newSkill.trim();
    skillsList.appendChild(li);
  }
});

// === Change Profile Picture ===
editProfileBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      fetch("/uploads", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          profileImg.src = data.filePath;
        })
        .catch((err) => {
          console.error("Profile upload failed:", err);
          alert("Profile picture upload failed!");
        });
    }
  });

  input.click();
});

// === Add New Project ===
addProjectBtn.addEventListener("click", () => {
  const title = prompt("Enter project title:");
  const desc = prompt("Enter project description:");
  if (!title || !desc) return;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      fetch("/uploads", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          addProjectCard(title, desc, data.filePath);
        })
        .catch((err) => {
          console.error("Project upload failed:", err);
          alert("Project upload failed!");
        });
    }
  });

  input.click();
});

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
