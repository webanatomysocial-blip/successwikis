<?php
// Function to ensure absolute URL
function getAbsoluteUrl($path, $baseUrl)
{
    if (strpos($path, 'http') === 0)
        return $path;
    return rtrim($baseUrl, '/') . '/' . ltrim($path, '/');
}

// Function to optimize Image for OG Tags (Size + Aspect Ratio)
// Uses images.weserv.nl to resize, pad, and compress on the fly.
// Solves: 1. WhatsApp 300KB limit (compression) 2. LinkedIn cropping (fit=contain)
function getOptimizedOgImage($url)
{
    // Check if URL is localhost or development URL
    // images.weserv.nl cannot access localhost, so return URL as-is for dev
    if (strpos($url, 'localhost') !== false || strpos($url, '127.0.0.1') !== false || strpos($url, '.local') !== false) {
        return $url;
    }
    
    // Encode the source URL
    $encodedUrl = urlencode($url);
    // w=1200&h=630 (Standard OG Size)
    // fit=contain (Adds padding instead of cropping/cutting)
    // output=jpg (Broad compatibility)
    // q=80 (Quality compression to ensure <300KB)
    // bg=ffffff (White background for padding)
    return "https://images.weserv.nl/?url=" . $encodedUrl . "&w=1200&h=630&fit=contain&output=jpg&q=80&bg=ffffff";
}

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Determine protocol and host dynamically
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'];
$baseUrl = $protocol . $host;

// Default Meta Tags
$defaultTitle = "Startup Success & Entrepreneur Stories Hub | SuccessWikis";
$defaultDesc = "Explore startup success stories and real entrepreneur journeys on SuccessWikis. Learn from founders, innovators and creators shaping the future with purpose.";
// Absolute -> Optimized
$defaultAbsImage = getAbsoluteUrl("/assets/logo.png", $baseUrl);
$defaultImage = getOptimizedOgImage($defaultAbsImage);
$defaultUrl = $baseUrl . "/";

$title = $defaultTitle;
$description = $defaultDesc;
$image = $defaultImage;
$url = $defaultUrl;

// Robots Tag Logic
// Default: Allow large image previews (good for blogs/articles)
$robotsContent = "index, follow, max-image-preview:large";

// Homepage: Hide image in Google Search results (max-image-preview:none)
if ($path === '/' || $path === '/index.php') {
    $robotsContent = "index, follow, max-image-preview:none";
}

// 1. Blog Metadata
// Data from src/blogs/metadata.js
$blogMetadata = [
    [
        "id" => "AmbitionPost",
        "title" => "Why Ambition Is Changing and Why It Matters | SuccessWikis",
        "slug" => "ambition-is-changing",
        "metaDescription" => "Explore how ambition is shifting from loud hustle to clarity, balance, and purpose, and why building slower and more intentionally matters in today’s world.",
        "image" => "/assets/blogs/blogs-images/1.png",
        "url" => $baseUrl . "/blogs/ambition-is-changing"
    ],
    [
        "id" => "FearFounderPost",
        "title" => "The Fear Behind Every Founder’s Confidence | SuccessWikis",
        "slug" => "fear-every-founder-has",
        "metaDescription" => "An honest look at the hidden fear behind every founder’s confidence, why it exists, and how caring deeply about what you build often feels like doubt.",
        "image" => "/assets/blogs/blogs-images/2.png",
        "url" => $baseUrl . "/blogs/fear-every-founder-has"
    ],
    [
        "id" => "FiguredOutPost",
        "title" => "You Don't Need to Have It All Figured Out | SuccessWikis",
        "slug" => "dont-need-figured-out",
        "metaDescription" => "Explore why uncertainty is part of growth, and learn how not having everything figured out can lead to curiosity, action and meaningful progress in life and work.",
        "image" => "/assets/blogs/blogs-images/3.jpeg",
        "url" => $baseUrl . "/blogs/dont-need-figured-out"
    ],
    [
        "id" => "TellStoryPost",
        "title" => "How to Tell Your Story Without Feeling Like PR | SuccessWikis",
        "slug" => "how-to-tell-story",
        "metaDescription" => "Learn how to tell your story honestly without sounding like PR. Simple storytelling tips to share real moments, connect with people, and stay authentic.",
        "image" => "/assets/blogs/blogs-images/4.jpeg",
        "url" => $baseUrl . "/blogs/how-to-tell-story"
    ],
];

