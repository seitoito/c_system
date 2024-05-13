document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);

        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        var requestData = {
            model: "UserModel",
            method: "insert",
            data: jsonData
        };
        sendData(requestData);
    });
});

function sendData(formData) {
    fetch('controller.php', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => { 
        console.log(data);
        window.location.href = 'list.php';
    })
    .catch(error => {
        console.error('Fetchエラー:', error);
    });
}
