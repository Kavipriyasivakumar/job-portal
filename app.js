"use strict";
const jobs = [
    { id: 1, title: "Frontend Developer", company: "Google", salary: "10 LPA", location: "Bangalore", role: "Developer" },
    { id: 2, title: "UI/UX Designer", company: "Adobe", salary: "8 LPA", location: "Chennai", role: "Designer" },
    { id: 3, title: "Backend Engineer", company: "Amazon", salary: "12 LPA", location: "Hyderabad", role: "Developer" },
    { id: 4, title: "Product Designer", company: "Figma", salary: "9 LPA", location: "Remote", role: "Designer" },
    { id: 5, title: "Full Stack Dev", company: "Microsoft", salary: "15 LPA", location: "Bangalore", role: "Developer" }
];
// 🔥 LOCAL STORAGE LOAD
let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
// ELEMENTS
const jobList = document.getElementById("jobList");
const savedList = document.getElementById("savedJobs");
const searchInput = document.getElementById("search");
const roleFilter = document.getElementById("roleFilter");
const companyFilter = document.getElementById("companyFilter");
// LOAD COMPANY DROPDOWN
function loadCompanies() {
    const companies = [...new Set(jobs.map(j => j.company))];
    companies.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        companyFilter.appendChild(opt);
    });
}
// DISPLAY JOBS
function displayJobs(list) {
    jobList.innerHTML = "";
    if (list.length === 0) {
        jobList.innerHTML = `<p class="empty">No jobs found 😢</p>`;
        return;
    }
    list.forEach(job => {
        const isSaved = savedJobs.some(j => j.id === job.id);
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
      <img src="https://logo.clearbit.com/${job.company.toLowerCase()}.com"
        class="logo"
        onerror="this.src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'">

      <h3>${job.title}</h3>
      <p class="company">${job.company}</p>

      <p class="salary">💰 ${job.salary}</p>
      <p class="location">📍 ${job.location}</p>

      <span class="badge">Active</span>
      <span class="badge role">${job.role}</span>

      <button class="${isSaved ? 'saved' : 'save-btn'}"
        onclick="toggleSave(${job.id})">
        <i class="fa-solid ${isSaved ? 'fa-trash' : 'fa-bookmark'}"></i>
        ${isSaved ? 'Remove' : 'Save'}
      </button>
    `;
        jobList.appendChild(div);
    });
}
// SAVE / REMOVE JOB
function toggleSave(id) {
    const exists = savedJobs.some(j => j.id === id);
    if (exists) {
        savedJobs = savedJobs.filter(j => j.id !== id);
    }
    else {
        const job = jobs.find(j => j.id === id);
        if (job)
            savedJobs.push(job);
    }
    // 🔥 SAVE TO LOCAL STORAGE
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    displayJobs(jobs);
    displaySaved();
}
// DISPLAY SAVED
function displaySaved() {
    savedList.innerHTML = "";
    if (savedJobs.length === 0) {
        savedList.innerHTML = `<p class="empty">No saved jobs</p>`;
        return;
    }
    savedJobs.forEach(job => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
      <img src="https://logo.clearbit.com/${job.company.toLowerCase()}.com"
        class="logo"
        onerror="this.src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'">

      <h4>${job.title}</h4>
      <p>${job.company}</p>

      <button class="saved" onclick="toggleSave(${job.id})">
        <i class="fa-solid fa-trash"></i> Remove
      </button>
    `;
        savedList.appendChild(div);
    });
}
// FILTER + SEARCH
function filterJobs() {
    let filtered = jobs;
    const search = searchInput.value.toLowerCase();
    const role = roleFilter.value;
    const company = companyFilter.value;
    if (search) {
        filtered = filtered.filter(j => j.title.toLowerCase().includes(search) ||
            j.company.toLowerCase().includes(search));
    }
    if (role)
        filtered = filtered.filter(j => j.role === role);
    if (company)
        filtered = filtered.filter(j => j.company === company);
    displayJobs(filtered);
}
// EVENTS
searchInput.addEventListener("input", filterJobs);
roleFilter.addEventListener("change", filterJobs);
companyFilter.addEventListener("change", filterJobs);
// INIT
loadCompanies();
displayJobs(jobs);
displaySaved();
