function getSingleVideoReq(vidReq) {
    const VideoReqElementContainer = document.createElement('div');
    VideoReqElementContainer.innerHTML = `
            <div class="card mb-3">
            <div class="card-body d-flex justify-content-between flex-row">
            <div class="d-flex flex-column">
                <h3>${vidReq.topic_title}</h3>
                <p class="text-muted mb-2">${vidReq.topic_details}</p>
                <p class="mb-0 text-muted">
                <strong>Expected results:</strong>${vidReq.expected_result}
                </p>
            </div>
            <div class="d-flex flex-column text-center">
                <a class="btn btn-link">🔺</a>
                <h3>0</h3>
                <a class="btn btn-link">🔻</a>
            </div>
            </div>
            <div class="card-footer d-flex flex-row justify-content-between">
            <div>
                <span class="text-info">${vidReq.status}</span>
                &bullet; added by <strong>${vidReq.author_name}</strong> on
                <strong>${new Date (vidReq.submit_date).toLocaleDateString()}</strong>
            </div>
            <div
                class="d-flex justify-content-center flex-column 408ml-auto mr-2">
                <div class="badge badge-success">
                ${vidReq.target_level}
                </div>
            </div>
            </div>
        </div>
            `;
            return VideoReqElementContainer
}
document.addEventListener('DOMContentLoaded', function () {

    const formObject = document.getElementById('formVideoRequest');
    const listOfVideoElem = document.getElementById('listOfRequests');

    
      
    fetch('http://localhost:7777/video-request')
        .then((blob) => blob.json())
        .then((data) => {
            data.forEach((vidReq) => {
                listOfVideoElem.appendChild(getSingleVideoReq(vidReq));
            });
    });

    formObject.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch('http://localhost:7777/video-request', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams(new FormData(formObject)),
       })
        .then((blob) => blob.json())
        .then((data) => {
            listOfVideoElem.prepend(getSingleVideoReq(data));
        });
    });
 });