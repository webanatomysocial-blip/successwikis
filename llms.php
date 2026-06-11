<?php
header("Content-Type: text/plain; charset=utf-8");

$full = isset($_GET['full']) && $_GET['full'] === '1';

$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'];
$baseUrl = $protocol . $host;

// ── Static post data (mirrors sitemap.php + metadata.js) ─────────────────────
$staticBlogs = [
    ["slug" => "ambition-is-changing",       "title" => "Ambition Is Changing — And That's a Good Thing",          "description" => "How the definition of ambition is shifting among founders and entrepreneurs today."],
    ["slug" => "fear-every-founder-has",      "title" => "The Fear Every Founder Has (But Won't Admit)",            "description" => "An honest look at the fear that lives behind every startup decision."],
    ["slug" => "dont-need-figured-out",       "title" => "You Don't Need to Have It All Figured Out",               "description" => "Why uncertainty is not the enemy of building a great company."],
    ["slug" => "how-to-tell-story",           "title" => "How to Tell Your Story Without Feeling Like PR",          "description" => "A guide to authentic storytelling for founders who hate self-promotion."],
];

$staticPods = [
    ["slug" => "raghav-foundation",           "cat" => "driven-by-purpose",        "title" => "Raghav Foundation — Building Schools, Shaping Futures"],
    ["slug" => "zenith-energy",               "cat" => "driven-by-purpose",        "title" => "Zenith Energy — Powering a Greener Future"],
    ["slug" => "aec-sastra",                  "cat" => "driven-by-purpose",        "title" => "AEC SASTRA — Shaping Global AEC Leaders Through BIM"],
    ["slug" => "desi-dips",                   "cat" => "driven-by-purpose",        "title" => "Desi Dips — Taking Indian Flavours Global"],
    ["slug" => "fintech-ipo-wave",            "cat" => "driven-by-purpose",        "title" => "Fintech IPO Wave — India's Next Big Capital Story"],
    ["slug" => "tarini-sai",                  "cat" => "stage-behind-the-story",   "title" => "Tarini Sai Padmanabhan — The Stage Behind the Story"],
    ["slug" => "soldier-rewired",             "cat" => "stage-behind-the-story",   "title" => "The Soldier Who Rewired the Future"],
    ["slug" => "man-who-builds-schools",      "cat" => "stage-behind-the-story",   "title" => "The Man Who Builds Schools"],
    ["slug" => "when-trial-and-error-turns-into-direction", "cat" => "stage-behind-the-story", "title" => "When Trial and Error Turns Into Direction"],
    ["slug" => "manoj-garlapati",             "cat" => "stage-behind-the-story",   "title" => "Manoj Garlapati — The Stage Behind the Story"],
    ["slug" => "green-recykloplast",          "cat" => "stage-behind-the-story",   "title" => "Green Recykloplast — Turning Waste Into Worth"],
    ["slug" => "nexgen-software",             "cat" => "stage-behind-the-story",   "title" => "NexGen Software — The Stage Behind the Story"],
    ["slug" => "westfield-international",     "cat" => "stage-behind-the-story",   "title" => "Westfield International — The Stage Behind the Story"],
    ["slug" => "leenus-infra",               "cat" => "founders-unfiltered",       "title" => "Leenus Infra — From Supreme Pipes to Complete Infrastructure"],
    ["slug" => "sindhu-reddy",               "cat" => "founders-unfiltered",       "title" => "Sindhu Reddy Jannareddy — Powering a Greener Future with Zenith Energy"],
    ["slug" => "raghu-boddu",               "cat" => "founders-unfiltered",        "title" => "Raghu Boddu — Founders Unfiltered"],
];

