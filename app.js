// =========================================================================
// STARTER WEBSITE (AIRTABLE-POWERED CATALOG) — CONFIG
// Edit everything in the CONFIG object below. You don't need to touch
// index.html or style.css to customize the content.
//
// Your Airtable catalog is kept up to date automatically and safely —
// see SETUP-GUIDE.md for the one-time setup. You never paste any secret
// token into this file.
// =========================================================================

const CONFIG = {
    siteName: "Your Business Name",

    heroHeadline: "Everything I sell, in one place.",
    heroSubtext: "Browse what's available right now — updated automatically, no broken links, no cluttered link-in-bio page.",

    credentials: [
        "Updated automatically",
        "No monthly hosting fees",
        "You own the code"
    ],

    // The closing call-to-action block at the bottom of the page.
    // Point this at whatever you want visitors to do next — book a call,
    // join your email list, message you, etc.
    closingHeadline: "Want to work together?",
    closingSubtext: "Reach out and let's talk about what you need.",
    closingButtonText: "Get In Touch",
    // CLIENT ACTION REQUIRED: replace with your real contact/checkout link
    closingLink: "https://your-contact-or-checkout-link.com"
};

// =========================================================================
// Rendering — you shouldn't need to edit anything below this line.
// =========================================================================

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderText() {
    document.getElementById('brand-name').textContent = CONFIG.siteName;
    document.getElementById('footer-name').textContent = CONFIG.siteName;
    document.getElementById('hero-subtext').textContent = CONFIG.heroSubtext;

    const heroH1 = document.querySelector('.hero-copy h1');
    if (heroH1) heroH1.textContent = CONFIG.heroHeadline;
}

function renderTrust() {
    const row = document.getElementById('trust-row');
    if (!row) return;
    row.innerHTML = CONFIG.credentials.map(c => `<span>${escapeHTML(c)}</span>`).join('');
}

function renderClosing() {
    const heading = document.getElementById('closing-heading');
    const sub = document.getElementById('closing-subtext');
    const btn = document.getElementById('closing-link');
    if (heading) heading.textContent = CONFIG.closingHeadline;
    if (sub) sub.textContent = CONFIG.closingSubtext;
    if (btn) {
        btn.textContent = CONFIG.closingButtonText;
        btn.href = CONFIG.closingLink;
    }
}

/**
 * Loads your catalog from data/resources.json — a plain data file that a
 * scheduled GitHub Action keeps in sync with your Airtable base. This file
 * never contains your Airtable token; it only contains the published
 * records themselves. See SETUP-GUIDE.md for how the sync works.
 */
async function fetchResources() {
    const container = document.getElementById('resource-container');
    if (!container) return;

    try {
        const response = await fetch('data/resources.json', { cache: 'no-store' });

        if (!response.ok) {
            // The sync hasn't run yet (brand new site) — this is normal right after setup.
            container.innerHTML = `
                <p class="loading">
                    Your catalog will appear here once the automatic sync runs for the first time
                    (usually within a few minutes of finishing setup). See Step 3 in SETUP-GUIDE.md.
                </p>`;
            return;
        }

        const data = await response.json();

        if (!data.records || data.records.length === 0) {
            container.innerHTML = `
                <p class="loading">
                    No live items found yet. Set an item's Status to 'Published' inside your Airtable
                    base to display it here — the next sync will pick it up automatically.
                </p>`;
            return;
        }

        let gridHTML = '';

        data.records.forEach(record => {
            const fields = record.fields || {};

            const name = escapeHTML(fields['Resource Name'] || 'Untitled Item');
            const category = escapeHTML(fields['Category'] || 'Resource');
            const description = escapeHTML(fields['Description'] || '');

            let link = fields['Access Link'] || '#';
            if (link !== '#' && !/^https?:\/\//i.test(link)) {
                link = `https://${link}`;
            }

            let imageUrl = '';
            if (fields['Cover Image'] && Array.isArray(fields['Cover Image']) && fields['Cover Image'].length > 0) {
                const imgObj = fields['Cover Image'][0];
                imageUrl = (imgObj.thumbnails && imgObj.thumbnails.large)
                    ? imgObj.thumbnails.large.url
                    : imgObj.url;
            }

            const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const badgeClass = `badge-${categorySlug}`;

            gridHTML += `
                <article class="card card-anim">
                    ${imageUrl
                        ? `<img src="${escapeHTML(imageUrl)}" alt="${name}" class="card-image" loading="lazy" decoding="async">`
                        : '<div class="card-image" aria-hidden="true"></div>'
                    }
                    <div class="card-content">
                        <span class="badge ${badgeClass}">${category}</span>
                        <h3 class="card-title">${name}</h3>
                        <p class="card-description">${description}</p>
                        <a href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer" class="card-btn">
                            Access
                        </a>
                    </div>
                </article>
            `;
        });

        container.innerHTML = gridHTML;

    } catch (error) {
        console.error('Catalog load error:', error);
        container.innerHTML = `
            <p class="loading">
                Couldn't load the catalog right now. If you just finished setup, give the first sync
                a few minutes — otherwise check the Actions tab in your GitHub repo for errors.
            </p>`;
    }
}

function init() {
    renderText();
    renderTrust();
    renderClosing();
    fetchResources();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
