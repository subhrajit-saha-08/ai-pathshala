const fs = require('fs');
let code = fs.readFileSync('page.tsx', 'utf-8');

// 1. Remove dangling </path> and </circle> 
// (because we already made the open tags self-closing!)
code = code.replace(/<\/path>/g, '');
code = code.replace(/<\/circle>/g, '');

// 2. Fix 'main' and 'aside' siblings error in JSX. 
// At line 23: <aside ...> ... <div class="pl-64 ...">
// The wrapper div has `return (<div ...> ${jsx} </div>)`
// The `aside` is inside the wrapper. That should be fine!
// Why does it say JSX element 'main' has no corresponding closing tag?
// Because parsing failed downstream, causing it to lose track of tags.
// Usually due to an unescaped '<' or unclosed string, or unclosed tag like `</path>` which we just fixed.
// Or maybe there is an unescaped entity like `'` ? Let's check for `'`.
// We will replace unescaped ' with &apos; in text nodes.
// A simple way to do this for the specific strings:
code = code.replace(/Sparky's/g, 'Sparky&apos;s');
code = code.replace(/You've/g, 'You&apos;ve');
code = code.replace(/'Cozy Forest Cottage'/g, '&apos;Cozy Forest Cottage&apos;');

// We will also replace unescaped " with &quot; in text nodes, but we have to be careful not to break attributes.
// Let's just fix the specific ones:
code = code.replace(/>"Cosmic Neon Whale"<\//g, '>&quot;Cosmic Neon Whale&quot;</');
code = code.replace(/>"Rover Obstacle Logic"<\//g, '>&quot;Rover Obstacle Logic&quot;</');
code = code.replace(/>"Zero Bias Cat Set"<\//g, '>&quot;Zero Bias Cat Set&quot;</');

// Fix unclosed main: In code.html, let's see if there is a missing closing tag for <main> or <section>.
// Actually, `<!-- ... -->` might have been hiding a closing tag?
// Our regex for comments was `code.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')` which is correct.

// Let's just output the cleaned code.
fs.writeFileSync('page.tsx', code);
console.log('Fixed');
