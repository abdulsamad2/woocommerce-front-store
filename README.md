# Headless WooCommerce Front Store

Welcome to the Headless WooCommerce Front Store project! This project provides a headless storefront for WooCommerce, leveraging the WooCommerce REST API for seamless integration. The front store features user authentication implemented with NextAuth.js, a user-friendly UI built using Tailwind CSS and Shadcn UI, user registration utilizing the WooCommerce Create Customer REST API, form validation powered by Zod, and state management handled by Zustand.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Headless WooCommerce Integration:** Connects seamlessly with WooCommerce through the WooCommerce REST API.
- **User Authentication:** Utilizes NextAuth.js for secure user authentication.
- **UI Design:** The user interface is built using Tailwind CSS and Shadcn UI, providing a clean and responsive design.
- **User Registration:** Implements WooCommerce Create Customer REST API for user registration.
- **Form Validation:** Employs Zod for robust form validation.
- **State Management:** Utilizes Zustand for efficient state management.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdulsamad2/headless-woocommerce-front-store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd headless-woocommerce-front-store
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## WordPress Setup

To set up the backend for this project, follow these steps:

## Install WordPress:

- You can install WordPress locally using tools like [XAMPP](https://www.apachefriends.org/index.html) or [MAMP](https://www.mamp.info/en/).
- For online installation, use a hosting provider like [Bluehost](https://www.bluehost.com/) or [SiteGround](https://www.siteground.com/).

## Install WooCommerce:

1. After installing WordPress, go to the admin dashboard.
2. Navigate to "Plugins" > "Add New" and search for "WooCommerce."
3. Install and activate the WooCommerce plugin.

## Create REST API Tokens:

1. In the WordPress admin dashboard, go to "WooCommerce" > "Settings" > "Advanced" > "REST API."
2. Create a new API key with read and write permissions.

## Install JWT Authentication Plugin:

- Install the [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) plugin.
- Follow the plugin's instructions for configuring it, including setting up a secret key and enabling CORS support.

## Configuration

Before using the project, you need to configure it by setting up the necessary environment variables. Create a `.env` file in the project root and add the following:

```env
# WooCommerce REST API Configuration
NEXT_PUBLIC_WOOCOMMERCE_API_URL=https://your-woocommerce-site.com/wp-json/wc/v3
NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY=your-consumer-key
NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET=your-consumer-secret

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
SECRET=your-secret


```
