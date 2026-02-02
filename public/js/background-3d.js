/**
 * SoftHub - 3D Background Logic
 * Uses Vanta.js for premium animated backgrounds
 */

let vantaEffect;

function init3DBackground() {
    const hero = document.getElementById('hero-3d');
    if (!hero) return;

    // Cleanup existing effect before re-initializing
    if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = null;
    }

    // Determine theme and colors based on page context
    const path = window.location.pathname;
    let effectType = 'NET';
    let color = 0x6366f1; // Default Indigo

    if (path.includes('windows')) {
        color = 0x0078D4;
    } else if (path.includes('macos')) {
        // macOS uses silver/gray for better visibility
        color = document.documentElement.getAttribute('data-theme') === 'dark' ? 0xffffff : 0x64748b;
    } else if (path.includes('android')) {
        color = 0x3DDC84;
    } else if (path.includes('games')) {
        color = 0xf59e0b;
    } else if (path.includes('browsers')) {
        color = 0x0ea5e9;
    } else if (path.includes('communication')) {
        color = 0x10b981;
    } else if (path.includes('antivirus')) {
        color = 0xef4444;
    } else if (path.includes('pdf-editors')) {
        color = 0xf43f5e;
    } else if (path.includes('utilities')) {
        color = 0x64748b;
    } else if (path.includes('video')) {
        color = 0x8b5cf6;
    } else if (path.includes('music')) {
        color = 0xd946ef;
    }

    // Detect current theme colors from CSS variables
    const styles = getComputedStyle(document.documentElement);
    const getHexFromVar = (varName) => {
        const color = styles.getPropertyValue(varName).trim();
        if (color.startsWith('#')) return parseInt(color.replace('#', '0x'), 16);
        return backgroundColor; // fallback
    };

    const finalBgColor = getHexFromVar('--bg-main');
    const finalPointsColor = color; // Keep points bright



    try {
        if (effectType === 'FOG') {
            vantaEffect = VANTA.FOG({
                el: "#hero-3d",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: color,
                midtoneColor: finalBgColor,
                lowlightColor: finalBgColor,
                baseColor: finalBgColor,
                blurFactor: 0.60,
                speed: 1.00,
                zoom: 1.00
            });
        } else if (effectType === 'NET') {
            vantaEffect = VANTA.NET({
                el: "#hero-3d",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: color,
                backgroundColor: finalBgColor,
                points: 12.00,
                maxDistance: 22.00,
                spacing: 15.00
            });
        }
    } catch (err) {
        console.error('Vanta initialization failed:', err);
    }

    // ... logic above ...

    // Handle theme changes - prevent duplicate observers
    if (!window._themeObserver) {
        window._themeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    // Re-initialize for color updates
                    init3DBackground();
                }
            });
        });
        window._themeObserver.observe(document.documentElement, { attributes: true });
    }

    // Cleanup previous resize observer
    if (hero._vantaResizeObserver) {
        hero._vantaResizeObserver.disconnect();
    }

    // Use ResizeObserver for robust responsiveness (sidebar toggles, layout shifts)
    const resizeObserver = new ResizeObserver(() => {
        if (vantaEffect) {
            vantaEffect.resize();
        }
    });

    resizeObserver.observe(hero);
    hero._vantaResizeObserver = resizeObserver;
}

// Load dependencies and init
function loadVantaDependencies(callback) {
    const scripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js'
    ];

    function loadNext(index) {
        if (index >= scripts.length) {
            callback();
            return;
        }

        const script = document.createElement('script');
        script.src = scripts[index];
        script.onload = () => loadNext(index + 1);
        script.onerror = () => {
            console.error(`Failed to load script: ${scripts[index]}`);
            // Continue anyway to try loading others or at least not block
            loadNext(index + 1);
        };
        document.head.appendChild(script);
    }

    loadNext(0);
}

document.addEventListener('DOMContentLoaded', () => {
    loadVantaDependencies(init3DBackground);
});
