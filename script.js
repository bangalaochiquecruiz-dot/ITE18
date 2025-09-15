const editBtn = document.getElementById("edit-btn");
const modal = document.getElementById("edit-modal");
const closeModal = document.getElementById("close-modal");
const sectionSelect = document.getElementById("edit-section-select");
const editFields = document.getElementById("edit-fields");
const saveBtn = document.getElementById("save-edit-btn");

const aboutSection = document.querySelector("#about p");
const skillsSection = document.querySelector("#skills ul");
const contactSection = document.querySelector("#contact address");
const projectsContainer = document.querySelector("#projects .project-container");

// === Theme Toggle ===
const themeToggle = document.getElementById("theme-toggle");

// Check saved theme in localStorage
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "🌙 Dark Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  }
});

// Open modal
editBtn.addEventListener("click", () => {
  modal.style.display = "block";
  loadFields(sectionSelect.value);
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Outisde Close modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Load fields
function loadFields(section) {
  editFields.innerHTML = "";

  if (section === "about") {
    editFields.innerHTML = `
      <label>Edit About:</label>
      <textarea id="edit-about" rows="5" style="width:100%">${aboutSection.textContent.trim()}</textarea>
    `;
  }

  if (section === "skills") {
    const skills = Array.from(skillsSection.querySelectorAll("li"))
      .map(li => li.textContent)
      .join(", ");
    editFields.innerHTML = `
      <label>Edit Skills (comma-separated):</label>
      <input type="text" id="edit-skills" style="width:100%" value="${skills}">
    `;
  }

  if (section === "contact") {
    const email = contactSection.querySelector("a").textContent.trim();
    const location = contactSection.textContent
      .replace(/Email.*\n?/, "")
      .replace("Location:", "")
      .trim();
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
      <input type="text" id="edit-project-title" style="width:100%" placeholder="Enter project title">
      <label>Description:</label>
      <textarea id="edit-project-desc" rows="4" style="width:100%" placeholder="Enter project description"></textarea>
      <label>Image URL:</label>
      <input type="text" id="edit-project-img" style="width:100%" placeholder="Photo/project-image.jpg">
    `;
  }
}

// Change fields when selecting section ===
sectionSelect.addEventListener("change", (e) => {
  loadFields(e.target.value);
});

// Save changes
saveBtn.addEventListener("click", () => {
  const section = sectionSelect.value;

  if (section === "about") {
    const newText = document.getElementById("edit-about").value;
    aboutSection.textContent = newText;
  }

  if (section === "skills") {
    const newSkills = document.getElementById("edit-skills").value
      .split(",")
      .map(s => s.trim())
      .filter(s => s !== "");
    skillsSection.innerHTML = newSkills.map(s => `<li>${s}</li>`).join("");
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
    const img = document.getElementById("edit-project-img").value;

    if (title && desc && img) {
      const newCard = document.createElement("div");
      newCard.classList.add("cards");
      newCard.innerHTML = `
        <article class="card">
          <img src="${img}" alt="${title}">
          <div class="card-body">
            <h3>${title}</h3>
            <p>${desc}</p>
          </div>
        </article>
      `;
      projectsContainer.appendChild(newCard);
    } else {
      alert("Please fill in all project fields!");
      return;
    }
  }

  modal.style.display = "none"; // close after save
  alert("Changes saved!");
});
