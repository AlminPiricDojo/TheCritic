if(document.getElementById("fetch_data_form")){ // We only want to fetch show data if the DOM contains a 'fetch_data_form'
    fetch_form = document.getElementById("fetch_data_form");
    fetch_form.onsubmit = function(e){ // When the form is submitted, this function is triggered
        getShowData(); // Display search results
        e.preventDefault(); // Do not allow the page to refresh
    };
}

async function getShowData() {
    var showSearch = document.getElementById('show_search').value // Read the user input from our fetch data form
    var response = await fetch("https://api.tvmaze.com/search/shows?q="+showSearch); // Get data from API
    var showData = await response.json(); // Convert data to JSON

    document.getElementById("shows").innerHTML = "" // Clear shows from previous search
    document.getElementById("show_details").innerHTML = "" // Clear show_details

    for(var i = 0; i < showData.length; i++){ // Use a for loop to add each show that comes back from the API
        var showName = showData[i].show.name;
        var showId = showData[i].show.id;
        // Display each show name. When clicked, the show name triggers the 'selectShow' function and passes in the show id
        document.getElementById("shows").innerHTML += '<p onclick="selectShow('+showId+')">'+showName+'</p>';
    }
}

async function selectShow(showId){ // Display details of the selected show
    var response = await fetch("https://api.tvmaze.com/shows/"+showId); // We get the show based on the show id
    var showData = await response.json(); // Convert data to JSON
    var showImage = showData.image; // Get show image (if it exists)

    document.getElementById("fetch_data_form").innerHTML = ""; // Remove search form
    document.getElementById("show_results").innerHTML = ""; // Remove show search results

    // Display show details (name, summary, and a link that displays all episodes when clicked by calling the 'showEpisoded' function)
    document.getElementById("show_details").innerHTML = `
        <p>Show Name: `+showData.name+`</p>
        <p>Show Summary: `+showData.summary+`</p>
        <p id='episodes_display' onclick="showEpisodes(`+showId+`)">View Episodes</p>
    `;

    // If a show does not have an image, we skip this part
    if(showImage!=null){ // Some shows do not have images
        document.getElementById("show_details").innerHTML += `<img src="`+showData.image.medium+`"/>`
    }
}

async function showEpisodes(showId){ // Show all episodes of a particular show
    var response = await fetch("https://api.tvmaze.com/shows/"+showId+"/episodes"); // Get episode data
    var showData = await response.json(); // Convert data to JSON

    document.getElementById("episodes_display").innerHTML = "<hr>"; // Ad a horizontal line

    for(var i=0; i<showData.length; i++){ // Loop through all episodes and display their info
        document.getElementById("episodes").innerHTML += `
            <p>Season `+showData[i].season+` Episode `+showData[i].number+`: <a href="/episodes/`+showData[i].id+`">`+showData[i].name+`</a>
        `
    }
}

// EPISODE INFO
if(fetch_form = document.getElementById("view_episode_title")){ // Only execute if we are on the view_episode page
    // 'view_episode_title' temporarily holds the episode id, which we need to fetch the correct API data
    episodeId = document.getElementById("view_episode_title").innerHTML; // Get episode id
    viewEpisode(episodeId); // Fetch correct episode data based on the episode id
}

async function viewEpisode(episodeId){ // Display episode info
    // The next line uses '?embed=show' to add show info to the episode data, this is an API feature
    var response = await fetch("https://api.tvmaze.com/episodes/"+episodeId+"?embed=show"); // Get episode data
    var episodeData = await response.json(); // Convert data to JSON
    var showName = episodeData._embedded.show.name; // Get the show name
    var episodeImage = episodeData.image; // Get episode image (if it exists)

    // Since we no longer need our episode id, we can now overwrite it with the desired info
    // There are better ways to do this
    document.getElementById("view_episode_title").innerHTML = showName+' - '+episodeData.name; // Display show name and episode name

    // Display episode info
    document.getElementById("episode_info").innerHTML = `
        <p>Show Name: `+episodeData._embedded.show.name+`</p>
        <p>Show Summary: `+episodeData._embedded.show.summary+`</p>
        <hr>
        <p>Episode Name: `+episodeData.name+`</p>
        <p>Episode Summary: `+episodeData.summary+`</p>
    `

    // If an episode does not have an image, we skip this part
    if(episodeImage!=null){ // Some episodes do not have images
        document.getElementById("episode_info").innerHTML += `<img src="`+episodeData.image.medium+`"/>`
    }

    // Add links that allow us to browse episodes (also jumps to different shows if out of bounds)
    document.getElementById("episode_info").innerHTML += `
        <p><a href="/episodes/`+(episodeData.id-1)+`">Prev</a> | <a href="/episodes/`+(episodeData.id+1)+`">Next</a></p>
    `
}

// TODO
/*
Create db
Connect to db
Add new page where users can write show reviews
List all current reviews
Add new page where users can write episode reviews
List all current reviews
Add show/episode links that take users to the reviews page
BONUS:
Sort reviews by rating
*/