const default_endpoints = {
    navbar: 'static/profile/navbar_data.json',
    home: 'static/profile/home_data.json',
    social: 'static/profile/social_data.json',
    about: 'static/profile/about_data.json',
    education: 'static/profile/education_data.json',
    experiences: 'static/profile/experiences_data.json',
    projects: 'static/profile/projects_data.json',
    contact: 'static/profile/contact_data.json',
};

const api_endpoints = {
    navbar: 'https://icestationzebraassociates.live/api/v1/portfolio/navbar',
    home: 'https://icestationzebraassociates.live/api/v1/portfolio/home',
    social: 'https://icestationzebraassociates.live/api/v1/portfolio/social',
    about: 'https://icestationzebraassociates.live/api/v1/portfolio/about',
    education: 'https://icestationzebraassociates.live/api/v1/portfolio/education',
    experiences: 'https://icestationzebraassociates.live/api/v1/portfolio/experiences',
    projects: 'https://icestationzebraassociates.live/api/v1/portfolio/projects',
    contact: 'https://icestationzebraassociates.live/api/v1/portfolio/contact',
};

const cache = {};

async function getEndpoint(key) {
    // If the data was previously fetched and stored, return it
    if (cache[key]) {
        return cache[key];
    }

    // Validate key
    if (!api_endpoints[key]) {
        throw new Error(`Invalid endpoint key: ${key}`);
    }

    // Try fetching the endpoint
    try {
        const response = await fetch(api_endpoints[key]);
        if (!response.ok) {
            throw new Error(`API response error. Status: ${response.status}`);
        }

        const data = await response.json(); // Assuming the response is in JSON format
        cache[key] = data; // Store the fetched data in the cache
        // console.log(`Fetched endpoint for ${key}.`);
        return data;
    } catch (error) {
        console.error(`Using default endpoint for ${key}. Error: ${error}`);
        
        // Fetch the static data if the API fails
        const staticResponse = await fetch(default_endpoints[key]);
        const staticData = await staticResponse.json(); // Assuming the static data is in JSON format

        cache[key] = staticData; // Store the default data in the cache
        return staticData;
    }
}


async function preloadEndpoints(excludeKey = null) {
    for (const key in api_endpoints) {
        if (key === excludeKey) continue; // Skip the excluded key

        // Ignore exceptions and continue preloading the rest
        try {
            await getEndpoint(key);
        } catch (error) {
            console.error(`Failed to preload endpoint ${key}: ${error}`);
        }
    }
}

export { getEndpoint, preloadEndpoints };