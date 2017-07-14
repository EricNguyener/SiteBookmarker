// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if (!validateForm(siteName, siteURL)) {
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteURL
	}

	/*
		// Local Store Test
		localStorage.setItem('test', 'Hello World');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log(localStorage.getItem('test'));
	*/

	// Test if bookmark is null
	if (localStorage.getItem('bookmarks') === null) {
		// Initialize array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}	else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array
		bookmarks.push(bookmark);
		// Re-set back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear forms
	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
	fetchBookmarks();

	// Prevent form from submitting
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
	// Get bookmark from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url){
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}
	// Re-set back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetch bookmarks
	fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div iass="well">'+
									  '<h3>'+name+
									  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
									  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
									  '</h3>'+
									  '</div>';
	}
}

// Validate forms
function validateForm(siteName, siteURL) {
	if (!siteName || !siteURL) {
		alert('I didn\'t know your favorite site was a blank page.');
		return false;
	}

	// URL format validation
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteURL.match(regex)) {
		alert('Please use a valid URL, ya dingus.');
		return false;
	}

	return true;
}