$staticSuccessWire = [
    ["slug" => "torrent-pharma-fda-inspection",        "title" => "Torrent Pharma Clears FDA Inspection"],
    ["slug" => "vigyanshaala-nikkei-asia-award",       "title" => "Vigyanshaala Wins Nikkei Asia Award"],
    ["slug" => "neemans-funding-growth",               "title" => "Neemans Secures Fresh Funding for Growth"],
    ["slug" => "lucknow-india-next-ai-hub",            "title" => "Lucknow: India's Next AI Hub?"],
    ["slug" => "night-solar-tech",                     "title" => "Night Solar Tech — Power After Dark"],
    ["slug" => "jpmorgan-chase-earnings",              "title" => "JPMorgan Chase Earnings Beat Expectations"],
    ["slug" => "google-invest-15-billion-ai",          "title" => "Google to Invest $15 Billion in AI"],
    ["slug" => "shark-tank-hoora-success",             "title" => "Shark Tank Said No. Investors Said Yes. Hoora's Journey to Vehicle 360 Success"],
    ["slug" => "handmade-roots-global-movement",       "title" => "Handmade Roots, Global Movement"],
    ["slug" => "hype-to-habit-new-normal",             "title" => "From Hype to Habit — The New Normal"],
    ["slug" => "india-deeptech-talent-patience",       "title" => "India's Deep Tech: Talent + Patience"],
    ["slug" => "d2c-brands-learn-blinkit",             "title" => "What D2C Brands Are Learning From Blinkit"],
    ["slug" => "zoho-arattai-surge",                   "title" => "Zoho's Arattai Surge — India's Messaging Moment"],
    ["slug" => "amazon-fresh-expansion",               "title" => "Amazon Fresh Expands to 270 Cities"],
    ["slug" => "india-tech-founders-step-up",          "title" => "When the World Tightens, India's Tech Founders Step Up"],
    ["slug" => "cg-power-us-data-center-order",        "title" => "CG Power Wins US Data Center Order"],
    ["slug" => "tata-motors-hydrogen-fuel-cell-bus",   "title" => "Tata Motors Launches Hydrogen Fuel Cell Bus"],
    ["slug" => "google-brings-gemini-ai-chrome",       "title" => "Google Brings Gemini AI to Chrome"],
    ["slug" => "global-innovation-forum-ces-2026",     "title" => "Global Innovation Forum at CES 2026"],
    ["slug" => "rbi-keeps-borrowing-costs-steady",     "title" => "RBI Keeps Borrowing Costs Steady"],
    ["slug" => "budget-2026-customs-duty-overhaul",    "title" => "Budget 2026 Customs Duty Overhaul"],
    ["slug" => "ikea-expands-tamil-nadu-online",       "title" => "IKEA Expands to Tamil Nadu Online"],
];

$staticEvents = [
    ["slug" => "episode-1", "title" => "SuccessWikis Events — Episode 1"],
];

// ── Fetch dynamic posts from DB ───────────────────────────────────────────────
$dbPosts = [];
try {
    require_once __DIR__ . '/api/db.php';
    $stmt = $pdo->query(
        "SELECT title, slug, meta_description, content, post_type, published_date
         FROM posts
         WHERE is_published = 1 AND deleted_at IS NULL
         ORDER BY published_date DESC"
    );
    $dbPosts = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    // DB unavailable — static content still served
}

// ── Group DB posts by type ────────────────────────────────────────────────────
$dbByType = [
    'blog' => [], 'success_lens' => [], 'event' => [],
    'driven_by_purpose' => [], 'founders_unfiltered' => [], 'stage_behind_story' => [],
];
foreach ($dbPosts as $p) {
    $t = $p['post_type'];
    if (isset($dbByType[$t])) $dbByType[$t][] = $p;
}

// ── Helper: plain-text content ────────────────────────────────────────────────
function plainText($html) {
    $text = strip_tags($html);
    $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $text = preg_replace('/\s+/', ' ', $text);
    return trim($text);
}

// ── Output ────────────────────────────────────────────────────────────────────
echo "# SuccessWikis\n\n";
echo "> SuccessWikis is a platform for startup success stories, founder interviews, and entrepreneur journeys from India and around the world. It features blog posts, podcast-style stories (The Stage Behind the Story, Founders Unfiltered, Driven by Purpose), Success Wire news updates, and live events.\n\n";
echo "> Base URL: $baseUrl\n\n";

// ── Blogs ─────────────────────────────────────────────────────────────────────
echo "## Blog Posts\n\n";

foreach ($staticBlogs as $b) {
    $url = "$baseUrl/blogs/{$b['slug']}";
    echo "- [{$b['title']}]($url): {$b['description']}\n";
    if ($full) echo "\n";
}

foreach ($dbByType['blog'] as $p) {
    $url = "$baseUrl/blogs/{$p['slug']}";
    $desc = $p['meta_description'] ?: '';
    echo "- [{$p['title']}]($url)" . ($desc ? ": $desc" : "") . "\n";
    if ($full && $p['content']) {
        $text = plainText($p['content']);
        if ($text) echo "\n  " . wordwrap($text, 120, "\n  ", false) . "\n\n";
    }
}

// ── Success Wire ──────────────────────────────────────────────────────────────
echo "\n## Success Wire (News & Updates)\n\n";

