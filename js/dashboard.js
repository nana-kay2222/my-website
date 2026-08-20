document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Inspector Profile from localStorage/Session
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.name) {
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-role").textContent = user.role || "Senior Field Inspector";
    
    // Initials for avatar
    const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2);
    document.getElementById("user-avatar").textContent = initials;
  }

  // Logout listener
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  // Fetch initial tasks
  fetchReports();
});

let globalReports = [];

async function fetchReports() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_BASE_URL}/reports`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    globalReports = await res.json();
    renderFeed(globalReports);
    updateMetrics(globalReports);
  } catch (err) {
    console.error("Failed to fetch reports:", err);
  }
}

function renderFeed(reports) {
  const container = document.getElementById("task-feed");
  container.innerHTML = "";

  if (reports.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-gray-500 text-sm">No reports found.</div>`;
    return;
  }

  reports.forEach(item => {
    // Pick the primary thumbnail or a fallback image
    const thumbnail = (item.attachments && item.attachments.length > 0)
      ? item.attachments[0] 
      : 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=200&q=80';

    const card = document.createElement("div");
    card.className = "task-card bg-gray-950/70 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5";
    
    card.innerHTML = `
      <div class="flex items-start sm:items-center gap-4">
        <img src="${thumbnail}" alt="Thumbnail" class="w-20 h-20 rounded-xl object-cover border border-gray-800 flex-shrink-0 cursor-pointer" onclick="openDetails('${item._id}')" />
        <div class="space-y-1.5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-mono text-gray-500">#${item.reportId || item._id.slice(-6)}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950 text-red-400 border border-red-800/60">${item.priority || 'MEDIUM'}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">${item.status}</span>
          </div>
          <h3 class="text-base font-bold text-white">${item.title}</h3>
          <p class="text-xs text-gray-400">${item.description}</p>
          <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
            <span>📍 ${item.location}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end lg:self-center">
        <button type="button" onclick="openDetails('${item._id}')" class="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold border border-gray-700 transition cursor-pointer">View Details</button>
        <button type="button" onclick="openUpdateModal('${item._id}')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer">Update Status</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function openDetails(id) {
  const item = globalReports.find(r => r._id === id);
  if (!item) return;

  document.getElementById("details-report-id").textContent = `#${item.reportId || item._id.slice(-6)}`;
  document.getElementById("details-title").textContent = item.title;
  document.getElementById("details-desc").textContent = item.description;
  document.getElementById("details-location").textContent = `📍 ${item.location}`;
  document.getElementById("details-reporter").textContent = item.reporterName || "Anonymous";

  // Render Image Gallery
  const gallery = document.getElementById("details-gallery");
  gallery.innerHTML = "";

  const attachments = item.attachments && item.attachments.length > 0 
    ? item.attachments 
    : ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80'];

  attachments.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "w-full h-32 object-cover rounded-xl border border-gray-800";
    gallery.appendChild(img);
  });

  document.getElementById("details-modal").classList.remove("hidden");
}

function updateMetrics(reports) {
  document.getElementById("cnt-total").textContent = reports.length;
  document.getElementById("cnt-critical").textContent = reports.filter(r => r.priority === "CRITICAL").length;
  document.getElementById("cnt-progress").textContent = reports.filter(r => r.status === "In Progress").length;
  document.getElementById("cnt-resolved").textContent = reports.filter(r => r.status === "Resolved").length;
}