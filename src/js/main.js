const $main = document.getElementById('main');
const $video = document.getElementById('video');
const $btnCopy = document.getElementById('btnCopy');

// Keep track of the latest elem ID
let currentElemIndex = 0;

// Init webcam feed
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => $video.srcObject = stream);

// Methods
const cElem = (type) => {
  return document.createElement(type || 'div');
}
const cloneVideo = () => {
  const $img        = cElem('img');
  const $canvas     = cElem('canvas');
  const $elem       = cElem();
  const $elemInner  = cElem();
  const ctx         = $canvas.getContext('2d');
  
  $canvas.width = $video.videoWidth;
  $canvas.height = $video.videoHeight;
  ctx.drawImage($video, 0, 0);
  $img.src = $canvas.toDataURL('image/png');

  $elem.classList.add('elem');
  $elemInner.classList.add('elem__inner');
  $elem.appendChild($elemInner);
  $elemInner.appendChild($img);
  $main.appendChild($elem);
}

// Button events
$btnCopy.addEventListener('click', cloneVideo);

