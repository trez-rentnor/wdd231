// Grid view selector
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const businessList = document.querySelector('#businesses');
gridButton.addEventListener('click', () => {
	businessList.classList.remove('list');
	businessList.classList.add('grid');
	gridButton.classList.add('active');
	listButton.classList.remove('active');
});
listButton.addEventListener('click', () => {
	businessList.classList.remove('grid');
	businessList.classList.add('list');
	listButton.classList.add('active');
	gridButton.classList.remove('active');
});
// Populate businesses

async function populateBusinesses() {
	const response = await fetch('data/members.json');
	const businesses = await response.json();

	const businessDiv = document.querySelector('#businesses');
	businesses.forEach(business => {
		const card = document.createElement('div');
		card.classList.add('card');

		const img = document.createElement('img');
		img.src = business.image;
		img.alt = `${business.name} Logo`;
		img.loading = 'lazy';
		card.appendChild(img);

		const name = document.createElement('p');
		name.classList.add('name');
		name.innerText = business.name;
		card.appendChild(name);

		const address = document.createElement('p');
		address.textContent = business.address;
		card.appendChild(address);

		const phone = document.createElement('p');
		phone.textContent = business.phone;
		card.appendChild(phone);

		const website = document.createElement('p');
		const websiteLink = document.createElement('a');
		websiteLink.href = business.website;
		websiteLink.textContent = business.website;
		website.appendChild(websiteLink);
		card.appendChild(website);

		businessDiv.appendChild(card);
	});
}
populateBusinesses();
