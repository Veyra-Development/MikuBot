const axios = require('axios');

// Cache Map: category -> { items: [], expiresAt: number }
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

// Curated static fallback media in case all online APIs fail
const fallbackMedia = {
    'real.solo': [
        { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', source: 'fallback' },
        { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', source: 'fallback' }
    ],
    'real.pair': [
        { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', source: 'fallback' }
    ],
    'real.random': [
        { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', source: 'fallback' }
    ],
    'real.other': [
        { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', source: 'fallback' }
    ]
};

// NekoBot category type mapping
const nekobotCategoryMap = {
    'real.solo': ['gonewild', 'ass', 'pussy', 'boobs'],
    'real.pair': ['anal'],
    'real.random': ['4k', 'gonewild', 'pgif', 'ass', 'pussy', 'boobs', 'anal'],
    'real.other': ['pgif'],
    'real.ass': ['ass'],
    'real.anal': ['anal'],
    'real.pussy': ['pussy'],
    'real.boobs': ['boobs'],
    'real.pgif': ['pgif'],
    'real.gonewild': ['gonewild'],
    'real.4k': ['4k'],
    'real.sex': ['anal', 'pussy'],
    'real.cum': ['pgif', 'pussy']
};

// Eporner category query mapping
const epornerCategoryMap = {
    'real.solo': 'solo',
    'real.pair': 'couple',
    'real.random': 'porn',
    'real.other': 'bdsm',
    'real.ass': 'ass',
    'real.anal': 'anal',
    'real.pussy': 'pussy',
    'real.boobs': 'tits',
    'real.pgif': 'gif',
    'real.gonewild': 'amateur',
    'real.4k': '4k',
    'real.sex': 'hardcore',
    'real.cum': 'cum'
};

// API sources list (endpoints array)
const apiSources = [
    {
        name: 'nekobot',
        fetch: async (category) => {
            const types = nekobotCategoryMap[category] || ['4k'];
            // Make 5 parallel requests to populate the cache with variety
            const promises = Array.from({ length: 5 }).map(async () => {
                const selectedType = types[Math.floor(Math.random() * types.length)];
                const url = `https://nekobot.xyz/api/image?type=${selectedType}`;
                const response = await axios.get(url, { timeout: 6000 });
                if (response.data && response.data.success && response.data.message) {
                    return {
                        url: response.data.message,
                        source: 'nekobot'
                    };
                }
                throw new Error('NekoBot returned invalid response structure');
            });

            const results = await Promise.allSettled(promises);
            const successful = results
                .filter(r => r.status === 'fulfilled')
                .map(r => r.value);

            if (successful.length === 0) {
                throw new Error('All parallel NekoBot fetches failed');
            }
            return successful;
        }
    },
    {
        name: 'eporner',
        fetch: async (category) => {
            const query = epornerCategoryMap[category] || 'porn';
            const page = Math.floor(Math.random() * 10) + 1;
            const url = `https://www.eporner.com/api/v2/video/search/?query=${query}&per_page=20&page=${page}`;

            const response = await axios.get(url, { timeout: 6000 });
            if (response.data && response.data.videos && response.data.videos.length > 0) {
                return response.data.videos.map(video => ({
                    url: video.default_thumb.src,
                    postUrl: video.url,
                    title: video.title,
                    source: 'eporner'
                }));
            }
            throw new Error('Eporner API returned no video results');
        }
    },
    {
        name: 'fallback',
        fetch: async (category) => {
            const items = fallbackMedia[category] || fallbackMedia['real.random'];
            return items.map(item => ({ ...item }));
        }
    }
];

/**
 * Retrieves a media item for the given category, using cache and fallbacks.
 * @param {string} category 
 * @returns {Promise<{url: string, source: string, postUrl?: string, title?: string}>}
 */
async function getMedia(category) {
    const now = Date.now();

    // 1. Check if we have valid cached items
    if (cache.has(category)) {
        const cached = cache.get(category);
        if (now < cached.expiresAt && cached.items.length > 0) {
            // Retrieve and remove a random item from cached array
            const idx = Math.floor(Math.random() * cached.items.length);
            const item = cached.items.splice(idx, 1)[0];
            return item;
        }
    }

    // 2. Cache is expired or empty, fetch from API sources in order (fallback mechanism)
    let fetchedItems = null;

    for (const source of apiSources) {
        try {
            fetchedItems = await source.fetch(category);
            if (fetchedItems && fetchedItems.length > 0) {
                break; // Stop at first successful source
            }
        } catch (error) {
            // Silently fallback to next API source
        }
    }

    if (!fetchedItems || fetchedItems.length === 0) {
        throw new Error('Failed to retrieve media from all API sources');
    }

    // Shuffle fetched items for maximum variety
    fetchedItems.sort(() => Math.random() - 0.5);

    // Save to cache
    cache.set(category, {
        items: fetchedItems,
        expiresAt: now + CACHE_TTL
    });

    // Return the first item
    return fetchedItems.splice(0, 1)[0];
}

module.exports = {
    getMedia
};
