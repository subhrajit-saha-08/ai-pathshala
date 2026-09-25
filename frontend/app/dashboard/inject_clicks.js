const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'page.tsx');
let code = fs.readFileSync(file, 'utf8');

// 1. Home
code = code.replace(
  /data-path="dashboard-home"/g,
  `data-path="dashboard-home" onClick={() => router.push('/dashboard')}`
);

// 2. Activities
code = code.replace(
  /data-path="learning-activities"/g,
  `data-path="learning-activities" onClick={() => router.push('/activities')}`
);

// 3. Projects
code = code.replace(
  /data-path="creative-projects"/g,
  `data-path="creative-projects" onClick={() => router.push('/activities')}`
);

// 4. Continue Mission
// We will look for <span>Continue Mission</span> and replace the preceding button tag.
// Since prettier broke it into multiple lines, we can use regex to find the button opening tag.
// Example: <button\n  className="px-space-lg py-space-sm ..."\n  type="button"\n>\n  <span>Continue Mission</span>
code = code.replace(
  /(<button)([^>]*?type="button"[^>]*?>\s*<span>Continue Mission<\/span>)/g,
  (match, p1, p2) => {
    // Add cursor-pointer if not exists
    let newP2 = p2;
    if (!newP2.includes('cursor-pointer')) {
      newP2 = newP2.replace(/className="/, 'className="cursor-pointer ');
    }
    return p1 + ` onClick={() => router.push('/activities/bias-detective')}` + newP2;
  }
);

// 5. Edit Profile
// In code.html: <a href="#" class="font-label-sm text-label-sm text-[#FF4D6D] hover:underline font-semibold flex items-center gap-0.5"><span>Edit Profile</span>
// With prettier it looks like:
// <a
//   href="#"
//   className="..."
// >
//   <span>Edit Profile</span>
code = code.replace(
  /(<a\s+href="#"\s+className="[^"]*?")([^>]*?>\s*<span>Edit Profile<\/span>)/g,
  (match, p1, p2) => {
    let newP1 = p1;
    if (!newP1.includes('cursor-pointer')) {
      newP1 = newP1.replace(/className="/, 'className="cursor-pointer ');
    }
    return newP1 + ` onClick={() => router.push('/profile')}` + p2;
  }
);

fs.writeFileSync(file, code);
console.log('done');
