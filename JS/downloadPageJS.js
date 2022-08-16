let Images = Array.from(document.querySelectorAll(".container .imgs-content .img-box"));
Images.forEach(box => {
    box.addEventListener("click", ev => {
	let overlay = document.createElement("div");
	let popupBox = document.createElement("div");
	document.body.style.overflow = "hidden";
	popupBox.classList.add("popup-box");
	overlay.classList.add("overlay");
	let closeButton = document.createElement("div");
	closeButton.classList.add("close-b");
  	closeButton.innerHTML = "X";
	closeButton.addEventListener("click", e => {
	    popupBox.remove();
	    overlay.remove();
	    document.body.style.overflow = "auto";
	});
	let box = document.createElement("div");
	box.classList.add("popup-header");
	box.innerHTML = `<img id="logo" src="Images/${ev.currentTarget.querySelector(".photo").dataset.from}-logo.avif" />`;
	let downloadBox = document.createElement("div");
	downloadBox.classList.add("download-box");
	downloadBox.innerHTML = `<a download href="Images/download/${ev.currentTarget.querySelector(".photo").alt}.jpg">Download <i class="pe-7s-download"></i></a>`;
	box.appendChild(downloadBox);
	let infoBox = document.createElement("div");
	infoBox.classList.add("info-box");
	infoBox.innerHTML = `<p>Name: ${ev.currentTarget.querySelector(".photo").alt}</p>
	<p>Width: ${ev.currentTarget.querySelector(".photo").dataset.width}</p>
	<p>Size: ${ev.currentTarget.querySelector(".photo").dataset.size}KB</p>
	<p>From: ${ev.currentTarget.querySelector(".photo").dataset.from}
	<p>Type: JPG`;
	popupBox.appendChild(box);
	popupBox.appendChild(closeButton);
	popupBox.appendChild(ev.currentTarget.querySelector(".photo").cloneNode());
	popupBox.appendChild(infoBox);
        document.body.prepend(popupBox);
	document.body.prepend(overlay);
    })
});
