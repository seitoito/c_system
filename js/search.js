
// // 検索ボタンにイベントリスナーを追加
document.getElementById('search-button').addEventListener('click', searchCustomers);
document.addEventListener('DOMContentLoaded', searchCustomers);



// 検索
function searchCustomers() {
    // フォームからの入力値を取得してparamsオブジェクトに格納
    var params = {
        name: document.getElementById("name").value,
        name_kana: document.getElementById("name_kana").value,
        gender: document.getElementById("gender").value,
        birthdateStart: document.getElementById("birthdateStart").value,
        birthdateEnd: document.getElementById("birthdateEnd").value,
        company_id: document.getElementById("company_id").value
    };


    // 全体のリクエストデータ構造を設定
    var requestData = {
        model: "UserModel",  // 送信するクラス名
        method: "search",    // 実行したいメソッド名
        data: params       // 検索データ
    }

    

// fetchリクエストを作成してサーバーに送信
fetch('controller.php', {
    method: 'POST',
    body: JSON.stringify(requestData), // 正しいデータ変数を使用
    headers: {
        'Content-Type': 'application/json' // データをjson形式であることをサーバーに伝える
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();  // レスポンスをJSON形式にパース
})
.then(data => {
    // console.log('Search results:', data); // サーバーからのレスポンスをコンソールに出力
    updateView(data); // ビューの更新関数を呼び出す
})
.catch(error => {
    console.error('Fetch error:', error);
});



// 一覧表示関数
function updateView(data2) {
    const resultsTbody = document.getElementById('results'); // tbody要素を取得
    // 初期行以外を削除
    Array.from(resultsTbody.querySelectorAll('tr:not(.initial-row)')).forEach(tr => tr.remove());
    // 新しい検索結果を追加
    data2.body.forEach(customer => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.name_kana}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.company_name}</td>
            <td>${customer.insert_time}</td>
            <td>${customer.update_time}</td>
            <td><button class="edit-button" onclick="window.location.href='edit.php?id=${customer.id}'">編集</button></td>
            <td><button class="delete-button" onclick="deleteCustomer(${customer.id})">削除</button></td>
        `;
        resultsTbody.appendChild(tr);
    });
}

};


function deleteCustomer(customerId) {
    // 本当に削除するか確認するアラート
    if (confirm("本当に削除しますか？")) {
        var requestData = {
            model: "UserModel",
            method: "delete",
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
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Delete result:', data);
            // 必要に応じてレスポンスを処理
            // ページをリロード
            location.reload();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

        console.log('Delete button clicked for customer ID:', customerId);
    } else {
        // キャンセル時の処理
        console.log('Delete canceled for customer ID:', customerId);
    }
}