// 2. Pod Metadata
$podMetadata = [
    [
        "id" => "RaghavFoundationPost",
        "title" => "Raghav Foundation: Building Schools, Shaping Futures",
        "slug" => "raghav-foundation",
        "categorySlug" => "driven-by-purpose",
        "metaDescription" => "Raghav Foundation helps school founders with planning, operations, training and long-term support to turn ideas into fully functioning schools across India.",
        "image" => "/assets/Driven-by-Purpose/Raghav.png",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "ZenithEnergyPost",
        "title" => "Zenith Energy and Building Smarter, Cleaner Businesses",
        "slug" => "zenith-energy",
        "categorySlug" => "driven-by-purpose",
        "metaDescription" => "Zenith Energy helps businesses cut energy use, design clean systems, track carbon emissions, and build practical roadmaps for long-term sustainability.",
        "image" => "/assets/Driven-by-Purpose/zenith.png",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "AECSastraPost",
        "title" => "AEC Sastra Building Future AEC Professionals Worldwide",
        "slug" => "aec-sastra",
        "categorySlug" => "driven-by-purpose",
        "metaDescription" => "AEC Sastra offers hands-on BIM training and industry mentoring to help architects and engineers build globally certified careers across AEC projects worldwide.",
        "image" => "/assets/Driven-by-Purpose/AEC-1.png",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "DesiDipsPost",
        "title" => "Desi Dips and the Return of Authentic Chutney Flavors",
        "slug" => "desi-dips",
        "categorySlug" => "driven-by-purpose",
        "metaDescription" => "Desi Dips brings preservative-free South Indian chutneys made in small batches using farm-fresh ingredients while supporting women and local communities.",
        "image" => "/assets/Driven-by-Purpose/Desi-Dips.png",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "TariniSaiPost",
        "title" => "How Tarini Sai Is Restoring Trust on the Internet Safely",
        "slug" => "tarini-sai",
        "categorySlug" => "stage-behind-the-story",
        "metaDescription" => "Tarini Sai Padmanabhan shares how Axory AI detects deepfakes and verifies digital content to protect people, restore online trust, and fight misuse of AI.",
        "image" => "/assets/The-stage-behind-the-story/Tarini-Sai-Padmanabhan.jpeg",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "SoldierRewiredPost",
        "title" => "The Soldier Who Rewired the Future One STEM Lab at a Time",
        "slug" => "soldier-rewired",
        "categorySlug" => "stage-behind-the-story",
        "metaDescription" => "The story of Col. Merugu Solomon Saneev and how STEMClub brings affordable STEM labs to schools, helping children learn robotics, science and innovation hands-on.",
        "image" => "/assets/The-stage-behind-the-story/The-Soldier.jpeg",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "ManWhoBuildsSchoolsPost",
        "title" => "TMan Who Builds Schools for People Who Dream of Building Them",
        "slug" => "man-who-builds-schools",
        "categorySlug" => "stage-behind-the-story",
        "metaDescription" => "The story of Ravi Madabhushi and how Raghav Foundation supports school builders with hands-on guidance, clear planning, mentoring, and long-term support.",
        "image" => "/assets/The-stage-behind-the-story/raghav.jpeg",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "JogeeswaraPost",
        "title" => "When Trial and Error Turns Into Direction",
        "slug" => "when-trial-and-error-turns-into-direction",
        "categorySlug" => "stage-behind-the-story",
        "metaDescription" => "Jogeeswara's journey from curiosity and experimentation with machine learning models to building J Agents, an AI system for automating business workflows.",
        "image" => "/assets/The-stage-behind-the-story/JOG.webp",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "ManojGarlapatiPost",
        "title" => "Manoj Garlapati Wasn't Planning to Build a Startup. He Was Just Paying Attention",
        "slug" => "manoj-garlapati",
        "categorySlug" => "stage-behind-the-story",
        "metaDescription" => "Manoj Garlapati shares how paying attention to a broken hiring process led him to create Aspivance, a platform connecting talent with opportunity.",
        "image" => "/assets/The-stage-behind-the-story/Manoj.webp",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "GreenRecykloplastPost",
        "title" => "Turning Waste Into Worth: Green Recykloplast Story",
        "slug" => "green-recykloplast",
        "categorySlug" => "stage-behind-the-story",
        "metaDescription" => "Raghuram Natarajan shares how Green Recykloplast recycles multi-layer plastics into pallets, benches, bricks and other durable products for a circular economy.",
        "image" => "/assets/The-stage-behind-the-story/grp.webp",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "NexGenSoftwarePost",
        "title" => "Building NexGen Software Solutions on Trust and Transparency",
        "slug" => "nexgen-software",
        "categorySlug" => "stage-behind-the-story",
        "metaDescription" => "Venkat shares how NexGen Software Solutions connects IT talent with clients through transparent staffing, people-first values, and growing trust in the U.S. market.",
        "image" => "/assets/The-stage-behind-the-story/venkat.webp",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "WestfieldInternationalPost",
        "title" => "Kasturi Manjula: Guiding Parents and Building Schools",
        "slug" => "westfield-international",
        "categorySlug" => "stage-behind-the-story",
        "metaDescription" => "Kasturi Manjula's journey in education spans school consulting parent guidance, teacher training, and building Westfield International School with a vision now.",
        "image" => "/assets/The-stage-behind-the-story/wf.webp",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "LeenusInfraPost",
        "title" => "How Leenus Infra Builds Complete Piping Infrastructure Solutions",
        "slug" => "leenus-infra",
        "categorySlug" => "founders-unfiltered",
        "metaDescription" => "Leenus Infra delivers end-to-end piping, drainage and water supply systems using Supreme Pipes, with expert design, installation, and full project support.",
        "image" => "/assets/founders-unfiltered/leenus.png",
        "category" => "Founder's Unfiltered",
    ],
    [
        "id" => "SindhuReddyPost",
        "title" => "Sindhu Reddy on Zenith Energy and Net Zero Journey",
        "slug" => "sindhu-reddy",
        "categorySlug" => "founders-unfiltered",
        "metaDescription" => "Sindhu Reddy shares how Zenith Energy helps businesses cut energy waste, reduce emissions, and build long-term sustainability roadmaps toward net zero.",
        "image" => "/assets/founders-unfiltered/sindu.png",
        "category" => "Founder's Unfiltered",
    ],
    [
        "id" => "RaghuBodduPost",
        "title" => "Raghu Boddu on ToggleNow, SAP Security and AI Innovation",
        "slug" => "raghu-boddu",
        "categorySlug" => "founders-unfiltered",
        "metaDescription" => "An interview with Raghu Boddu on building ToggleNow, SAP security and governance, AI-powered solutions, Digybots, and the future of enterprise technology.",
        "image" => "/assets/founders-unfiltered/raghu.jpeg",
        "category" => "Founder's Unfiltered",
    ],
];

