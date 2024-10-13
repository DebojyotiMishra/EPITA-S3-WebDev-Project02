async function searchSpotify() {
    const query = document.getElementById('search-input').value;
    const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(query)}&type=tracks&limit=100`; 

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48368801a9msh41cc57a51b2ceadp1bed0fjsne8c552b679b4', 
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    const spinner = document.getElementById('spinner');
    const noResultsAlert = document.getElementById('no-results-alert');
    const resultsContainer = document.getElementById('results');

    spinner.classList.remove('d-none');
    resultsContainer.innerHTML = '';
    noResultsAlert.classList.add('d-none');

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);  

        spinner.classList.add('d-none');

        if (data.tracks && data.tracks.items && data.tracks.items.length > 0) {
            displayResults(data.tracks.items);
        } else {
            noResultsAlert.classList.remove('d-none'); 
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        spinner.classList.add('d-none'); 
        noResultsAlert.classList.remove('d-none'); 
    }
}

function displayResults(tracks) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';  

    tracks.forEach(trackItem => {
        const track = trackItem.data; 
        const trackElement = document.createElement('div');
        trackElement.className = 'col-md-3 mb-4';  

        trackElement.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${track.albumOfTrack?.coverArt?.sources[0]?.url || ''}" class="card-img-top" alt="Album cover" style="height: 200px; object-fit: cover;">
                <div class="card-body rounded-bottom">
                    <h5 class="card-title">${track.name || 'Unknown'}</h5>
                    <p class="card-text"><strong>Artist:</strong> ${track.artists?.items.map(artist => artist.profile.name).join(', ') || 'Unknown'}</p>
                </div>
            </div>
        `;

        resultsContainer.appendChild(trackElement);
    });
}
