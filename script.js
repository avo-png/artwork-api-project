async function fetchArtworks() {
	const imgElement = document.getElementById("artworkImage");
	const title = document.getElementById("artworkTitle");
	const display = document.getElementById("artworkDisplay");
	const origin = document.getElementById("artworkOrigin");
	const description = document.getElementById("artworkDescription");

	try {
		const response = await fetch(
			"https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,place_of_origin,short_description,artist_display"
		);

		const data = await response.json();

		// Filter artworks that actually have images
		const artworksWithImages = data.data.filter((a) => a.image_id);

		// Pick a random artwork from the filtered list
		const artwork =
			artworksWithImages[Math.floor(Math.random() * artworksWithImages.length)];

		// Safe image load + cache bust
		imgElement.src = `https://www.artic.edu/iiif/2/${
			artwork.image_id
		}/full/843,/0/default.jpg?cb=${Date.now()}`;

		title.textContent = artwork.title || "N/A";
		display.textContent = artwork.artist_display || "N/A";
		origin.textContent = artwork.place_of_origin || "N/A";
		description.textContent = artwork.short_description || "N/A";
	} catch (error) {
		console.error("Error fetching artworks:", error);
	}
}
