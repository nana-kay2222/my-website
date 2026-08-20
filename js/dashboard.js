document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Inspector Profile from localStorage/Session
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.name) {
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-role").textContent = user.role || "Senior Field Inspector";

    const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2);
    document.getElementById("user-avatar").textContent = initials;
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  document.getElementById("refresh-btn").addEventListener("click", fetchReports);

  fetchReports();
});

let globalReports = [];

// Backend statuses -> shown badge colors/labels
const STATUS_STYLES = {
  "Request Submitted": { label: "PENDING", classes: "bg-amber-950 text-amber-300 border-amber-800/60" },
  "Assigned to Crew":  { label: "ASSIGNED", classes: "bg-blue-950 text-blue-300 border-blue-800/60" },
  "In Progress":       { label: "IN PROGRESS", classes: "bg-amber-950 text-amber-300 border-amber-800/60" },
  "Resolved":          { label: "RESOLVED", classes: "bg-emerald-950 text-emerald-300 border-emerald-800/60" }
};

async function fetchReports() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_BASE_URL}/api/reports`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      }
    });

    if (!res.ok) throw new Error(`Server returned status ${res.status}`);

    globalReports = await res.json();
    renderFeed(globalReports);
    updateMetrics(globalReports);
  } catch (err) {
    console.error("Failed to fetch reports:", err);
    document.getElementById("task-feed").innerHTML =
      `<div class="text-center py-8 text-red-400 text-sm">Failed to load reports: ${err.message}</div>`;
  }
}

function renderFeed(reports) {
  const container = document.getElementById("task-feed");
  container.innerHTML = "";

  if (!reports || reports.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-gray-500 text-sm">No reports found.</div>`;
    return;
  }

  reports.forEach(item => {
    const statusInfo = STATUS_STYLES[item.status] || { label: item.status, classes: "bg-gray-800 text-gray-300 border-gray-700" };

    const card = document.createElement("div");
    card.className = "task-card bg-gray-950/70 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5";

    card.innerHTML = `
      <div class="flex items-start sm:items-center gap-4">
        <div class="space-y-1.5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-mono text-gray-500">#${item.id}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.classes}">${statusInfo.label}</span>
            ${item.type ? `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">${item.type}</span>` : ""}
          </div>
          <h3 class="text-base font-bold text-white">${item.category || "Report"}</h3>
          <p class="text-xs text-gray-400">${item.description}</p>
          <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
            <span>📍 ${item.latitude?.toFixed(4)}, ${item.longitude?.toFixed(4)}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end lg:self-center">
        <button type="button" onclick="openDetails('${item.id}')" class="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold border border-gray-700 transition cursor-pointer">View Details</button>
        <button type="button" onclick="openUpdateModal('${item.id}')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer">Update Status</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// The feed doesn't include imageUrl/aiResult/landmark — those only come from the detail route.
// So opening details makes a fresh request to get the full report.
async function openDetails(ticketId) {
  const token = localStorage.getItem("token");
  const numericId = ticketId.replace("TECH-", "");

  document.getElementById("details-modal").classList.remove("hidden");
  document.getElementById("details-report-id").textContent = `#${ticketId}`;
  document.getElementById("details-title").textContent = "Loading...";
  document.getElementById("details-desc").textContent = "";
  document.getElementById("details-gallery").innerHTML = "";
  document.getElementById("details-ai-precautions").innerHTML =
    `<p class="text-xs text-gray-500 italic">Loading AI analysis...</p>`;

  try {
    const res = await fetch(`${API_BASE_URL}/api/reports/detail/${numericId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      }
    });

    if (!res.ok) throw new Error(`Server returned status ${res.status}`);

    const item = await res.json();

    document.getElementById("details-title").textContent = item.type || item.category || "Report";
    document.getElementById("details-desc").textContent = item.description;
    document.getElementById("details-location").textContent =
      `📍 ${item.landmark || `${item.latitude?.toFixed(4)}, ${item.longitude?.toFixed(4)}`}`;
    document.getElementById("details-reporter").textContent = `User #${item.userId}`;

    // Image gallery
    const gallery = document.getElementById("details-gallery");
    gallery.innerHTML = "";
    if (item.imageUrl) {
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.className = "w-full h-32 object-cover rounded-xl border border-gray-800";
      gallery.appendChild(img);
    }
    if (item.videoUrl) {
      const vid = document.createElement("video");
      vid.src = item.videoUrl;
      vid.controls = true;
      vid.className = "w-full h-32 object-cover rounded-xl border border-gray-800";
      gallery.appendChild(vid);
    }
    if (item.audioUrl) {
      const audioWrap = document.createElement("div");
      audioWrap.className = "col-span-full bg-gray-950 border border-gray-800 rounded-xl p-3";
      audioWrap.innerHTML = `<span class="text-[10px] uppercase font-bold text-gray-500 block mb-1">Voice Note</span>`;
      const audio = document.createElement("audio");
      audio.src = item.audioUrl;
      audio.controls = true;
      audio.className = "w-full";
      audioWrap.appendChild(audio);
      gallery.appendChild(audioWrap);
    }
    if (!item.imageUrl && !item.videoUrl && !item.audioUrl) {
      gallery.innerHTML = `<p class="text-xs text-gray-500 col-span-full">No media attached.</p>`;
    }

    // AI Precautions section
    const aiContainer = document.getElementById("details-ai-precautions");
    if (item.aiResult) {
      // aiResult is plain text with \n line breaks (often a numbered list) — render it readable
      const formatted = item.aiResult
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => `<p class="mb-1.5">${line}</p>`)
        .join("");
      aiContainer.innerHTML = formatted;
    } else {
      aiContainer.innerHTML = `<p class="text-xs text-gray-500 italic">No AI analysis available for this report.</p>`;
    }

  } catch (err) {
    console.error("Failed to load report details:", err);
    document.getElementById("details-title").textContent = "Failed to load";
    document.getElementById("details-ai-precautions").innerHTML =
      `<p class="text-xs text-red-400">Could not load AI analysis: ${err.message}</p>`;
  }
}

function openUpdateModal(ticketId) {
  const item = globalReports.find(r => r.id === ticketId);
  if (!item) return;

  document.getElementById("modal-update-id").textContent = `#${ticketId}`;
  document.getElementById("modal-report-db-id").value = ticketId;
  document.getElementById("modal-update-title").textContent = item.description;
  document.getElementById("update-modal").classList.remove("hidden");
}

function updateMetrics(reports) {
  document.getElementById("cnt-total").textContent = reports.length;
  document.getElementById("cnt-critical").textContent = 0; // backend has no priority field yet
  document.getElementById("cnt-progress").textContent = reports.filter(r => r.status === "In Progress").length;
  document.getElementById("cnt-resolved").textContent = reports.filter(r => r.status === "Resolved").length;
}

// Modal close buttons
document.getElementById("close-details-modal")?.addEventListener("click", () => {
  document.getElementById("details-modal").classList.add("hidden");
});
document.getElementById("close-update-modal")?.addEventListener("click", () => {
  document.getElementById("update-modal").classList.add("hidden");
});
document.getElementById("cancel-update-modal")?.addEventListener("click", () => {
  document.getElementById("update-modal").classList.add("hidden");
});

// Status update submit
document.getElementById("update-status-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ticketId = document.getElementById("modal-report-db-id").value;
  const newStatus = document.getElementById("modal-status-select").value;
  const token = localStorage.getItem("token");

  // Map dropdown values to your backend's actual accept/start/complete routes
  let endpoint = null;
  if (newStatus === "In Progress") endpoint = `/api/reports/${ticketId}/start`;
  else if (newStatus === "Resolved") endpoint = `/api/reports/${ticketId}/complete`;

  if (!endpoint) {
    alert("This status isn't wired to a backend action yet.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      }
    });
    if (!res.ok) throw new Error(`Server returned status ${res.status}`);

    document.getElementById("update-modal").classList.add("hidden");
    fetchReports();
  } catch (err) {
    alert(`Failed to update status: ${err.message}`);
  }
});