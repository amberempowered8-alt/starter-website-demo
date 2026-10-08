# Starter Website Template: No Monthly Fees

**Own your website. Pay once. No monthly platform fees, ever.**

A clean, professional website with a live catalog for creators and small businesses. Add or update what you sell in a free Airtable base, and your site updates itself automatically. It's hosted free on GitHub Pages, and the code is yours.

Built by **AE9 Labs**.

---

## What's Included

- `index.html`: your website's page layout
- `style.css`: colors, fonts, and spacing (easy to customize)
- `app.js`: your site text and links (edit the `CONFIG` section at the top) plus the code that displays your catalog
- `data/resources.json`: your catalog data, kept in sync with Airtable automatically
- An automated sync (GitHub Action) that copies your published Airtable items into your site on a schedule

---

## How It Works

1. You manage your products or resources in your own **Airtable** base.
2. Your Airtable token is stored as an **encrypted GitHub secret**. It is never pasted into your code and never visible on your site.
3. A scheduled sync pulls your **Published** items from Airtable into `data/resources.json`.
4. Your website reads that file and shows your catalog.

You never paste a token into `app.js` or any other file.

---

## Setup

Follow the **step-by-step Setup Guide (PDF)** included with your purchase. It walks you through:

1. Copying this template into your own GitHub account
2. Duplicating the Airtable base blueprint
3. Adding your Airtable token as a GitHub secret
4. Turning on GitHub Pages so your site goes live
5. Editing your site text and links in `app.js`
6. Connecting a custom domain (optional)

Use the PDF guide as your single source of setup instructions.

---

## Customize Your Colors

Open `style.css` and change the color values in the `:root` section at the top. Every button and accent on your site updates at once.

---

## Good to Know

- **You own this code.** Keep a backup copy of your files so you can always move providers if you choose.
- GitHub and Airtable are third-party platforms. Their free plans and pricing can change, and AE9 Labs isn't responsible for those changes. Both are free to start, and you're never locked into a monthly platform fee from us.
- This is a self-guided DIY setup. Support covers verified bugs in the template itself.

## Want It Done for You?

If you'd rather have your site built and launched for you, ask about the **AE9 Labs** full build service.