// 3. Success Lens Metadata
$successLensMetadata = [
    [
        "id" => "TorrentPharmaFDA",
        "title" => "Torrent Pharma’s Dahej Facility Clears US FDA Inspection With Zero Observations",
        "slug" => "torrent-pharma-fda-inspection",
        "metaDescription" => "Torrent Pharma's Dahej facility clears US FDA inspection with zero observations.",
        "image" => "/assets/success-wire/torrent-pharma.webp",
    ],
    [
        "id" => "VigyanShaalaAward",
        "title" => "VigyanShaala Wins Nikkei Asia Award, Putting Rural STEM Education on the Global Map",
        "slug" => "vigyanshaala-nikkei-asia-award",
        "metaDescription" => "Grassroots non-profit VigyanShaala wins Nikkei Asia Award for expanding STEM access to rural India.",
        "image" => "/assets/success-wire/asia-nikkei.webp",
    ],
    [
        "id" => "NeemansFunding",
        "title" => "Neeman’s Raises ₹35.5 Cr to Scale Sustainable D2C Footwear",
        "slug" => "neemans-funding-growth",
        "metaDescription" => "Neeman’s secures ₹35.5 crore in extended Series B funding to expand sustainable footwear lines, strengthen D2C growth, and scale manufacturing and distribution.",
        "image" => "/assets/success-wire/neemans-tn.webp",
    ],
    [
        "id" => "LucknowAIHub",
        "title" => "Lucknow Emerges as India’s Next AI Innovation Hub Now Today!",
        "slug" => "lucknow-india-next-ai-hub",
        "metaDescription" => "Lucknow steps into the national AI spotlight by hosting the IndiaAI–MeitY Mega Meet, highlighting how tier-2 cities are driving India’s regional AI growth.",
        "image" => "/assets/success-wire/Lucknow.webp",
    ],
    [
        "id" => "NightSolarTech",
        "title" => "Night-Solar Tech Advances with Thermoradiative Cells Today",
        "slug" => "night-solar-tech",
        "metaDescription" => "Scientists develop night-solar technology using thermoradiative cells that generate electricity after dark, reducing reliance on batteries and fossil fuels.",
        "image" => "/assets/success-wire/solar.webp",
    ],
    [
        "id" => "JPMorganEarnings",
        "title" => "JPMorgan Chase Q4 Earnings, Dividend & Leadership Shift",
        "slug" => "jpmorgan-chase-earnings",
        "metaDescription" => "JPMorgan Chase reports strong Q4 earnings, raises its dividend, and announces key leadership changes as it navigates legal challenges and succession planning.",
        "image" => "/assets/success-wire/jp-morgon.jpeg",
    ],
    [
        "id" => "FintechIPOWave",
        "title" => "India’s Fintech IPO Wave: KreditBee, Fibe & MoneyView",
        "slug" => "fintech-ipo-wave",
        "metaDescription" => "India’s fintech IPO wave builds as KreditBee, Fibe, and MoneyView prepare for 2026 listings, signaling maturity, governance focus, and public market readiness.",
        "image" => "/assets/Driven-by-Purpose/Fintech.jpeg",
    ],
    [
        "id" => "GoogleAIHub",
        "title" => "Google Invests $15B in AI Hub & Data Center Expansion",
        "slug" => "google-invest-15-billion-ai",
        "metaDescription" => "Google commits $15 billion over five years to build a large AI hub and data center infrastructure in India, boosting jobs, innovation, and AI ecosystem growth.",
        "image" => "/assets/success-wire/google.png",
    ],
    [
        "id" => "SharkTankHoora",
        "title" => "Hoora Success: From Shark Tank Rejection to ₹5 Cr Funding",
        "slug" => "shark-tank-hoora-success",
        "metaDescription" => "Learn how Hoora bounced back after Shark Tank India rejection, raised ₹5 Cr, expanded vehicle care services, and grew its auto-care startup nationwide. ",
        "image" => "/assets/success-wire/Shark-tank.jpeg",
    ],
    [
        "id" => "HandmadeRoots",
        "title" => "Handmade Roots to Global Movement: Craft Goes Worldwide",
        "slug" => "handmade-roots-global-movement",
        "metaDescription" => "Handmade traditions are evolving into a global movement, linking artisans to markets while preserving culture, sustainability, and craft-led growth worldwide.",
        "image" => "/assets/success-wire/taavi.jpeg",
    ],
    [
        "id" => "HypeToHabit",
        "title" => "AI Investments Move from Hype to Habit, Defining New Normal",
        "slug" => "hype-to-habit-new-normal",
        "metaDescription" => "AI investments are shifting from short-term hype to long-term habit, as leaders highlight sustained demand, responsible growth, and AI as a strategic resource!!",
        "image" => "/assets/success-wire/hype-to-habit.png",
    ],
    [
        "id" => "IndiasDeeptech",
        "title" => "How Talent and Patience Are Powering India’s Deeptech",
        "slug" => "india-deeptech-talent-patience",
        "metaDescription" => "India’s deeptech growth depends on long-term talent, patient capital, and sustained execution, not quick wins. A look at what will shape the next wave.",
        "image" => "/assets/success-wire/India’s-Deeptech.png",
    ],
    [
        "id" => "D2CBrands",
        "title" => "What D2C Brands Can Learn from Blinkit's and...",
        "slug" => "d2c-brands-learn-blinkit",
        "metaDescription" => "Key lessons for D2C brands from the rapid rise and strategies of massive players like Blinkit.",
        "image" => "/assets/success-wire/D2C.png",
    ],
    [
        "id" => "ZohoArattai",
        "title" => "Zoho Arattai’s 100x Surge: Breakout or Short-Term Hype?",
        "slug" => "zoho-arattai-surge",
        "metaDescription" => "Zoho’s Arattai messaging app sees 100x user growth, sparking debate on whether the surge signals lasting adoption or a short-lived moment in India’s chat space.",
        "image" => "/assets/success-wire/Zoho.jpeg",
    ],
    [
        "id" => "AmazonFresh",
        "title" => "Amazon Fresh Expansion & Whole Foods Grocery Strategy",
        "slug" => "amazon-fresh-expansion",
        "metaDescription" => "Learn how Amazon is shifting its grocery strategy expanding online Fresh delivery and growing Whole Foods Market stores across new locations for broader reach.",
        "image" => "/assets/success-wire/Amazon.jpeg",
    ],
    [
        "id" => "WorldTightens",
        "title" => "Indian Tech Founders Step Up: Startup Growth & Leadership",
        "slug" => "india-tech-founders-step-up",
        "metaDescription" => "Discover how Indian tech founders are stepping up with bold leadership, scaling startups, and reshaping the innovation ecosystem for growth and global impact.",
        "image" => "/assets/success-wire/When-the-World-Tightens.jpeg",
    ],
    [
        "id" => "CGPowerOrder",
        "title" => "CG Power Wins $99M US Data Center Deal, Enters Global Race",
        "slug" => "cg-power-us-data-center-order",
        "metaDescription" => "CG Power secures a $99M US data center order to supply transformers for hyperscale facilities, marking a strategic entry into global digital infrastructure.",
        "image" => "/assets/success-wire/SW-blog.png",
    ],
    [
        "id" => "TataMotorsHydrogenBus",
        "title" => "Tata Motors Unveils India’s First Hydrogen Fuel Cell Bus",
        "slug" => "tata-motors-hydrogen-fuel-cell-bus",
        "metaDescription" => "Tata Motors launches India’s first hydrogen fuel cell bus at Auto Expo 2026, marking a major step toward clean mobility and sustainable public transport.",
        "image" => "/assets/success-wire/TATA-MOTORS.webp",
    ],
    [
        "id" => "GoogleGeminiChrome",
        "title" => "Google Brings Gemini AI Into Chrome, Reimagining the Browser Experience",
        "slug" => "google-brings-gemini-ai-chrome",
        "metaDescription" => "Google integrates Gemini AI into Chrome, introducing features like a reimagined side panel, Nano Banana for creativity, and proactive Personal Intelligence.",
        "image" => "/assets/success-wire/GeminiAI.webp",
    ],
    [
        "id" => "GlobalInnovationForumCES",
        "title" => "Global Innovation Forum at CES 2026 Redefines Startup Networking Through Country‑Led Collaboration",
        "slug" => "global-innovation-forum-ces-2026",
        "metaDescription" => "The Seoul Business Agency hosted the Global Innovation Forum at CES 2026, the first country-based startup competition, fostering international collaboration.",
        "image" => "/assets/success-wire/CES.webp",
    ],

    [
        "id" => "RBIBorrowingCosts",
        "title" => "RBI Keeps Borrowing Costs Steady, Signals Stronger Growth Ahead",
        "slug" => "rbi-keeps-borrowing-costs-steady",
        "metaDescription" => "The Reserve Bank of India’s MPC has kept the repo rate unchanged at 5.25%, signaling stability while revising India’s growth outlook upward to 6.8–7.2%.",
        "image" => "/assets/success-wire/RBI.webp",
    ],
    [
        "id" => "Budget2026Overhaul",
        "title" => "Budget 2026 Brings Customs Duty Overhaul and Record Infrastructure Push",
        "slug" => "budget-2026-customs-duty-overhaul",
        "metaDescription" => "The Union Budget 2026 introduces sweeping reforms in customs duty and a record ₹12.2 lakh crore capital expenditure target.",
        "image" => "/assets/success-wire/Nirmala.jpg",
    ],
    [
        "id" => "IKEATamilNaduOnline",
        "title" => "IKEA Expands Into Tamil Nadu With Online Deliveries, Signaling Deeper South India Push",
        "slug" => "ikea-expands-tamil-nadu-online",
        "metaDescription" => "IKEA begins online deliveries in Tamil Nadu, marking its first step into the state's retail market with a digital-first approach.",
        "image" => "/assets/success-wire/IKEA.webp",
    ],
    [
        "id" => "CarbonCreditStartups",
        "title" => "India’s Carbon Credit Startups Push Global Boundaries With Verified Climate Solutions",
        "slug" => "india-carbon-credit-startups-global-boundaries",
        "metaDescription" => "Indian startups like Varaha and Alt Carbon are leading the way in verified carbon removal projects, attracting global buyers like Microsoft and Google.",
        "image" => "/assets/success-wire/Varaha.webp",
    ],
    [
        "id" => "AlzheimersPollutionLink",
        "title" => "New Study Links Long-Term Air Pollution Exposure to Higher Alzheimer’s Risk",
        "slug" => "air-pollution-alzheimers-risk",
        "metaDescription" => "A major study finds that prolonged exposure to PM2.5 air pollution may directly increase the risk of Alzheimer’s disease.",
        "image" => "/assets/success-wire/alz.webp",
    ],
    [
        "id" => "BewakoofCEOStepsDown",
        "title" => "Prabhkiran Singh Steps Down as CEO of Bewakoof After Fourteen Years",
        "slug" => "bewakoof-ceo-steps-down",
        "metaDescription" => "Prabhkiran Singh, co-founder of Bewakoof, steps down as CEO after fourteen years, marking the end of an era for India's iconic youth fashion brand.",
        "image" => "/assets/success-wire/bew.webp",
    ],
    [
        "id" => "PhotonicChipNewColors",
        "title" => "Scientists Develop Photonic Chip That Generates Entirely New Colors of Light",
        "slug" => "photonic-chip-new-colors-of-light",
        "metaDescription" => "A breakthrough photonic chip can generate entirely new colors of light, with applications in telecommunications, medical imaging, and quantum computing.",
        "image" => "/assets/success-wire/jqi.webp",
    ],
    [
        "id" => "SamsungPrivacyDisplay",
        "title" => "Samsung Unveils Privacy Display in Galaxy S26 Ultra",
        "slug" => "samsung-privacy-display-galaxy-s26-ultra",
        "metaDescription" => "Samsung has introduced a new display technology with the launch of its Galaxy S26 Ultra, unveiling a hardware-level privacy screen that restricts side-angle visibility and prevents onlookers from viewing sensitive information.",
        "image" => "/assets/success-wire/samsung-privacy.png",
    ],
    [
        "id" => "SelfHealingConcrete",
        "title" => "Scientists Develop Self-Healing Concrete That Could Transform Urban Infrastructure",
        "slug" => "self-healing-concrete-urban-infrastructure",
        "metaDescription" => "A team of researchers has unveiled a new form of self-healing concrete that uses embedded mineral-producing bacteria to repair cracks automatically, offering a potential revolution in how cities manage aging infrastructure.",
        "image" => "/assets/success-wire/concrete.png",
    ],
];

