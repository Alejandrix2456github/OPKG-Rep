// --- script.js ---

// CRITICAL FIX: Using jsDelivr to bypass CORS issues on GitHub Pages.
// REPLACE 'Alejandrix2456github' with your actual username if it's different.
const JSON_URL = 'https://cdn.jsdelivr.net/gh/Alejandrix2456github/OPKG-Rep@main/packages.json';
const catalogDiv = document.getElementById('package-catalog');

// Function to safely create HTML content for an error
const displayError = (message) => {
    catalogDiv.innerHTML = `<p style="color: red; font-weight: bold;">Error loading catalog:</p><p>${message}</p>`;
};

fetch(JSON_URL)
    .then(response => {
        // Check if the HTTP status code is OK (200-299)
        if (!response.ok) {
            // Throw an error with the status to help with debugging
            throw new Error(`HTTP Status ${response.status} (${response.statusText}). Check your JSON file path.`);
        }
        return response.json();
    })
    .then(packages => {
        if (!Array.isArray(packages)) {
            throw new Error("Invalid JSON format. Expected an array.");
        }

        // Build the table structure
        let htmlContent = '<table>';
        htmlContent += '<tr><th>Package Name</th><th>Version</th><th>Description</th><th>Install Command</th></tr>';

        // Populate rows with package data
        packages.forEach(pkg => {
            // Ensure fields exist to prevent errors
            const name = pkg.name || 'N/A';
            const version = pkg.version || 'N/A';
            const description = pkg.description || 'No description provided.';
            const installCmd = `opkg install ${name}`;

            htmlContent += `<tr>
                <td>${name}</td>
                <td>${version}</td>
                <td>${description}</td>
                <td><code>${installCmd}</code></td>
            </tr>`;
        });

        htmlContent += '</table>';
        catalogDiv.innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        displayError(error.message);
    });

// --- End of script.js ---
