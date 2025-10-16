const fs = require('fs');
const path = require('path');
// Function to read and compile CSS
function compileCSS(inputFile, outputFile) {
    const cssContent = fs.readFileSync(inputFile, 'utf-8');
    const imports = cssContent.match(/@import\s+['"]([^'"]+)['"]/g) || [];
    let compiledCSS = '';
    // Read and append each imported CSS file
    imports.forEach(importStatement => {
        const filePath = importStatement.match(/['"]([^'"]+)['"]/)[1];
        const fullPath = path.resolve(path.dirname(inputFile), filePath);
        compiledCSS += fs.readFileSync(fullPath, 'utf-8') + '\n';
    });
    // Write the compiled CSS to the output file
    fs.writeFileSync(outputFile, compiledCSS.trim());
    console.log(`Compiled CSS written to ${outputFile}`);
}
// Usage
const inputCSSFile = 'src/css/bundle.css'; // Your main CSS file
const outputCSSFile = 'public/main.css'; // Output file
compileCSS(inputCSSFile, outputCSSFile);