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
$defaultTitle = "Success Wikis";
$defaultDesc = "SuccessWikis is a selective media house dedicated to authentic, impact-driven storytelling. We craft transformative founder narratives, podcasts, and editorial features that blend creativity with precision—helping entrepreneurs inspire trust, elevate their brand, and spark meaningful change.";
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
        "title" => "Ambition Is Changing — And That's a Good Thing",
        "slug" => "ambition-is-changing",
        "metaDescription" => "Ambition is no longer just about climbing the corporate ladder. It's about finding purpose and redefining success on your own terms.",
        "image" => "/assets/blogs/blogs-images/1.png",
        "url" => $baseUrl . "/blogs/ambition-is-changing"
    ],
    [
        "id" => "FearFounderPost",
        "title" => "The Fear Every Founder Has (But Nobody Talks About)",
        "slug" => "fear-every-founder-has",
        "metaDescription" => "Imposter syndrome and the fear of failure are common among founders. Learn why these feelings are normal and how to overcome them.",
        "image" => "/assets/blogs/blogs-images/2.png",
        "url" => $baseUrl . "/blogs/fear-every-founder-has"
    ],
    [
        "id" => "FiguredOutPost",
        "title" => "You Don't Need to Have It All Figured Out",
        "slug" => "dont-need-figured-out",
        "metaDescription" => "The pressure to have a perfect 5-year plan can be paralyzing. Discover the power of iteration and starting before you're ready.",
        "image" => "/assets/blogs/blogs-images/3.jpeg",
        "url" => $baseUrl . "/blogs/dont-need-figured-out"
    ],
    [
        "id" => "TellStoryPost",
        "title" => "How to Tell Your Story Without Feeling Like PR",
        "slug" => "how-to-tell-story",
        "metaDescription" => "Authenticity wins in modern marketing. Learn how to share your journey and connect with your audience without sounding corporate.",
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
        "image" => "/assets/Driven-by-Purpose/Raghav.png",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "ZenithEnergyPost",
        "title" => "Zenith Energy – Turning Efficiency Into Legacy",
        "slug" => "zenith-energy",
        "categorySlug" => "driven-by-purpose",
        "image" => "/assets/Driven-by-Purpose/zenith.png",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "AECSastraPost",
        "title" => "AEC Sastra: Shaping Global AEC Leaders",
        "slug" => "aec-sastra",
        "categorySlug" => "driven-by-purpose",
        "image" => "/assets/Driven-by-Purpose/AEC-1.png",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "DesiDipsPost",
        "title" => "Desi Dips: Authentic Chutneys That Do More Than Just Taste Good",
        "slug" => "desi-dips",
        "categorySlug" => "driven-by-purpose",
        "image" => "/assets/Driven-by-Purpose/Desi-Dips.png",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "FintechIPOWavePost",
        "title" => "India’s Fintech IPO Wave: KreditBee, Fibe, and MoneyView Gear Up for 2026",
        "slug" => "fintech-ipo-wave",
        "categorySlug" => "driven-by-purpose",
        "image" => "/assets/Driven-by-Purpose/Fintech.jpeg",
        "category" => "Driven by Purpose",
    ],
    [
        "id" => "TariniSaiPost",
        "title" => "Tarini Sai Padmanabhan: Building the Trust Layer of the Internet with Axory AI",
        "slug" => "tarini-sai",
        "categorySlug" => "stage-behind-the-story",
        "image" => "/assets/The-stage-behind-the-story/Tarini-Sai-Padmanabhan.jpeg",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "SoldierRewiredPost",
        "title" => "The Soldier Who Rewired the Future — One STEM Lab at a Time",
        "slug" => "soldier-rewired",
        "categorySlug" => "stage-behind-the-story",
        "image" => "/assets/The-stage-behind-the-story/The-Soldier.jpeg",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "ManWhoBuildsSchoolsPost",
        "title" => "The Man Who Builds Schools for People Who Dream of Building Them",
        "slug" => "man-who-builds-schools",
        "categorySlug" => "stage-behind-the-story",
        "image" => "/assets/The-stage-behind-the-story/raghav.jpeg",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "GreenRecykloplastPost",
        "title" => "Turning Waste Into Worth: The Story of Raghuram Natarajan and Green Recykloplast",
        "slug" => "green-recykloplast",
        "categorySlug" => "stage-behind-the-story",
        "image" => "/assets/The-stage-behind-the-story/grp.webp",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "NexGenSoftwarePost",
        "title" => "Venkat’s Journey: Building NexGen Software Solutions on Transparency and Trust",
        "slug" => "nexgen-software",
        "categorySlug" => "stage-behind-the-story",
        "image" => "/assets/The-stage-behind-the-story/venkat.webp",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "WestfieldInternationalPost",
        "title" => "Kasturi Manjula: Guiding Parents, Building Schools, Shaping Futures",
        "slug" => "westfield-international",
        "categorySlug" => "stage-behind-the-story",
        "image" => "/assets/The-stage-behind-the-story/wf.webp",
        "category" => "The stage behind the story",
    ],
    [
        "id" => "LeenusInfraPost",
        "title" => "From Supreme Pipes to Complete Infrastructure – How Leenus Infra Builds Smarter",
        "slug" => "leenus-infra",
        "categorySlug" => "founders-unfiltered",
        "image" => "/assets/founders-unfiltered/leenus.png",
        "category" => "Founder's Unfiltered",
    ],
    [
        "id" => "SindhuReddyPost",
        "title" => "Sindhu Reddy on Powering a Greener Future: Zenith Energy and the Road to Net Zero",
        "slug" => "sindhu-reddy",
        "categorySlug" => "founders-unfiltered",
        "image" => "/assets/founders-unfiltered/sindu.png",
        "category" => "Founder's Unfiltered",
    ],
    [
        "id" => "RaghuBodduPost",
        "title" => "Exclusive Interview: Raghu Boddu on ToggleNow, Innovation, and the AI-Powered Future",
        "slug" => "raghu-boddu",
        "categorySlug" => "founders-unfiltered",
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
        "title" => "Sustainable Footwear Startup Neeman’s Secures ₹35.5 Crore to Scale Direct-to-Consumer Growth",
        "slug" => "neemans-funding-growth",
        "metaDescription" => "Hyderabad-based Neeman's secures ₹35.5 crore in Series B extension to expand product lines and D2C presence.",
        "image" => "/assets/success-wire/neemans-tn.webp",
    ],
    [
        "id" => "LucknowAIHub",
        "title" => "Lucknow Emerges as India’s Next AI Hub With Regional Impact Conference",
        "slug" => "lucknow-india-next-ai-hub",
        "metaDescription" => "Lucknow hosts IndiaAI–MeitY Mega Meet, positioning tier-2 cities as critical nodes in India's AI strategy.",
        "image" => "/assets/success-wire/Lucknow.webp",
    ],
    [
        "id" => "NightSolarTech",
        "title" => "Scientists Advance Night-Solar Technology with Breakthrough Thermoradiative Cells",
        "slug" => "night-solar-tech",
        "metaDescription" => "Researchers at Stanford and UNSW Sydney develop solar cells that generate electricity after dark.",
        "image" => "/assets/success-wire/solar.webp",
    ],
    [
        "id" => "JPMorganEarnings",
        "title" => "JPMorgan Chase & Co.: Q4 Earnings and Leadership Transition",
        "slug" => "jpmorgan-chase-earnings",
        "metaDescription" => "JPMorgan Chase reports strong Q4 earnings alongside significant leadership shifts and legal challenges.",
        "image" => "/assets/success-wire/jp-morgon.jpeg",
    ],
    [
        "id" => "GoogleAIHub",
        "title" => "Google to invest $15 billion in AI hub...",
        "slug" => "google-invest-15-billion-ai",
        "metaDescription" => "Google announces a massive $15 billion investment to build a new AI hub, signaling a major shift in the tech landscape.",
        "image" => "/assets/success-wire/google.png",
    ],
    [
        "id" => "SharkTankHoora",
        "title" => "Shark Tank Said No, Investors Said Yes: Hoora's...",
        "slug" => "shark-tank-hoora-success",
        "metaDescription" => "The story of Hoora, a startup that was rejected on Shark Tank but found massive success with other investors.",
        "image" => "/assets/success-wire/Shark-tank.jpeg",
    ],
    [
        "id" => "HandmadeRoots",
        "title" => "From Handmade Roots to a Global Movement: How...",
        "slug" => "handmade-roots-global-movement",
        "metaDescription" => "Tracing the journey of a local handmade brand that scaled into a global movement.",
        "image" => "/assets/success-wire/taavi.jpeg",
    ],
    [
        "id" => "HypeToHabit",
        "title" => "From Hype to Habit: The New Normal of...",
        "slug" => "hype-to-habit-new-normal",
        "metaDescription" => "Analyzing how fleeting trends transform into permanent habits in the consumer market.",
        "image" => "/assets/success-wire/hype-to-habit.png",
    ],
    [
        "id" => "IndiasDeeptech",
        "title" => "India's Deeptech : How Talent and Patience Can...",
        "slug" => "india-deeptech-talent-patience",
        "metaDescription" => "India's deeptech sector is rising. Discover how talent and patience are fueling this growth.",
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
        "title" => "Zoho's Arattai Surge: India's Messaging Moment or Mirage?",
        "slug" => "zoho-arattai-surge",
        "metaDescription" => "An in-depth look at Zoho's Arattai app and whether it can truly capture India's messaging market.",
        "image" => "/assets/success-wire/Zoho.jpeg",
    ],
    [
        "id" => "AmazonFresh",
        "title" => "Amazon Fresh Expands to 270+ Cities. What This...",
        "slug" => "amazon-fresh-expansion",
        "metaDescription" => "Amazon Fresh's aggressive expansion to 270+ cities and its implications for local markets.",
        "image" => "/assets/success-wire/Amazon.jpeg",
    ],
    [
        "id" => "WorldTightens",
        "title" => "When the World Tightens, India's Tech Founders Step...",
        "slug" => "india-tech-founders-step-up",
        "metaDescription" => "How Indian tech founders are responding to global economic tightening with innovation and resilience.",
        "image" => "/assets/success-wire/When-the-World-Tightens.jpeg",
    ],
    [
        "id" => "CGPowerOrder",
        "title" => "CG Power Secures Landmark $99M US Data Center Order, Enters Global Digital Infrastructure Race",
        "slug" => "cg-power-us-data-center-order",
        "metaDescription" => "CG Power and Industrial Solutions Ltd has announced its largest-ever single export order, valued at ₹900 crore (~$99M), from Tallgrass Integrated Logistics Solutions LLC in the United States.",
        "image" => "/assets/success-wire/SW-blog.png",
    ],
    [
        "id" => "TataMotorsHydrogenBus",
        "title" => "Tata Motors Unveils India’s First Hydrogen Fuel Cell Bus, Signaling a New Era in Clean Mobility",
        "slug" => "tata-motors-hydrogen-fuel-cell-bus",
        "metaDescription" => "Tata Motors has unveiled India’s first hydrogen fuel cell bus, marking a breakthrough in the country’s push toward sustainable public transport.",
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
        'title' => 'About Us | Success Wikis',
        'description' => 'Learn more about Success Wikis, our mission, and the team behind the stories.'
    ],
    '/contact' => [
        'title' => 'Contact Us | Success Wikis',
        'description' => 'Get in touch with us for collaborations, inquiries, or feedback.'
    ],
    '/careers' => [
        'title' => 'Careers | Success Wikis',
        'description' => 'Join our team and help us build the future of Success Wikis.'
    ],
    '/access-statement' => [
        'title' => 'Accessibility Statement | Success Wikis',
        'description' => 'Our commitment to ensuring digital accessibility for all users.'
    ],
    '/ads' => [
        'title' => 'Advertise with Us | Success Wikis',
        'description' => 'Reach our engaged audience through our advertising solutions.'
    ],
    '/cookies-policy' => [
        'title' => 'Cookies Policy | Success Wikis',
        'description' => 'Understand how we use cookies to improve your experience.'
    ],
    '/privacy-policy' => [
        'title' => 'Privacy Policy | Success Wikis',
        'description' => 'Read our privacy policy to understand how we handle your data.'
    ],
    '/terms-of-use' => [
        'title' => 'Terms of Use | Success Wikis',
        'description' => 'Terms and conditions for using our website.'
    ],
    '/works' => [
        'title' => 'Our Works | Success Wikis',
        'description' => 'Explore our portfolio and the projects we have delivered.'
    ],
    '/events' => [
        'title' => 'Events | Success Wikis',
        'description' => 'Stay updated with our latest events and episodes.'
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
            $description = "Listen to " . $item['title'] . ". " . $item['category'];
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