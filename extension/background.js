// iCreatePDF Chrome Extension - Background Service Worker

const ICREATEPDF_URL = 'https://icreatepdf.com/en';

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // Create main context menu item
    chrome.contextMenus.create({
        id: 'icreatepdf-open',
        title: 'Open with iCreatePDF',
        contexts: ['link', 'page']
    });

    // Create submenu for specific tools
    chrome.contextMenus.create({
        id: 'icreatepdf-merge',
        parentId: 'icreatepdf-open',
        title: 'Merge PDFs',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'icreatepdf-compress',
        parentId: 'icreatepdf-open',
        title: 'Compress PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'icreatepdf-convert',
        parentId: 'icreatepdf-open',
        title: 'Convert to PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'icreatepdf-all-tools',
        parentId: 'icreatepdf-open',
        title: 'All Tools (132+) →',
        contexts: ['link', 'page']
    });

    console.log('iCreatePDF context menus created');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let url = ICREATEPDF_URL;

    switch (info.menuItemId) {
        case 'icreatepdf-merge':
            url = `${ICREATEPDF_URL}/tools/merge-pdf`;
            break;
        case 'icreatepdf-compress':
            url = `${ICREATEPDF_URL}/tools/compress-pdf`;
            break;
        case 'icreatepdf-convert':
            url = `${ICREATEPDF_URL}/tools/jpg-to-pdf`;
            break;
        case 'icreatepdf-all-tools':
        case 'icreatepdf-open':
            url = ICREATEPDF_URL;
            break;
        default:
            url = ICREATEPDF_URL;
    }

    // Open iCreatePDF in a new tab
    chrome.tabs.create({ url: url });
});

// Log when service worker starts
console.log('iCreatePDF background service worker started');
