/**
 * SoftHub - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initTypedAnimation();
  initSearch();
});

/**
 * Sidebar functionality
 */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const menuToggle = document.getElementById('menu-toggle');
  const sidebarClose = document.getElementById('sidebar-close');

  if (!sidebar || !menuToggle) return;

  const openSidebar = () => {
    sidebar.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    sidebar.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openSidebar);
  sidebarClose?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  // Close on window resize if open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
}

/**
 * Typed.js animation for hero section
 */
function initTypedAnimation() {
  const typedElement = document.getElementById('typed-text');
  
  if (!typedElement || typeof Typed === 'undefined') return;

  new Typed('#typed-text', {
    strings: [
      'Software',
      'Games',
      'Apps',
      'Tools',
      'Utilities'
    ],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

/**
 * Search functionality
 */
function initSearch() {
  const searchInputs = document.querySelectorAll('.search-bar input');
  
  searchInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          // For now, just log - can be extended for actual search
          console.log('Searching for:', query);
          // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
      }
    });
  });
}

/**
 * Show notification toast
 */
function showToast(message, type = 'info') {
  // Remove existing toasts
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
    color: white;
    border-radius: 0.5rem;
    font-weight: 500;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Make showToast globally available
window.showToast = showToast;
