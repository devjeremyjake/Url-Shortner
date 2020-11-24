const nav = document.getElementsByClassName('navbar__menu')[0];
const leftTab = document.getElementsByClassName('left')[0];
const rightTab = document.getElementsByClassName('right')[0];
const button = document.getElementById('button');
// const copy = document.querySelector('btn-copy');

nav.addEventListener('click', () => {
	leftTab.classList.toggle('show');
	rightTab.classList.toggle('show');
});

// Url function
button.addEventListener('click', (event) => {
	formField = document.getElementsByClassName('formField')[0].value;
	fetch(`https://api.shrtco.de/v2/shorten?url=${formField}`)
		.then((res) => res.json())
		.then((data) => {
			let myLink = data.result;
			console.log(myLink);
			// Store value in local Storage
			// {save an empty array if no data is present}
			if (localStorage.getItem('data') == null) {
				localStorage.setItem('data', '[]');
			}

			// Get Old data and add new
			let oldData = JSON.parse(localStorage.getItem('data'));
			oldData.unshift(myLink);

			// save old and new data to localStorage
			localStorage.setItem('data', JSON.stringify(oldData));
		})
		.catch((err) => console.log(err));
});

// Fetch data for display
fetchShortUrl = () => {
	let datas = JSON.parse(localStorage.getItem('data'));
	let urlLink = '';
	for (let [key, data] of datas.entries()) {
		if (localStorage.getItem('data') != null) {
			const longLink = data.original_link;
			const shortlink = data.full_short_link;
			urlLink += `
				<div class="shortner__link">
					<div class="shortner__link--url">
						<h5>${longLink}</h5>
					</div>
					<div class="shortner__link--button">
						<h5 >${shortlink}</h5>
						<button id="${key}" class="link btn-primary" value="${shortlink}" onclick="onClick(this.id, this.value)">Copy</button>
					</div>
				</div>
			`;
		}

		document.querySelector('.shortner').innerHTML = urlLink;
	}
};

fetchShortUrl();

function onClick(id, value) {
	navigator.clipboard.writeText(value);
	document.querySelector('.link').innerText = 'Copied!!!';
	document.querySelector('.link').classList.toggle('active');
	setTimeout(() => {
		document.querySelector('.link').innerText = 'Copy';
		document.querySelector('.link').classList.remove('active');
	}, 2000);
}