// 4. Event Metadata
$eventMetadata = [
    [
        "id" => "Episode1",
        "title" => "Founders Meet 2025 | Episode-1",
        "slug" => "episode-1",
        "metaDescription" => "Join the Founder meet 2025. Meet and Network with other amazing founders, Share stories, challenges & wins.",
        "image" => "/assets/events/episode-1.png",
    ],
];

// 4. Static Pages
$staticPages = [
    '/about' => [
        'title' => 'Startup Paths, Founder Choices and Real Lessons | SuccessWikis',
        'description' => 'See how founders build, fail and grow through real startup journeys. Read honest stories, important choices and lessons that shape meaningful businesses.'
    ],
    '/contact' => [
        'title' => 'Contact Us | Success Wikis',
        'description' => 'Get in touch with us for collaborations, inquiries, or feedback.'
    ],
    '/careers' => [
        'title' => 'Careers | Success Wikis',
        'description' => 'Join our team and help us build the future of Success Wikis.'
    ],
    '/accessibility-statement' => [
        'title' => 'Accessibility Statement and WCAG 2.1 Level AA | SuccessWikis',
        'description' => 'Learn about SuccessWikis’ commitment to accessibility, including WCAG 2.1 Level AA guidelines, screen-reader support, keyboard navigation, and feedback options.'
    ],
    '/ads' => [
        'title' => 'Building Brand Attention Through Trust and Value | SuccessWikis',
        'description' => 'Reach people through trusted content and real stories, not interruptions. Build genuine engagement by adding value where your audience already listens.'
    ],
    '/cookies-policy' => [
        'title' => 'How We Use Cookies on SuccessWikis',
        'description' => 'Find out what cookies are, the types we use for site features, analytics and ads, how third parties may use cookies, and how you can manage them in your browser.'
    ],
    '/privacy-policy' => [
        'title' => 'Privacy Policy and Personal Data Protection | SuccessWikis',
        'description' => 'Learn how SuccessWikis collects, uses and protects personal data, including cookies, data sharing, user rights, security measures, and contact details.'
    ],
    '/terms-of-use' => [
        'title' => 'Website Terms and Conditions | SuccessWikis',
        'description' => 'Read SuccessWikis Terms of Use covering content usage, accuracy and liability, user submissions, external links, intellectual property, and policy updates.'
    ],
    '/works' => [
        'title' => 'Our Works | Success Wikis',
        'description' => 'Explore our portfolio and the projects we have delivered.'
    ],
    '/events' => [
        'title' => 'Events Where Founders Connect and Share Ideas | SuccessWikis',
        'description' => 'Join founder meetups, talks and live sessions where ideas are shared, connections are built and real startup journeys come to life at SuccessWikis today.'
    ],
];

