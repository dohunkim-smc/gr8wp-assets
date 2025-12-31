document.addEventListener("DOMContentLoaded", function() {
	var wrappers = document.querySelectorAll('.lite-youtube-wrapper');
	wrappers.forEach(function(wrapper) {
		wrapper.querySelector('.lite-youtube-play-btn').addEventListener('click', function() {
			var iframe = document.createElement('iframe');
			iframe.setAttribute('src', wrapper.getAttribute('data-embed-url'));
			iframe.setAttribute('width', '100%');
			iframe.setAttribute('height', '315');
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
			iframe.setAttribute('allowfullscreen', 'true');

			var player = wrapper.querySelector('.lite-youtube-player');
			wrapper.querySelector('.lite-youtube-poster').style.display = 'none';
			player.appendChild(iframe);
		});
	});
});
