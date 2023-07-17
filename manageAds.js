// cette focntion joue la video si elle est place en premier dans la matrice et configure l image en arriere plan 
function playAds(matrix) {
    // image or background video

    let playVideoEvent = new Event('playVideo');

    let first = 0;


    let i = 0;
    // this listener lookup for elements that are not video elements

    document.addEventListener('playVideo', e => {

        var video = document.createElement('video');
        document.body.appendChild(video);
        video.style.position = "fixed";
        video.style.top = "0";
        video.style.left = "0";
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "contain";
        video.style.zIndex = "999";
        video.autoplay = true;
        // video.controls = true;

        var source = document.createElement('source');
        source.src = matrix[1][first].getAttribute('video');

        video.appendChild(source);

        video.addEventListener('click', function () {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });

        video.addEventListener('ended', function () {
            video.parentNode.removeChild(video);
        });
    });

    while (matrix[1][i].classList.contains('video')) {
        i++;
    }

    const firstNotVideo = matrix[1][i];


    const backgroundImage = firstNotVideo.getAttribute('icon');
    const body = document.querySelector("body");
    body.style.backgroundImage = "url(" + backgroundImage + ")";
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';




    // Check if the fourth element is a video
    if (matrix[1][first].classList.contains('video')) {


        console.log(matrix[1][0].getAttribute('video'));
        document.dispatchEvent(playVideoEvent);
    }




}
