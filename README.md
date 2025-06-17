# Urinal Checkmate

A fun game built with Vue.js and a modern npm workflow.

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## Setup

1. **Clone this repository:**

   ```sh
   git clone <your-repo-url>
   cd urinal-checkmate
   ```

2. **Install npm dependencies:**

   ```sh
   npm install
   ```

---

## Usage

### **Build the Project**

This will clean the `docs` folder, compile Sass, copy all assets, and bundle JS:

```sh
npm run build
```

### **Start a Local Development Server with Live Watch**

This will watch for changes in your `dev` folder and update `docs` automatically, while serving the site locally:

```sh
npm run watch
npm run serve
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

### **Manual Tasks**

- **Compile Sass only:**

  ```sh
  npm run sass
  ```

- **Copy HTML:**

  ```sh
  npm run copy:html
  ```

- **Copy Data:**

  ```sh
  npm run copy:data
  ```

- **Copy JS:**

  ```sh
  npm run copy:js
  ```

- **Copy Images:**

  ```sh
  npm run copy:img
  ```

- **Concatenate and minify JS libraries:**
  ```sh
  npm run concat:js
  ```

---

## Notes

- **Sass** is compiled directly using the [sass](https://www.npmjs.com/package/sass) npm package.

---

## Troubleshooting

- If you get errors about missing folders, make sure you have run `npm install` before building or starting.
- If you change the structure of your `dev` or `docs` folders, update the scripts in `package.json`
