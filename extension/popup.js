// iCreatePDF Chrome Extension Popup Script

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('toolSearch');
  const clearBtn = document.getElementById('clearSearch');
  const toolsGrid = document.getElementById('toolsGrid');
  const toolCards = toolsGrid.querySelectorAll('.tool-card');
  const noResults = document.getElementById('noResults');

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      let matchCount = 0;

      if (clearBtn) {
        clearBtn.style.display = query.length > 0 ? 'block' : 'none';
      }

      toolCards.forEach((card) => {
        const toolName = (card.getAttribute('data-name') || '').toLowerCase();
        const label = (card.querySelector('.label')?.textContent || '').toLowerCase();
        const matches = toolName.includes(query) || label.includes(query);

        if (matches) {
          card.style.display = 'flex';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        noResults.style.display = matchCount === 0 ? 'block' : 'none';
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        toolCards.forEach((card) => {
          card.style.display = 'flex';
        });
        if (noResults) noResults.style.display = 'none';
        searchInput.focus();
      });
    }
  }

  // Handle all link clicks
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.href;

      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: url });
        if (window.close) window.close();
      } else {
        // Fallback when previewing directly in normal browser
        window.open(url, '_blank');
      }
    });
  });
});
