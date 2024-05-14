document.addEventListener('DOMContentLoaded', function() {
    var registerButton = document.getElementById('register-button');

    registerButton.addEventListener('click', function(event) {
        event.preventDefault();
        var isValid = validateForm();//validateForm関数実行

        if (isValid) {//成功時の処理
            var form = document.getElementById('customer-form');
            const formData = new FormData(form);
            const jsonData = {};//json形式に変換
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            var requestData = {
                model: "UserModel",
                method: "insert",
                data: jsonData
            };
            sendData(requestData);
        }
    });
});

function validateForm() {
    var isValid = true;

    const fields = [
        { id: 'customer_name', message: '顧客名は必須です。', required: true },
        { id: 'customer_name_kana', message: '顧客名カナは必須です。カタカナで入力してください。', pattern: /^[ァ-ヶー]+$/ },
        { id: 'email', message: 'メールアドレスの形式が正しくありません。', pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/ },
        { id: 'phone', message: '電話番号の形式が正しくありません。', pattern: /^[0-9]{2,4}[0-9]{2,4}[0-9]{3,4}$/ },
        { id: 'birthday', message: '生年月日は必須です。', required: true },
    ];

    clearErrorMessages();

    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (field.required && !element.value) {//フィールドがrequiredであり、かつ空文字だった場合バリデーションエラー
            showError('error-' + field.id, field.message);
            isValid = false;
        } else if (field.pattern && !field.pattern.test(element.value)) {//パターンが定義されている、かつ空文字の場合バリデーションエラー
            showError('error-' + field.id, field.message);
            isValid = false; //falseなので一番上のif文が実行されず登録の処理はされない
        }
    });

    return isValid;
}

function showError(elementId, message) {
    var errorElement = document.getElementById(elementId);//エラーメッセージ要素を取得
    if (!errorElement) {//errorElementがnullかundefinedの場合
        errorElement = document.createElement('div');//新しい要素を生成してそこにエラーメッセージが入る
        errorElement.id = elementId;//作成した div 要素に、指定された elementId を設定->特定の入力要素にエラーメッセージが関連付けられる
        var inputElement = document.getElementById(elementId.replace('error-', ''));
        inputElement.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;//エラーメッセージが画面上に表示
    errorElement.style.display = 'block';
    errorElement.style.color = 'red'; // 赤色に設定
}


function clearErrorMessages() {//エラーメッセージが消える
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(message) {
        message.style.display = 'none';
    });
}

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

