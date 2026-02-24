<?php
header("Content-Type: application/xml; charset=utf-8");

// Base URL
// Determine protocol and host dynamically (same logic as index.php)
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'];
$baseUrl = $protocol . $host;

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

// Helper function to output URL entry
function addUrl($loc, $lastmod = null, $changefreq = 'monthly', $priority = '0.5')
{
    echo '<url>';
    echo '<loc>' . htmlspecialchars($loc) . '</loc>';
    if ($lastmod) {
        echo '<lastmod>' . $lastmod . '</lastmod>';
    } else {
        echo '<lastmod>' . date('Y-m-d') . '</lastmod>';
    }
    echo '<changefreq>' . $changefreq . '</changefreq>';
    echo '<priority>' . $priority . '</priority>';
    echo '</url>';
}

// 1. Static Pages
$staticPages = [
    '/',
    '/about',
    '/contact',
    '/careers',
    '/access-statement',
    '/ads',
    '/cookies-policy',
    '/privacy-policy',
    '/terms-of-use',
    '/works',
    '/events',
    '/blogs',
    '/success-wire'
];

foreach ($staticPages as $page) {
    // Homepage gets higher priority
    $p = ($page === '/') ? '1.0' : '0.8';
    addUrl($baseUrl . $page, date('Y-m-d'), 'daily', $p);
}

// 2. Blog Metadata
$blogMetadata = [
    [
        "slug" => "ambition-is-changing"
    ],
    [
        "slug" => "fear-every-founder-has"
    ],
    [
        "slug" => "dont-need-figured-out"
    ],
    [
        "slug" => "how-to-tell-story"
    ]
];

foreach ($blogMetadata as $item) {
    addUrl($baseUrl . "/blogs/" . $item['slug'], null, 'monthly', '0.7');
}

// 3. Pod Metadata
$podMetadata = [
    [
        "slug" => "raghav-foundation",
        "categorySlug" => "driven-by-purpose"
    ],
    [
        "slug" => "zenith-energy",
        "categorySlug" => "driven-by-purpose"
    ],
    [
        "slug" => "aec-sastra",
        "categorySlug" => "driven-by-purpose"
    ],
    [
        "slug" => "desi-dips",
        "categorySlug" => "driven-by-purpose"
    ],
    [
        "slug" => "fintech-ipo-wave",
        "categorySlug" => "driven-by-purpose"
    ],
    [
        "slug" => "tarini-sai",
        "categorySlug" => "stage-behind-the-story"
    ],
    [
        "slug" => "soldier-rewired",
        "categorySlug" => "stage-behind-the-story"
    ],
    [
        "slug" => "man-who-builds-schools",
        "categorySlug" => "stage-behind-the-story"
    ],
    [
        "slug" => "green-recykloplast",
        "categorySlug" => "stage-behind-the-story"
    ],
    [
        "slug" => "nexgen-software",
        "categorySlug" => "stage-behind-the-story"
    ],
    [
        "slug" => "westfield-international",
        "categorySlug" => "stage-behind-the-story"
    ],
    [
        "slug" => "leenus-infra",
        "categorySlug" => "founders-unfiltered"
    ],
    [
        "slug" => "sindhu-reddy",
        "categorySlug" => "founders-unfiltered"
    ],
    [
        "slug" => "raghu-boddu",
        "categorySlug" => "founders-unfiltered"
    ]
];

foreach ($podMetadata as $item) {
    addUrl($baseUrl . "/" . $item['categorySlug'] . "/" . $item['slug'], null, 'monthly', '0.7');
}

// 4. Success Lens Metadata
$successLensMetadata = [
    ["slug" => "torrent-pharma-fda-inspection"],
    ["slug" => "vigyanshaala-nikkei-asia-award"],
    ["slug" => "neemans-funding-growth"],
    ["slug" => "lucknow-india-next-ai-hub"],
    ["slug" => "night-solar-tech"],
    ["slug" => "jpmorgan-chase-earnings"],
    ["slug" => "google-invest-15-billion-ai"],
    ["slug" => "shark-tank-hoora-success"],
    ["slug" => "handmade-roots-global-movement"],
    ["slug" => "hype-to-habit-new-normal"],
    ["slug" => "india-deeptech-talent-patience"],
    ["slug" => "d2c-brands-learn-blinkit"],
    ["slug" => "zoho-arattai-surge"],
    ["slug" => "amazon-fresh-expansion"],
    ["slug" => "india-tech-founders-step-up"],
    ["slug" => "cg-power-us-data-center-order"],
    ["slug" => "tata-motors-hydrogen-fuel-cell-bus"],
    ["slug" => "google-brings-gemini-ai-chrome"],
    ["slug" => "global-innovation-forum-ces-2026"],
    ["slug" => "rbi-keeps-borrowing-costs-steady"],
    ["slug" => "budget-2026-customs-duty-overhaul"],
    ["slug" => "ikea-expands-tamil-nadu-online"],
];

foreach ($successLensMetadata as $item) {
    addUrl($baseUrl . "/success-wire/" . $item['slug'], null, 'monthly', '0.6');
}

// 5. Event Metadata
$eventMetadata = [
    [
        "slug" => "episode-1"
    ]
];

foreach ($eventMetadata as $item) {
    addUrl($baseUrl . "/events/" . $item['slug'], null, 'monthly', '0.6');
}

echo '</urlset>';
?>