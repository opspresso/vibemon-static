# vibemon-static

A simple HTTP server for serving static files (JS, PNG, etc.) from the `docs` folder.

## Features

- Serves static files from the `docs` directory
- Supports common file types: HTML, CSS, JavaScript, images (PNG, JPG, GIF, SVG), etc.
- Simple and lightweight using Node.js built-in HTTP module
- No external dependencies required

## Installation

```bash
# Clone the repository
git clone https://github.com/nalbam/vibemon-static.git
cd vibemon-static

# No dependencies to install!
```

## Usage

```bash
# Start the server
npm start

# Or run directly
node server.js
```

The server will start on port 8080 by default. You can customize the port using the `PORT` environment variable:

```bash
PORT=3000 npm start
```

## Access

Once the server is running, open your browser and navigate to:

- http://localhost:8080/

The server will serve files from the `docs` folder. The main page (`index.html`) will be served at the root path.

## Files Served

The `docs` folder contains:
- `index.html` - Main HTML page
- `style.css` - Stylesheet
- `app.js` - JavaScript application
- `logo.png` - Sample image file

## Project Structure

```
vibemon-static/
├── docs/           # Static files to be served
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── logo.png
├── server.js       # HTTP server
├── package.json
└── README.md
```

## License

ISC
