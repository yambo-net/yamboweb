let attached = false;
let imageContainer = document.querySelector('#floating-image-container');

const followMouse = (event) => {
  imageContainer.style.left = event.x + 'px';
  imageContainer.style.top = event.y + 'px';
};

function showImage(imageUrl) {
  if (!attached) {
    attached = true;
    let composedUrl = `/assets/flyers/${imageUrl}.png`;
    imageContainer.children[0].src = composedUrl;
    imageContainer.style.display = 'block';
    imageContainer.style.left = event.x + 'px';
    imageContainer.style.top = event.y + 'px';
    document.addEventListener('pointermove', followMouse);
  }
}

function hideImage() {
  attached = false;
  imageContainer.style.display = 'none';
}
