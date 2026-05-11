const fs = require('fs');
const path = require('path');

// The issue: modify.cjs injected date={date} but the layout JSX was already modified weirdly.
// We need to cleanly reset and re-inject properly.

const processDir = (dir) => {
    fs.readdirSync(dir).filter(f => f.endsWith('.jsx')).forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const componentName = file.replace('.jsx', '');

        // Fix 1: Ensure correct signature with date + postId (but NOT double-modify)
        // Replace any existing broken variant first
        content = content.replace(
            /const\s+\w+\s*=\s*\(\s*\{\s*dynamicRecentPosts(?:,\s*date)?\s*\}\s*\)\s*=>\s*\{/,
            `const ${componentName} = ({ dynamicRecentPosts, date, postId }) => {`
        );

        // Fix 2: Clean up any duplicate date={date} injections that broke JSX
        // Remove any standalone date lines that aren't part of a proper JSX tag
        content = content.replace(/^\s*date=\{date\}\s*$/gm, '');

        // Fix 3: Properly inject date={date} and postId={postId} into the layout open tag
        // Match <BlogLayout or <PodLayout followed by a newline/space (not already having date=)
        if (!content.includes('date={date}')) {
            content = content.replace(/(<BlogLayout|<PodLayout)(\s)/, '$1\n      date={date}\n      postId={postId}$2');
        } else if (!content.includes('postId={postId}')) {
            content = content.replace(/(<BlogLayout|<PodLayout)(\s)/, '$1\n      postId={postId}$2');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', file);
    });
};

processDir('src/success-lens');
processDir('src/blogs');
console.log('\nDone!');