if (array_key_exists($path, $staticPages)) {
    $title = $staticPages[$path]['title'];
    $description = $staticPages[$path]['description'];
}

// ROUTING LOGIC

$cleanPath = trim($path, '/');

// 1. Blogs: /blogs/:slug
if (stripos($cleanPath, 'blogs/') === 0) {
    $parts = explode('/', $cleanPath);
    $blogId = end($parts); // Get last part
    foreach ($blogMetadata as $item) {
        if ($item['id'] === $blogId || $item['slug'] === $blogId) {
            $title = $item['title'];
            $description = $item['metaDescription'];
            $absImage = getAbsoluteUrl($item['image'], $baseUrl);
            $image = getOptimizedOgImage($absImage);
            $url = $baseUrl . "/blogs/" . $item['slug'];
            break;
        }
    }
}
// 3. Success Wire: /success-wire/:slug
elseif (stripos($cleanPath, 'success-wire/') === 0) {
    $parts = explode('/', $cleanPath);
    $lensSlug = end($parts);
    foreach ($successLensMetadata as $item) {
        if ($item['slug'] === $lensSlug) {
            $title = $item['title'];
            $description = $item['metaDescription'];
            $absImage = getAbsoluteUrl($item['image'], $baseUrl);
            $image = getOptimizedOgImage($absImage);
            $url = $baseUrl . "/success-wire/" . $item['slug'];
            break;
        }
    }
}
// 4. Events: /events/:slug
elseif (stripos($cleanPath, 'events/') === 0) {
    $parts = explode('/', $cleanPath);
    $eventSlug = end($parts);
    foreach ($eventMetadata as $item) {
        if ($item['slug'] === $eventSlug) {
            $title = $item['title'];
            $description = $item['metaDescription'];
            $absImage = getAbsoluteUrl($item['image'], $baseUrl);
            $image = getOptimizedOgImage($absImage);
            $url = $baseUrl . "/events/" . $item['slug'];
            break;
        }
    }
}
// 2. Pod: /:categorySlug/:slug
else {
    foreach ($podMetadata as $item) {
        // Construct expected path without slashes for comparison
        $expectedPath = $item['categorySlug'] . "/" . $item['slug'];

        // Case-insensitive comparison
        if (strcasecmp($cleanPath, $expectedPath) === 0) {
            $title = $item['title'];
            $description = isset($item['metaDescription']) ? $item['metaDescription'] : "Listen to " . $item['title'] . ". " . $item['category'];
            $absImage = getAbsoluteUrl($item['image'], $baseUrl);
            $image = getOptimizedOgImage($absImage);
            $url = $baseUrl . "/" . $expectedPath;
            break;
        }
    }
}

