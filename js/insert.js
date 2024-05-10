document.addEventListener('DOMContentLoaded', function() {
    // フォーム要素を取得
    var form = document.querySelector('form');

    // フォームがsubmitされたときのイベントリスナーを追加
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // デフォルトの送信をキャンセル
        // FormData オブジェクトを生成
        const formData = new FormData(form);

        // FormData を JSON オブジェクトに変換
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // JSON データをサーバーに送信
        var requestData = {
            model: "UserModel",  // 送信するクラス名
            method: "insert",    // 実行したいメソッド名
            data: jsonData       // 登録データ
        };
        sendData(requestData);
    });
});

    document.getElementById('register-button').addEventListener('click', function() {

        window.location.href = 'list.php'; // ボタンが押された後にリダイレクト
    });
  
// サーバーに JSON データを送信する関数
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
        console.log(data); // サーバーからのレスポンスをコンソールに出力
    })
    .catch(error => {
        console.error('Fetchエラー:', error);
    });
}
