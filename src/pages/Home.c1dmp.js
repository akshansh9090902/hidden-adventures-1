// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixWindow from 'wix-window';
import { performSearch } from 'backend/new-module.web'; // Import the backend search function

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code

    // Listen for messages from the HTML Embed element
    // Replace '#htmlEmbed1' with the actual ID of your HTML Embed element
    $w("#htmlEmbed1").onMessage((event) => {
        const message = event.data;

        if (message.type === 'searchWidgetData') {
            console.log("Page received search data from widget:", message.params);
            const searchParams = message.params;

            // Call the backend search function
            performSearch(searchParams)
                .then(results => {
                    console.log("Page received search results from backend:", results);
                    // Send results back to the HTML Embed element
                    event.target.postMessage({
                        type: 'searchResults', // Custom message type for results
                        results: results
                    }, event.origin); // Use event.origin for security
                })
                .catch(error => {
                    console.error("Page error performing search:", error);
                    // Optionally send an error message back to the widget
                    event.target.postMessage({
                        type: 'searchResults',
                        results: [] // Send empty results or an error indicator
                    }, event.origin);
                });
        }
    });
});
