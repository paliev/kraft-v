'use strict';
const d=document,w=window;
(function(h,e,f,k,c,l){function d(){a.classList.toggle(c);g&&a.classList.toggle(g)}function m(b){b=b.target;"a"!==b.tagName.toLowerCase()&&b!==f||d()}function n(){a.classList.contains(c)&&d()}var a=h.getElementsByTagName("html")[0],g=17===e[innerWidth]-a.offsetWidth?c+"17":void 0;k.addEventListener("click",d);768>e[innerWidth]&&(l.addEventListener("click",n),f.addEventListener("click",m))})(d,w,d.getElementById("menu"),d.getElementById("menu-btn"),"menu-open",d.getElementById("logo"));




(function(d){
	const facets = {};

	facets.selected = {};

	facets.filters = {};

	const articles = {
		els: {
			cont: d.getElementById('_painters')
		},
		data: null,
		urlData: '/data/authors.json',
		imagePath: '/i/_painters/',
		imageNone: '0.png',
		itemsPerPage: 10,

		fetchData(){
			fetch(this.urlData)
				.then(response => {
					if (response.ok) {
						return response.text().then(_text => {
							const data = JSON.parse(_text);
							if (data.authors) {
								this.data = data.authors;
								this.drawArticles(this.data, 1);
							} else {
								drawResultsArticlesNone();
							}
						});
					} else {
						console.log('Error code: ', response.status, ',', response.statusText);
					}
				})
				.catch(_error => {
					console.log('Error: ', _error);
				});
		},

		drawArticles(_data, _page){
				let html = '';

				const pagedItems = _page * this.itemsPerPage,
					length = _data.length > pagedItems ? pagedItems : _data.length;

				for (let i = pagedItems - this.itemsPerPage; i < length; i++) {
					html += this.template(_data[i]);
				}

				this.els.cont.insertAdjacentHTML('beforeend', html);
		},

		drawResultsArticlesNone(){
			articles.els.cont.innerHTML = '<h2>No authors found</h2>';
		},

		template(_){
			let html = `<article itemscope itemtype="https://schema.org/HomeAndConstructionBusiness">
					<h3 itemprop=name>
						${_.url ? `<a href="/company/${_.url}">${_.name}</a>` : _.name}
					</h3>
					<img itemprop=image src="${this.imagePath}${_.image ? _.image : this.imageNone}" alt="${_.name}">
					<address>
						<ul>
							<li itemprop=address itemscope itemtype="https://schema.org/PostalAddress"><b itemprop=addressLocality>${_.city}</b>
							<li itemprop=telephone><a href="tel:${_.phone}">${_.phone}</a>
							<li itemprop=email><a href="mailto:${_.email}">${_.email}</a>
						</ul>
					</address>
					<p itemprop=description>${_.description}</p>
					${_.paintTypes.length ? `<ul itemprop=hasOfferCatalog itemscope itemtype="https://schema.org/OfferCatalog">${_.paintTypes.map((type)=>`<li itemprop=itemListElement>${type}</li>`).join('')}</ul>` : ''}
					<dl>
						<dt>Number of projects<dd>${_.projects}
					</dl>
					<button itemprop=priceRange>Request a quote</button>
				</article>`;
			return html;
		},

		init(){
			this.fetchData();
		}
	};
	articles.init();

	articles.pagination = {};

	const browserHistory = {};
})(d);