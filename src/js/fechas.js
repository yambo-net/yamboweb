let attached = false;
let isTouchDevice = 'ontouchstart' in document.documentElement;
let imageContainer = document.querySelector('#floating-image-container');
let imageUrl = null;

if (isTouchDevice) {
  imageContainer.removeEventListener('mouseenter', showImage);
  imageContainer.removeEventListener('mouseleave', hideImage);
}

const followMouse = (event) => {
  imageContainer.style.left = event.x + 'px';
  imageContainer.style.top = event.y + 'px';
};

function showImage(newImageUrl) {
  console.log('show');
  if (!attached || newImageUrl != imageUrl) {
    console.log('inside');
    attached = true;
    imageUrl = newImageUrl;
    let composedUrl = `/assets/flyers/${imageUrl}.png`;
    imageContainer.children[0].src = composedUrl;
    imageContainer.style.display = 'block';
    if (!isTouchDevice) {
      imageContainer.style.left = event.x + 'px';
      document.addEventListener('pointermove', followMouse);
    } else {
      imageContainer.style.right = '1rem';
    }
    imageContainer.style.top = event.y + 'px';
  }
}

function hideImage() {
  attached = false;
  imageContainer.style.display = 'none';
  if (!isTouchDevice) document.removeEventListener('pointermove', followMouse);
}

function toggleImage(newImageUrl) {
  console.log('toggle');
  attached && imageUrl == newImageUrl ? hideImage() : showImage(newImageUrl);
}
