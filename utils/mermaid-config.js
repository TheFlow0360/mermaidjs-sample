/**
 * Shared Mermaid Configuration
 * Central location for mermaid.js initialization and helper functions
 */

// Default configuration for all diagrams
export const defaultMermaidConfig = {
    startOnLoad: true,
    securityLevel: 'loose',
    theme: 'default',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'linear'
    },
    sequence: {
        mirrorActors: true,
        useMaxWidth: true
    },
    gantt: {
        useMaxWidth: true
    },
    class: {
        useMaxWidth: true
    },
    state: {
        useMaxWidth: true
    },
    er: {
        useMaxWidth: true
    },
    journey: {
        useMaxWidth: true
    },
    mindmap: {
        useMaxWidth: true,
        padding: '20'
    },
    c4: {
        useMaxWidth: true
    },
    gitGraph: {
        useMaxWidth: true
    }
};

/**
 * Initialize Mermaid with configuration
 * Call this in the script tag before rendering diagrams
 */
export function initMermaid(customConfig = {}) {
    if (typeof mermaid !== 'undefined') {
        const config = {
            ...defaultMermaidConfig,
            ...customConfig
        };
        mermaid.initialize(config);
        mermaid.contentLoaded();
    }
}

/**
 * Resize diagram to fit container
 * Useful for responsive behavior
 */
export function resizeDiagram(diagramId) {
    const diagram = document.getElementById(diagramId);
    if (!diagram) return;

    const container = diagram.parentElement;
    const svg = diagram.querySelector('svg');

    if (svg) {
        svg.style.maxWidth = '100%';
        svg.style.height = 'auto';
    }
}

/**
 * Export diagram as SVG
 * Downloads the diagram as an SVG file
 */
export function exportDiagramAsSVG(diagramId, filename = 'diagram.svg') {
    const diagram = document.getElementById(diagramId);
    if (!diagram) {
        console.error(`Diagram with id '${diagramId}' not found`);
        return;
    }

    const svg = diagram.querySelector('svg');
    if (!svg) {
        console.error('SVG element not found in diagram');
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = filename.replace('.svg', '.png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
}

/**
 * Export diagram as PNG
 * Uses canvas to convert SVG to PNG
 */
export function exportDiagramAsPNG(diagramId, filename = 'diagram.png') {
    const diagram = document.getElementById(diagramId);
    if (!diagram) {
        console.error(`Diagram with id '${diagramId}' not found`);
        return;
    }

    const svg = diagram.querySelector('svg');
    if (!svg) {
        console.error('SVG element not found in diagram');
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
}

/**
 * Get diagram data
 * Returns the mermaid definition for a diagram
 */
export function getDiagramData(diagramId) {
    const diagram = document.getElementById(diagramId);
    if (!diagram) return null;

    return {
        id: diagramId,
        content: diagram.textContent,
        type: diagram.getAttribute('data-mermaid-type') || 'unknown'
    };
}

/**
 * Apply custom theme to diagram
 * Supports 'default', 'dark', 'forest', 'neutral'
 */
export function setDiagramTheme(theme = 'default') {
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ theme: theme });
        location.reload();
    }
}

/**
 * Helper to get all diagrams on page
 */
export function getAllDiagrams() {
    return Array.from(document.querySelectorAll('.mermaid'));
}

/**
 * Copy diagram code to clipboard
 */
export function copyDiagramCode(diagramId) {
    const diagram = document.getElementById(diagramId);
    if (!diagram) {
        console.error(`Diagram with id '${diagramId}' not found`);
        return false;
    }

    const code = diagram.textContent;
    navigator.clipboard.writeText(code).then(() => {
        console.log('Diagram code copied to clipboard');
        return true;
    }).catch(err => {
        console.error('Failed to copy to clipboard:', err);
        return false;
    });
}

/**
 * Theme toggle functionality
 * Adds dark mode support to pages
 */
export function initThemeToggle() {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('mermaid-theme') || 'light';
    applyTheme(currentTheme);

    button.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('mermaid-theme', newTheme);
    });
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    // Update mermaid theme
    if (typeof mermaid !== 'undefined') {
        const mermaidTheme = isDark ? 'dark' : 'default';
        mermaid.initialize({ theme: mermaidTheme });
    }
}

// Export all functions for use in HTML
window.MermaidUtils = {
    initMermaid,
    resizeDiagram,
    exportDiagramAsSVG,
    exportDiagramAsPNG,
    getDiagramData,
    setDiagramTheme,
    getAllDiagrams,
    copyDiagramCode,
    initThemeToggle
};
