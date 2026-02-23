const token = 'nfp_DseSRV6ywnEg5h5pXLVTq5Q9f7gt5VRL50e9';

async function run() {
    try {
        console.log("Creating Site...");
        const res = await fetch('https://api.netlify.com/api/v1/sites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'elegant-celebrations-app-' + Math.floor(Math.random() * 10000)
            })
        });

        if (!res.ok) {
            console.error("Error creating site", await res.text());
            return;
        }

        const site = await res.json();
        console.log("Created site:", site.name);
        console.log("Site ID:", site.site_id);
        console.log("URL:", site.url);
        console.log("Admin URL:", site.admin_url);
        require('fs').writeFileSync('site_id.txt', site.site_id);
    } catch (e) {
        console.error(e);
    }
}
run();
