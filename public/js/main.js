/**
 * SoftHub - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initTheme();
  initTypedAnimation();
  initSearch();
  initAuthUI();
});

/**
 * Initialize Auth UI
 * Updates navbar and sidebar based on user login state
 */
function initAuthUI() {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  updateNavbarAuth(user);
  updateSidebarAuth(user);
}

function updateNavbarAuth(user) {
  const navbarRight = document.querySelector('.navbar-right');
  if (!navbarRight) return;

  const signInBtn = navbarRight.querySelector('.btn-primary');

  if (user) {
    if (signInBtn) signInBtn.remove();

    // Check if user info already exists to avoid duplicates
    const existingUserInfo = navbarRight.querySelector('.user-info');
    if (existingUserInfo) existingUserInfo.remove();

    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.style.display = 'flex';
    userInfo.style.alignItems = 'center';
    userInfo.style.gap = '1rem';

    userInfo.innerHTML = `
      <span style="font-weight: 500; font-size: 0.9rem;">${user.name}</span>
      <button onclick="logout()" class="btn btn-primary btn-sm" style="padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">
        Log Out
      </button>
    `;

    navbarRight.appendChild(userInfo);
  } else {
    // Ensure Sign In button exists if not logged in
    const existingUserInfo = navbarRight.querySelector('.user-info');
    if (existingUserInfo) {
      existingUserInfo.remove();

      if (!signInBtn) {
        const btn = document.createElement('a');
        btn.href = 'auth/login.html';
        btn.className = 'btn btn-primary';
        btn.textContent = 'Sign In';
        navbarRight.appendChild(btn);
      }
    }
  }
}

function updateSidebarAuth(user) {
  const sidebarUser = document.querySelector('.sidebar-user');
  if (!sidebarUser) return;

  const infoContainer = sidebarUser.querySelector('.sidebar-user-info');
  const title = infoContainer.querySelector('h4');
  const subtitle = infoContainer.querySelector('p');

  if (user) {
    // Show only username, no logout action in sidebar as requested
    sidebarUser.href = '#';
    sidebarUser.onclick = (e) => e.preventDefault();

    title.textContent = user.name;
    subtitle.textContent = 'Welcome back'; // Neutral text
  } else {
    sidebarUser.href = 'auth/login.html';
    sidebarUser.onclick = null;

    title.textContent = 'Sign In';
    subtitle.textContent = 'Access your account';
  }
}

function logout() {
  localStorage.removeItem('user');
  showToast('Logging out...', 'info');
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

// Make logout globally available
window.logout = logout;

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
    background: ${type === 'success' ? 'var(--secondary)' : type === 'error' ? 'var(--accent)' : 'var(--primary)'};
    color: var(--text-inverse);
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

/**
 * Theme Toggle Functionality
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const currentTheme = savedTheme || systemTheme;

  // Apply initial theme - Always set attribute to resolve CSS selector issues
  html.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

// Make showToast globally available
window.showToast = showToast;
