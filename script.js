// async function fetchArtworks() {
// 	const imgElement = document.getElementById("artworkImage");
// 	const title = document.getElementById("artworkTitle");
// 	const display = document.getElementById("artworkDisplay");
// 	const origin = document.getElementById("artworkOrigin");
// 	const description = document.getElementById("artworkDescription");

// 	try {
// 		const response = await fetch(
// 			"https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,place_of_origin,short_description,artist_display&limit=60",
// 		);

// 		const data = await response.json();

// 		// Filter artworks that actually have images
// 		const artworksWithImages = data.data.filter((a) => a.image_id);

// 		// Pick a random artwork from the filtered list
// 		const artwork =
// 			artworksWithImages[Math.floor(Math.random() * artworksWithImages.length)];

// 		imgElement.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

// 		title.textContent = artwork.title || "N/A";
// 		display.textContent = artwork.artist_display || "N/A";
// 		origin.textContent = artwork.place_of_origin || "N/A";
// 		description.textContent = artwork.description || "N/A";
// 	} catch (error) {
// 		console.error("Error fetching artworks:", error);
// 	}
// }

async function getArtworkIds() {
	const response = await fetch(
		"https://api.artic.edu/api/v1/artworks?fields=id&limit=60",
	);

	const data = await response.json();
	return data.data;
}

async function getArtworkDetails(id) {
	const response = await fetch(
		`https://api.artic.edu/api/v1/artworks/${id}?fields=id,image_id,title,place_of_origin,short_description,artist_display`,
	);

	const data = await response.json();
	return data.data;
}

async function searchForArtwork() {
	const response =
		await fetch(
		// https://api.artic.edu/api/v1/artworks/search?query[term]
		);
	const data = await response.json();
	return data.data;
}

function displayArtwork(artwork) {
	const imgElement = document.getElementById("artworkImage");
	const title = document.getElementById("artworkTitle");
	const display = document.getElementById("artworkDisplay");
	const origin = document.getElementById("artworkOrigin");
	const description = document.getElementById("artworkDescription");

	imgElement.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

	title.textContent = artwork.title || "N/A";
	display.textContent = artwork.artist_display || "N/A";
	origin.textContent = artwork.place_of_origin || "N/A";
	description.textContent = artwork.description || "N/A";
}

async function fetchArtworks() {
	try {
		const artworks = await getArtworkIds();
		console.log(artworks);
		const randomArtwork = artworks[Math.floor(Math.random() * artworks.length)];
		console.log(randomArtwork);
		const artwork = await getArtworkDetails(randomArtwork.id);
		console.log(artwork);
		displayArtwork(artwork);
	} catch (error) {
		console.error(error);
	}
}

// voting selection
let yesClicks = 0;
function voteYes() {
	document.getElementById("yes").innerHTML = yesClicks;
	yesClicks += 1;
}

let noClicks = 0;
function voteNo() {
	noClicks += 1;
	document.getElementById("no").innerHTML = noClicks;
}
