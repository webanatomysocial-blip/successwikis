const fs = require('fs');
const path = require('path');

const processDir = (dir) => {
    fs.readdirSync(dir).filter(f => f.endsWith('.jsx')).forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Replace the component signature
        const componentName = file.replace('.jsx', '');
        content = content.replace(
            /const\s+\w+\s*=\s*\(\{\s*dynamicRecentPosts\s*\}\)\s*=>\s*\{/,
            `const ${componentName} = ({ dynamicRecentPosts, date }) => {`
        );

        // 2. Inject date={date} into BlogLayout or PodLayout tags
        // Find <BlogLayout or <PodLayout and just append \n      date={date} after it
        content = content.replace(/(<BlogLayout|<PodLayout)(\s)/, '$1\n      date={date}$2');

        fs.writeFileSync(filePath, content, 'utf8');
    }); 
};

processDir('src/success-lens');
processDir('src/blogs');
console.log('Done!');
