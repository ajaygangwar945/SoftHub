/**
 * SoftHub - Enhanced 3D Background Logic
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
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    let effectType = 'WAVES'; // Default
    let color = 0x6366f1; // Default Indigo (Primary)

    // Effect Logic based on page
    if (path === '/' || path.endsWith('index.html') || path === '') {
        effectType = 'HALO';
        color = 0x6366f1;
    } else if (path.includes('windows')) {
        effectType = 'GLOBE';
        color = 0x0078D4;
    } else if (path.includes('macos')) {
        effectType = 'GLOBE';
        color = isDark ? 0xffffff : 0x64748b;
    } else if (path.includes('android')) {
        effectType = 'GLOBE';
        color = 0x3DDC84;
    } else if (path.includes('games')) {
        effectType = 'NET';
        color = 0xf59e0b;
    } else if (path.includes('browsers')) {
        effectType = 'WAVES';
        color = 0x0ea5e9;
    } else if (path.includes('communication')) {
        effectType = 'WAVES';
        color = 0x10b981;
    } else if (path.includes('antivirus')) {
        effectType = 'WAVES';
        color = 0xef4444;
    } else if (path.includes('pdf-editors')) {
        effectType = 'WAVES';
        color = 0xf43f5e;
    } else if (path.includes('utilities')) {
        effectType = 'FOG';
        color = 0x64748b;
    } else if (path.includes('video')) {
        effectType = 'WAVES';
        color = 0x8b5cf6;
    } else if (path.includes('music')) {
        effectType = 'WAVES';
        color = 0xd946ef;
    }

    // Detect current theme colors from CSS variables
    const styles = getComputedStyle(document.documentElement);
    const getHexFromVar = (varName) => {
        const c = styles.getPropertyValue(varName).trim();
        if (c.startsWith('#')) return parseInt(c.replace('#', '0x'), 16);
        return 0x0f172a; // Default fallback (dark bg)
    };

    const finalBgColor = getHexFromVar('--bg-main');

    const commonOptions = {
        el: "#hero-3d",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: finalBgColor
    };

    try {
        switch (effectType) {
            case 'HALO':
                vantaEffect = VANTA.HALO({
                    ...commonOptions,
                    size: 1.50,
                    amplitudeFactor: 1.50,
                    xOffset: 0.1,
                    yOffset: 0.1,
                    baseColor: color
                });
                break;
            case 'GLOBE':
                vantaEffect = VANTA.GLOBE({
                    ...commonOptions,
                    size: 0.90,
                    color: color,
                    color2: isDark ? 0x1e293b : 0xe2e8f0
                });
                break;
            case 'NET':
                vantaEffect = VANTA.NET({
                    ...commonOptions,
                    color: color,
                    points: 16.00,
                    maxDistance: 24.00,
                    spacing: 12.00
                });
                break;
            case 'WAVES':
                vantaEffect = VANTA.WAVES({
                    ...commonOptions,
                    color: finalBgColor,
                    shininess: 30.00,
                    waveHeight: 15.00,
                    waveSpeed: 0.80,
                    zoom: 0.75
                });
                // Note: Vanta Waves has slightly different color property behavior
                if (vantaEffect) vantaEffect.setOptions({ color: color });
                break;
            case 'FOG':
                vantaEffect = VANTA.FOG({
                    ...commonOptions,
                    highlightColor: color,
                    midtoneColor: finalBgColor,
                    lowlightColor: finalBgColor,
                    baseColor: finalBgColor,
                    blurFactor: 0.60
                });
                break;
        }
    } catch (err) {
        console.error(`Vanta ${effectType} initialization failed:`, err);
        // Fallback to NET if specific effect fails
        if (effectType !== 'NET') {
            try {
                vantaEffect = VANTA.NET({ ...commonOptions, color: color });
            } catch (e) { console.error('Fallback failed:', e); }
        }
    }

    // Handle theme changes
    if (!window._themeObserver) {
        window._themeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    init3DBackground();
                }
            });
        });
        window._themeObserver.observe(document.documentElement, { attributes: true });
    }

    // Handle resize
    if (hero._vantaResizeObserver) {
        hero._vantaResizeObserver.disconnect();
    }
    const resizeObserver = new ResizeObserver(() => {
        if (vantaEffect) vantaEffect.resize();
    });
    resizeObserver.observe(hero);
    hero._vantaResizeObserver = resizeObserver;
}

// Load dependencies and init
function loadVantaDependencies(callback) {
    const scripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js',
        'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js'
    ];

    let loaded = 0;
    scripts.forEach(url => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            loaded++;
            if (loaded === scripts.length) callback();
        };
        script.onerror = () => {
            console.error(`Failed to load: ${url}`);
            loaded++;
            if (loaded === scripts.length) callback();
        };
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadVantaDependencies(init3DBackground);
});
