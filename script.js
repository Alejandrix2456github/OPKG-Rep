// --- script.js ---

const JSON_URL = 'https://raw.githubusercontent.com/Alejandrix2456github/OPKG-Rep/main/store/packages.json';
const catalogDiv = document.getElementById('package-catalog');

fetch(JSON_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(packages => {
        // Create the table element
        let htmlContent = '<table>';
        htmlContent += '<tr><th>Package Name</th><th>Version</th><th>Description</th><th>Install Command</th></tr>';

        // Iterate over the JSON array
        packages.forEach(pkg => {
            // Build the install command string for users
            const installCmd = `opkg install ${pkg.name}`;

            htmlContent += `<tr>
                <td>${pkg.name}</td>
                <td>${pkg.version}</td>
                <td>${pkg.description}</td>
                <td><code>${installCmd}</code></td>
            </tr>`;
        });

        htmlContent += '</table>';
        catalogDiv.innerHTML = htmlContent;
    })
    .catch(error => {
        catalogDiv.innerHTML = `<p style="color: red;">Failed to load package catalog: ${error.message}</p>`;
    });

// --- End of script.js ---
