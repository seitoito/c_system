document.addEventListener('DOMContentLoaded', function() {
    // ここに実行したい処理を記述する
    var requestData = {
        model: "CompanyModel",  
        method: "search",
        data: {}   
    };
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
        console.log('Search results:', data);
        updateSelect(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
});

// セレクトボックスに会社名を表示
function updateSelect(data) {
    const companyList = document.getElementById('company-list');
    const selectElement = document.getElementById('company_id');

    // company-listが存在する場合のみ処理
    if (companyList) {
        companyList.innerHTML = ''; // 既存の会社情報を削除

        // 新しい会社情報を追加
        data.body.forEach(customer => {
            const companyItem = document.createElement('div');
            companyItem.classList.add('company-item');

            const companyName = document.createElement('h3');
            companyName.textContent = customer.name;

            const editButton = document.createElement('button');
            editButton.textContent = '編集';
            editButton.classList.add('edit-button');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.classList.add('delete-button');

            companyItem.appendChild(companyName);
            companyItem.appendChild(editButton);
            companyItem.appendChild(deleteButton);
            companyList.appendChild(companyItem);
        });
    }

// selectElementが存在する場合のみ処理を行う
if (selectElement) {
    // 新しい会社情報を追加
    data.body.forEach(customer => {
        const optionElement = document.createElement('option');
        optionElement.value = customer.id; // 会社のIDを設定
        optionElement.textContent = customer.name; // 会社名を設定
        selectElement.appendChild(optionElement);
    });
}

}




