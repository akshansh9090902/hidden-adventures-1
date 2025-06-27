// Import the wix-location API to handle URL redirects
import wixLocation from 'wix-location';

$w.onReady(function () {
    // --- SETUP YOUR WIDGET ---

    // 1. Set up the Travellers dropdown with options
    $w("#travellersDropdown").options = [
        {"label": "1 Traveller", "value": "1"},
        {"label": "2 Travellers", "value": "2"},
        {"label": "3 Travellers", "value": "3"},
        {"label": "4 Travellers", "value": "4"},
        {"label": "5+ Travellers", "value": "5"}
    ];
    // Select the first option by default
    $w("#travellersDropdown").selectedIndex = 0;

    // 2. Set the placeholder text for your inputs
    $w("#fromInput").placeholder = "e.g., Delhi";
    $w("#toInput").placeholder = "e.g., Bengaluru";
    $w("#departureDate").placeholder = "Select a date";


    // --- HANDLE THE SEARCH BUTTON CLICK ---

    $w("#searchButton").onClick(() => {
        // 3. Get the values from the input fields
        const fromLocation = $w("#fromInput").value;
        const toLocation = $w("#toInput").value;
        const departureDate = $w("#departureDate").value; // This is a Date object
        const travellerCount = $w("#travellersDropdown").value;

        // --- VALIDATION (Optional but Recommended) ---
        if (!fromLocation || !toLocation || !departureDate) {
            // You can show an error message to the user here
            console.log("Please fill in all required fields.");
            // Example: $w('#errorMessageText').show();
            return; // Stop the function if fields are empty
        }

        // 4. Format the date into YYYY-MM-DD format, which is common for travel sites
        const year = departureDate.getFullYear();
        const month = (departureDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
        const day = departureDate.getDate().toString().padStart(2, '0'); // Add leading zero
        const formattedDate = `${year}-${month}-${day}`;

        /*
         * 5. Construct the redirect URL for your affiliate partner.
         *    This is an EXAMPLE for a fictional partner. You MUST get the
         *    correct URL structure from your affiliate program (e.g., Travelpayouts, Skyscanner).
         */
        const affiliateBaseUrl = "https://www.skyscanner.net/transport/flights/"; // EXAMPLE URL
        const searchUrl = `${affiliateBaseUrl}${fromLocation}/${toLocation}/${formattedDate}/?adults=${travellerCount}`;

        // 6. Redirect the user to the search results page
        wixLocation.to(searchUrl);
    });
});