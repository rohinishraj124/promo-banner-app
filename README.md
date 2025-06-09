# Shopify Promotional Banner App

This project is a Shopify application designed to help merchants easily display an attractive and customizable free shipping banner on their storefronts. The app consists of a Node.js backend (likely built with Remix, given your `loader` function) for app authentication and management, and a Theme App Extension for seamless injection of the banner into the Shopify theme.

## 🚀 Features

* **Seamless Banner Injection:** Adds a visually appealing "Free Shipping" banner to the top of any Shopify storefront using Theme App Extensions.
* **Customizable Content:** Merchants can easily change the banner text, background color, and text color directly from the Shopify Theme Editor.
* **Toggle Visibility:** The banner can be easily enabled or disabled by the merchant in the Theme Editor.
* **Responsive Design:** The banner is designed to look great and function across all devices (desktop, tablet, mobile).
* **Smooth Animations:** Includes subtle entrance and pulsing animations for a dynamic feel.
* **Close Button:** Allows customers to dismiss the banner if desired.

## 🛠️ Tech Stack

* **Backend:** Node.js (specifically, a Shopify app template, often utilizing [Remix](https://remix.run/) for the frontend framework within the app).
* **Shopify Integration:** [Shopify CLI](https://shopify.dev/docs/apps/tools/cli), [Shopify App Bridge](https://shopify.dev/docs/apps/tools/app-bridge).
* **Frontend (Banner):** HTML, Custom CSS (inspired by Tailwind CSS concepts), JavaScript (for close button).
* **Deployment:** Vercel (for the Node.js backend).
* **Theme Integration:** Shopify Theme App Extensions (Liquid templates).

## 📋 Prerequisites

Before you begin, ensure you have the following:

* A [Shopify Partner Account](https://partners.shopify.com/signup).
* A [Shopify Development Store](https://shopify.dev/docs/apps/getting-started/create-development-store) for testing.
* [Node.js](https://nodejs.org/en/) (LTS version recommended) installed.
* [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/lang/en/) for package management.
* [Shopify CLI](https://shopify.dev/docs/apps/tools/cli) installed and authenticated (`shopify login`).

## ⚙️ Setup & Installation

Follow these steps to set up and deploy your Shopify Promotional Banner App.

### 1. Shopify App Backend Setup (Local Development)

This assumes you've already created a Shopify app project using the Shopify CLI (e.g., `shopify app init` with the Node.js/Remix template).

1.  **Navigate to your app's root directory:**
    ```bash
    cd your-shopify-app-name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Start your local development server:**
    ```bash
    npm run dev
    # or
    shopify app dev
    ```
    This command will:
    * Start your Node.js backend server.
    * Generate a `trycloudflare.com` tunnel URL (e.g., `https://george-accurate-votes-vacancies.trycloudflare.com`) for local testing.
    * Provide a link to install your app on your development store.

### 2. Deploying the Backend to Vercel

The backend of your Shopify app needs to be publicly accessible for Shopify's OAuth flow.

1.  **Build your Node.js app for production:**
    (Consult your specific Node.js/Remix project's build commands, typically `npm run build` or `shopify app build`).
2.  **Deploy your app to Vercel:**
    * Make sure your project is connected to a Git repository (GitHub, GitLab, Bitbucket).
    * Use the Vercel CLI (`vercel`) or connect your Git repository directly via the [Vercel Dashboard](https://vercel.com/dashboard).
    * Vercel will automatically detect your Node.js project and deploy it.

### 3. Shopify Partner Dashboard Configuration

After deploying your backend to Vercel, you *must* configure your app in the Shopify Partner Dashboard.

1.  **Log in** to your [Shopify Partner Dashboard](https://partners.shopify.com/).
2.  Navigate to **Apps** > **[Your App Name]**.
3.  Go to **App setup**.
4.  **App URL:** Set this to your Vercel deployment's primary domain (e.g., `https://your-vercel-domain.vercel.app`).
5.  **Allowed redirection URL(s):** This is crucial for the OAuth callback after a merchant authorizes your app. It should typically be `https://your-vercel-domain.vercel.app/auth/callback` (or the specific OAuth callback path defined in your Node.js backend).
6.  **Save** your changes.

### 4. App Installation on a Development Store

1.  From your Shopify Partner Dashboard, on your app's overview page, click the "Install app" button or follow the provided installation link for your development store.
2.  You will be redirected to your Vercel-hosted login page. Enter your development store's `.myshopify.com` URL (e.g., `your-store-name.myshopify.com`).
3.  Follow the prompts to authorize and install the app. Once complete, you will be redirected to your embedded app within the Shopify admin.

### 5. Theme App Extension Setup (for the Banner)

This is how the banner gets injected into your Shopify storefront.

1.  **Generate a new Theme App Extension:**
    In your app's root directory (the same one as step 1.1), run:
    ```bash
    shopify app generate extension
    ```
    * Choose `Theme app extension`.
    * Give it a descriptive name (e.g., `promotional-banner-extension`).

2.  **Update `app-block.liquid`:**
    * Navigate to the newly created extension's `blocks` directory (e.g., `extensions/promotional-banner-extension/blocks/`).
    * Open `app-block.liquid` (or a similar `.liquid` file created by the template).
    * **Replace its entire content** with the code from the `shopify-banner-liquid` artifact provided. This includes the HTML, CSS, and `{% schema %}` Liquid block.

3.  **Create `app.js`:**
    * Navigate to the extension's `assets` directory (e.g., `extensions/promotional-banner-extension/assets/`).
    * Create a new file named `app.js`.
    * Paste the JavaScript code from the `shopify-banner-js` artifact into this `app.js` file.

4.  **Deploy the Theme App Extension:**
    From your app's root directory, deploy your entire app (including the new extension):
    ```bash
    shopify app deploy
    ```
    Follow the prompts to deploy to Shopify.

5.  **Activate the Banner in Your Shopify Theme Editor:**
    * Go to your Shopify admin (`admin.myshopify.com`).
    * Navigate to `Online Store` > `Themes`.
    * Click the **Customize** button on your current theme.
    * In the theme editor, on the left sidebar, look for **Add section** or **Add block**.
    * Find your "Promotional Banner" block (it will be listed under "Apps").
    * Click to add it to your theme. **Drag and drop it to the very top** of your theme structure for optimal visibility.
    * Use the settings sidebar on the right to customize the "Banner Text," "Banner Background Color," "Banner Text Color," and toggle "Show Banner."
    * Click **Save** in the top right corner.

## 🚀 Usage

Once installed and activated:

* **For Merchants:** Access the banner settings via `Online Store` > `Themes` > `Customize` in your Shopify Admin. Select the "Promotional Banner" section to modify its appearance and content.
* **For Customers:** The banner will automatically appear at the top of your Shopify storefront as configured by the merchant.

## 🐛 Troubleshooting

* **"Refused to Connect" (on `trycloudflare.com`):**
    * This usually means your local development server (`npm run dev` or `shopify app dev`) is not running or the `cloudflared` tunnel has stopped. Ensure your local server is active in your terminal.
* **Blank Embedded App UI (after login in admin):**
    * **Check Shopify Partner Dashboard:** Verify that your "App URL" and "Allowed redirection URL(s)" precisely match your Vercel deployment domain.
    * **Vercel Logs:** Inspect your Vercel deployment logs for any build or runtime errors.
    * **Browser Console Errors:** Open your browser's developer console (F12) in the Shopify admin and look for JavaScript errors or failed network requests. This often points to issues with Shopify App Bridge integration or missing frontend assets.


## 🤝 Contributing

Feel free to fork this repository, open issues, or submit pull requests.

## 📄 License

This project is open-sourced under the MIT License.
