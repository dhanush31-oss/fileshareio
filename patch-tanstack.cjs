const fs = require("fs");
const path = require("path");

const targets = [
  path.join(__dirname, "node_modules/@tanstack/start-client-core/src/createCsrfMiddleware.ts"),
  path.join(__dirname, "node_modules/@tanstack/start-client-core/dist/esm/createCsrfMiddleware.js"),
];

for (const file of targets) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    if (content.includes("createMiddleware().server")) {
      content = content.replace(
        /const middleware = createMiddleware\(\)\.server/g,
        "const getMw = typeof createMiddleware === 'function' ? createMiddleware : () => ({ server: (h) => h, client: (h) => h });\n  const middleware = getMw().server",
      );
      fs.writeFileSync(file, content, "utf8");
      console.log(`[patch-tanstack] Successfully patched: ${file}`);
    }
  }
}
