# Urinal Checkmate

A fun game built with Vue.js, Compass (Sass), and a modern npm/Docker workflow.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (for Compass/Sass compilation)

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

3. **Build the Compass Docker image:**

   ```sh
   docker build -t compass-ruby .
   ```

---

## Usage

### **Build the Project**

This will clean the `docs` folder, compile Sass with Compass (via Docker), copy all assets, and bundle JS:

```sh
npm run build
```

### **Start a Local Development Server with Live Watch**

This will watch for changes in your `dev` folder and update `docs` automatically, while serving the site locally:

```sh
npm start
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

### **Manual Tasks**

- **Compile Sass (Compass) only:**

  ```sh
  npm run compass
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

- **Compass/Sass** is run inside Docker for maximum compatibility.  
  Make sure Docker is running before you build or watch.
- If you are on **Windows**, you may need to adjust the volume path in the `compass` script from `$(pwd)` to `%cd%`.

---

## Troubleshooting

- If you get errors about missing folders, make sure you have run `npm install` and `docker build -t compass-ruby .` before building or starting.
- If you change the structure of your `dev` or `docs` folders, update the scripts in `package.json` accordingly.

---

Enjoy!
