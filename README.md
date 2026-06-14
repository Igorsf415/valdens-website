# Valden's World 👶

A simple, private website to share photos and milestones of baby Valden with family.

## What each file does

- **`index.html`** — The structure/content of the page: the password screen, the welcome ("hero") section, the photo gallery, and the milestones timeline.
- **`style.css`** — All the visual styling: colors, fonts, layout, spacing, and the responsive (mobile-friendly) design.
- **`script.js`** — The "brains" of the site. This is the **only file you need to edit** to:
  - Change the password
  - Add new photos
  - Add new milestones
- **`images/`** — Folder where you put your photo files (e.g. `.jpg`, `.png`).
- **`.gitignore`** — Tells Git to ignore junk files (like macOS `.DS_Store` files) so they never get uploaded.

## How to add new photos (no coding required!)

The site automatically shows every photo in the `images/` folder — you don't need to edit any files.

1. Go to your repository on GitHub: `https://github.com/Igorsf415/valdens-website`
2. Click into the `images` folder.
3. Click **Add file → Upload files**.
4. Drag in your photo(s). Use simple names with no spaces, e.g. `first-steps.jpg` (the name is also used as the caption, so `first-steps.jpg` becomes "First steps").
5. Click **Commit changes**.
6. Wait about a minute, then refresh the live site — your new photo appears in the gallery automatically!

> Tip: You can also do this from your phone using the GitHub mobile app or mobile browser — handy for uploading photos straight from your camera roll.

> Note: Because the gallery loads the photo list from GitHub, it only works on the live (published) site — not when opening `index.html` directly from your computer.

## How to add a new milestone

In `script.js`, find the `MILESTONES` list and add a new entry:

```js
const MILESTONES = [
  { date: "Month 6", title: "First tooth!", description: "Valden's first tooth came in." },
];
```

Milestones appear on the page in the order you list them.

## How to change the password

In `script.js`, find this line near the top:

```js
const SITE_PASSWORD = "valden2026";
```

Change `"valden2026"` to any password you want, then save the file.

> **Note:** This password protection is meant to keep casual visitors out — it's not bank-level security. The password is stored in plain text inside `script.js`, so anyone who is determined enough to view the page's source code could find it. This is normal and fine for a private family site, just don't use a password you use anywhere important.

---

## Pushing to GitHub & going live with GitHub Pages

Follow these steps to put the site online for free.

### 1. Create a GitHub account (if you don't have one)

Go to [github.com](https://github.com) and sign up — it's free.

### 2. Create a new repository on GitHub

1. Click the **+** icon in the top right → **New repository**.
2. Name it something like `valdens-website`.
3. Choose **Public** (required for free GitHub Pages) — or **Private** if you have a paid plan that supports Pages.
4. Do **NOT** check "Add a README" (you already have one).
5. Click **Create repository**.

### 3. Push your code to GitHub

Open a terminal in this project folder and run the commands GitHub shows you, which will look like this (replace `YOUR-USERNAME` with your GitHub username):

```bash
cd /Users/igor/Desktop/valdens-website
git remote add origin https://github.com/YOUR-USERNAME/valdens-website.git
git branch -M main
git push -u origin main
```

(The repo has already been initialized and the first commit made for you — these commands just connect it to GitHub and upload it.)

### 4. Enable GitHub Pages

1. On your repository's GitHub page, click **Settings**.
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment" → "Source", choose **Deploy from a branch**.
4. Under "Branch", choose **main** and folder **/ (root)**, then click **Save**.
5. Wait about 1–2 minutes. Refresh the page — GitHub will show you a URL like:

   ```
   https://YOUR-USERNAME.github.io/valdens-website/
   ```

That's your live website! Share that link (and the password) with family.

### 5. Updating the site later

Whenever you add new photos or milestones:

```bash
cd /Users/igor/Desktop/valdens-website
git add .
git commit -m "Add new photos and milestones"
git push
```

GitHub Pages will automatically update the live site within a minute or two.
