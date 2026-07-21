// js/citizen.js

document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabReport = document.getElementById('tab-report');
  const tabRequestHelp = document.getElementById('tab-request-help');
  const tabHandymanJobs = document.getElementById('tab-handyman-jobs');

  // Sections
  const secReport = document.getElementById('sec-report');
  const secRequestHelp = document.getElementById('sec-request-help');
  const secHandymanJobs = document.getElementById('sec-handyman-jobs');

  const logoutBtn = document.getElementById('logout-btn');

  function resetTabs() {
    [tabReport, tabRequestHelp, tabHandymanJobs].forEach(tab => {
      if (tab) {
        tab.className = 'tab-btn py-3 px-4 text-xs font-bold border-b-2 border-transparent text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap cursor-pointer';
      }
    });

    [secReport, secRequestHelp, secHandymanJobs].forEach(sec => {
      if (sec) sec.classList.add('hidden');
    });
  }

  // --- TAB CLICK HANDLERS ---
  tabReport?.addEventListener('click', () => {
    resetTabs();
    tabReport.className = 'tab-btn py-3 px-4 text-xs font-bold border-b-2 border-blue-500 text-blue-400 flex items-center gap-2 whitespace-nowrap cursor-pointer';
    secReport?.classList.remove('hidden');
  });

  tabRequestHelp?.addEventListener('click', () => {
    resetTabs();
    tabRequestHelp.className = 'tab-btn py-3 px-4 text-xs font-bold border-b-2 border-emerald-500 text-emerald-400 flex items-center gap-2 whitespace-nowrap cursor-pointer';
    secRequestHelp?.classList.remove('hidden');
  });

  tabHandymanJobs?.addEventListener('click', () => {
    resetTabs();
    tabHandymanJobs.className = 'tab-btn py-3 px-4 text-xs font-bold border-b-2 border-purple-500 text-purple-400 flex items-center gap-2 whitespace-nowrap cursor-pointer';
    secHandymanJobs?.classList.remove('hidden');
  });

  // Logout Handler
  logoutBtn?.addEventListener('click', () => {
    window.location.href = 'auth.html';
  });
});