let attached = false;

let imageContainer = document.querySelector('#floating-image-container');

const followMouse = (event) => {
  imageContainer.style.left = event.x + 'px';
  imageContainer.style.top = event.y + 'px';
};

async function showImage(imageUrl) {
  if (!attached) {
    attached = true;

    let composedUrl = `/.11ty/image/?src=src/fechas/${imageUrl}/flyer.png&width=865&format=png&via=transform`;
    imageContainer.children[0].src = composedUrl;
    imageContainer.style.display = 'block';
    imageContainer.style.left = event.x + 'px';
    imageContainer.style.top = event.y + 'px';
    document.addEventListener('pointermove', followMouse);
    document.addEventListener('touchmove', followMouse);
  }
}

function hideImage() {
  attached = false;
  imageContainer.style.display = 'none';
  document.removeEventListener('pointermove', followMouse);
  document.removeEventListener('touchmove', followMouse);
}