foreach ($staticSuccessWire as $s) {
    $url = "$baseUrl/success-wire/{$s['slug']}";
    echo "- [{$s['title']}]($url)\n";
}

foreach ($dbByType['success_lens'] as $p) {
    $url = "$baseUrl/success-wire/{$p['slug']}";
    $desc = $p['meta_description'] ?: '';
    echo "- [{$p['title']}]($url)" . ($desc ? ": $desc" : "") . "\n";
    if ($full && $p['content']) {
        $text = plainText($p['content']);
        if ($text) echo "\n  " . wordwrap($text, 120, "\n  ", false) . "\n\n";
    }
}

// ── The Stage Behind the Story ────────────────────────────────────────────────
echo "\n## The Stage Behind the Story (Podcast Stories)\n\n";

foreach ($staticPods as $p) {
    if ($p['cat'] !== 'stage-behind-the-story') continue;
    $url = "$baseUrl/{$p['cat']}/{$p['slug']}";
    echo "- [{$p['title']}]($url)\n";
}

foreach ($dbByType['stage_behind_story'] as $p) {
    $url = "$baseUrl/stage-behind-the-story/{$p['slug']}";
    $desc = $p['meta_description'] ?: '';
    echo "- [{$p['title']}]($url)" . ($desc ? ": $desc" : "") . "\n";
    if ($full && $p['content']) {
        $text = plainText($p['content']);
        if ($text) echo "\n  " . wordwrap($text, 120, "\n  ", false) . "\n\n";
    }
}

// ── Founders Unfiltered ───────────────────────────────────────────────────────
echo "\n## Founders Unfiltered (Interviews)\n\n";

foreach ($staticPods as $p) {
    if ($p['cat'] !== 'founders-unfiltered') continue;
    $url = "$baseUrl/{$p['cat']}/{$p['slug']}";
    echo "- [{$p['title']}]($url)\n";
}

foreach ($dbByType['founders_unfiltered'] as $p) {
    $url = "$baseUrl/founders-unfiltered/{$p['slug']}";
    $desc = $p['meta_description'] ?: '';
    echo "- [{$p['title']}]($url)" . ($desc ? ": $desc" : "") . "\n";
    if ($full && $p['content']) {
        $text = plainText($p['content']);
        if ($text) echo "\n  " . wordwrap($text, 120, "\n  ", false) . "\n\n";
    }
}

// ── Driven by Purpose ─────────────────────────────────────────────────────────
echo "\n## Driven by Purpose (Impact Stories)\n\n";

foreach ($staticPods as $p) {
    if ($p['cat'] !== 'driven-by-purpose') continue;
    $url = "$baseUrl/{$p['cat']}/{$p['slug']}";
    echo "- [{$p['title']}]($url)\n";
}

foreach ($dbByType['driven_by_purpose'] as $p) {
    $url = "$baseUrl/driven-by-purpose/{$p['slug']}";
    $desc = $p['meta_description'] ?: '';
    echo "- [{$p['title']}]($url)" . ($desc ? ": $desc" : "") . "\n";
    if ($full && $p['content']) {
        $text = plainText($p['content']);
        if ($text) echo "\n  " . wordwrap($text, 120, "\n  ", false) . "\n\n";
    }
}

// ── Events ────────────────────────────────────────────────────────────────────
echo "\n## Events\n\n";

foreach ($staticEvents as $e) {
    $url = "$baseUrl/events/{$e['slug']}";
    echo "- [{$e['title']}]($url)\n";
}

foreach ($dbByType['event'] as $p) {
    $url = "$baseUrl/events/{$p['slug']}";
    $desc = $p['meta_description'] ?: '';
    echo "- [{$p['title']}]($url)" . ($desc ? ": $desc" : "") . "\n";
    if ($full && $p['content']) {
        $text = plainText($p['content']);
        if ($text) echo "\n  " . wordwrap($text, 120, "\n  ", false) . "\n\n";
    }
}

// ── Key Pages ─────────────────────────────────────────────────────────────────
echo "\n## Key Pages\n\n";
echo "- [Home]($baseUrl/): Curated feed of all stories across blogs, pods, and success wire\n";
echo "- [About]($baseUrl/about): About SuccessWikis and the team behind it\n";
echo "- [Get Featured]($baseUrl/get-featured): Submit your founder story to be featured\n";
echo "- [Contact]($baseUrl/contact): Contact the SuccessWikis team\n";
echo "- [Events]($baseUrl/events): Upcoming and past SuccessWikis events\n";
