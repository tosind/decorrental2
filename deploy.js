import fs from 'fs';
import { execSync } from 'child_process';

const token = 'nfp_DseSRV6ywnEg5h5pXLVTq5Q9f7gt5VRL50e9';

async function deploy() {
    try {
        const siteId = fs.readFileSync('site_id.txt', 'utf8').trim();
        console.log(`Zipping dist folder...`);
        execSync('Compress-Archive -Path dist\\* -DestinationPath site.zip -Force', { shell: 'powershell.exe', stdio: 'inherit' });

        console.log(`Uploading to Netlify Site ID ${siteId}...`);

        const fileData = fs.readFileSync('site.zip');
        const res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/zip',
                'Authorization': `Bearer ${token}`
            },
            body: fileData
        });

        if (!res.ok) {
            console.error("Deploy failed:", await res.text());
            return;
        }

        const data = await res.json();
        console.log("Deployed successfully to:", data.deploy_ssl_url);
    } catch (e) {
        console.error("Deploy script failed:", e.message);
    }
}
deploy();