// Read index.html
// Read Source HTML (Support 'template.html' to bypass server index.html priority)
$sourceFile = 'index.html';
if (file_exists('template.html')) {
    $sourceFile = 'template.html';
}

if (file_exists($sourceFile)) {
    $html = file_get_contents($sourceFile);
} else {
    // If neither exists, we can't serve the page.
    // However, if on server and only index.html exists but is being served directly, this script wouldn't run anyway.
    die("Error: Source HTML file ($sourceFile) not found. Please ensure template.html or index.html exists.");
}

// CLEANUP existing tags to prevent duplicates (Robust Regex for Multi-line)
// Remove existing title
$html = preg_replace('/<title>.*?<\/title>/is', '', $html);
// Remove existing OG and Description tags (handling multi-line attributes)
$html = preg_replace('/<meta\s+[^>]*property=["\']og:[^"\']+["\'][^>]*\/?>/is', '', $html);
$html = preg_replace('/<meta\s+[^>]*name=["\']og:[^"\']+["\'][^>]*\/?>/is', '', $html);
$html = preg_replace('/<meta\s+[^>]*name=["\']description["\'][^>]*\/?>/is', '', $html);
$html = preg_replace('/<meta\s+[^>]*name=["\']twitter:[^"\']+["\'][^>]*\/?>/is', '', $html);
$html = preg_replace('/<meta\s+[^>]*name=["\']keywords["\'][^>]*\/?>/is', '', $html);
$html = preg_replace('/<meta\s+[^>]*name=["\']author["\'][^>]*\/?>/is', '', $html);
$html = preg_replace('/<meta\s+[^>]*name=["\']robots["\'][^>]*\/?>/is', '', $html);

