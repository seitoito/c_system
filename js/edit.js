// ページが読み込まれた時に初期表示処理を実行する
window.addEventListener('load', initializeEditForm);

// 初期表示処理を実行する関数
function initializeEditForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('id');

    var requestData = {
        model: "UserModel",
        method: "edit",
        data:{"id": customerId},
    }

    fetch('controller.php', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('name').value = data.body.name;
        document.getElementById('name_kana').value = data.body.name_kana;
        document.getElementById('email').value = data.body.email;
        document.getElementById('phone').value = data.body.phone;
        document.getElementById('company_id').value = data.body.company_id;
        document.getElementById('birthday').value = data.body.birthday;
        document.getElementById('gender').value = data.body.gender; 
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('customer-edit-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // デフォルトのフォーム送信をキャンセル

        const urlParams = new URLSearchParams(window.location.search);
        const customerId = urlParams.get('id');
        updateCustomer(customerId);
    });
});

// 顧客情報を更新する関数
function updateCustomer(customerId) {
    var requestData = {
        model: "UserModel",
        method: "update",
        data: {
            "id": customerId,
            "name": document.getElementById('name').value,
            "name_kana": document.getElementById('name_kana').value,
            "email": document.getElementById('email').value,
            "phone": document.getElementById('phone').value,
            "company_id": document.getElementById('company_id').value,
            "birthday": document.getElementById('birthday').value,
            "gender": document.getElementById('gender').value
        }
    }

    fetch('controller.php', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('update result:', data);
        window.location.href = 'list.php';
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
