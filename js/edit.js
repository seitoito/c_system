// フォームのバリデーションを行う関数
function validateForm() {
    var isValid = true;

    const fields = [
        { id: 'name', message: '顧客名は必須です。', required: true },
        { id: 'name_kana', message: '顧客名カナは必須です。カタカナで入力してください。', pattern: /^[ァ-ヶー]+$/ },
        { id: 'email', message: 'メールアドレスの形式が正しくありません。', pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/ },
        { id: 'phone', message: '電話番号の形式が正しくありません。', pattern: /^[0-9]{2,4}[0-9]{2,4}[0-9]{3,4}$/ },
        { id: 'birthday', message: '生年月日は必須です。', required: true },
    ];
    
    clearErrorMessages();

    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (field.required && !element.value) {
            showError('error-' + field.id, field.message);
            isValid = false;
        } else if (field.pattern && !field.pattern.test(element.value)) {
            showError('error-' + field.id, field.message);
            isValid = false;
        }
    });

    return isValid;
}

// エラーメッセージを表示する関数
function showError(elementId, message) {
    var errorElement = document.getElementById(elementId);
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = elementId;
        errorElement.className = 'error-message';
        var inputElement = document.getElementById(elementId.replace('error-', ''));
        inputElement.parentNode.appendChild(errorElement); // 親要素に追加する
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.style.color = 'red'; // 赤色に設定
}

// エラーメッセージをクリアする関数
function clearErrorMessages() {
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(message) {
        message.style.display = 'none';
    });
}


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
    const updateButton = document.getElementById('update-button');

    updateButton.addEventListener('click', function(event) {
        event.preventDefault(); // デフォルトのボタン押下時の動作を無効化

        if (validateForm()) {
            const urlParams = new URLSearchParams(window.location.search);
            const customerId = urlParams.get('id');
            updateCustomer(customerId);
        }
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