// Prepare New Tags
$headEnd = '</head>';
$ogTags = "
    <!-- Dynamic OG Tags via index.php -->
    <title>" . htmlspecialchars($title) . "</title>
    <meta name=\"description\" content=\"" . htmlspecialchars($description) . "\">
    <meta name=\"keywords\" content=\"success, wikis, motivation, achievement, personal development\">
    <meta name=\"author\" content=\"SuccessWikis Team\">
    <meta name=\"robots\" content=\"" . htmlspecialchars($robotsContent) . "\">

    <meta property=\"og:title\" content=\"" . htmlspecialchars($title) . "\">
    <meta property=\"og:description\" content=\"" . htmlspecialchars($description) . "\">
    <meta property=\"og:image\" content=\"" . htmlspecialchars($image) . "\">
    <meta property=\"og:url\" content=\"" . htmlspecialchars($url) . "\">
    <meta property=\"og:type\" content=\"website\">
    <meta property=\"og:site_name\" content=\"Success Wikis\">

    <!-- Additional Image Properties -->
    <meta property=\"og:image:type\" content=\"image/jpeg\">
    <meta property=\"og:image:width\" content=\"1200\">
    <meta property=\"og:image:height\" content=\"630\">
    <meta property=\"og:image:alt\" content=\"" . htmlspecialchars($title) . "\">

    <meta name=\"twitter:card\" content=\"summary_large_image\">
    <meta name=\"twitter:title\" content=\"" . htmlspecialchars($title) . "\">
    <meta name=\"twitter:description\" content=\"" . htmlspecialchars($description) . "\">
    <meta name=\"twitter:image\" content=\"" . htmlspecialchars($image) . "\">
";

// JSON-LD Schema for Sitelinks & Organization
$jsonLd = [
    "@context" => "https://schema.org",
    "@graph" => [
        [
            "@type" => "WebSite",
            "name" => "Success Wikis",
            "url" => $baseUrl . "/",
            "potentialAction" => [
                "@type" => "SearchAction",
                "target" => $baseUrl . "/?s={search_term_string}",
                "query-input" => "required name=search_term_string"
            ]
        ],
        [
            "@type" => "Organization",
            "name" => "Success Wikis",
            "url" => $baseUrl . "/",
            "logo" => getAbsoluteUrl("/assets/logo.png", $baseUrl),
            "sameAs" => [
                "https://www.linkedin.com/company/successwikis",
                "https://www.instagram.com/successwikis"
            ]
        ]
    ]
];
$jsonLdScript = "\n    <script type=\"application/ld+json\">\n    " . json_encode($jsonLd, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "\n    </script>\n";

// Inject before </head>
$html = str_replace($headEnd, $ogTags . $jsonLdScript . $headEnd, $html);

echo $html;
?>