document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("companyModal");
    const btn = document.getElementById("select-company-button");
    const span = document.getElementsByClassName("close")[0];
    const editButtons = document.querySelectorAll('.edit-button');

    // モーダルを閉じるボタンの処理
    span.onclick = function() {
        modal.style.display = "none";
    };

    // モーダルを表示するボタンの処理
    btn.onclick = function() {
        modal.style.display = "block";
        console.log("ボタンがクリックされました。");
    };

    // モーダルの外側をクリックしても閉じる処理
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // 編集ボタンのイベントリスナー
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            editCompanyName(button);
        });
    });
    function editCompanyName(button) {
        const companyNameElement = button.parentNode.querySelector('h3');
        const companyName = companyNameElement.innerText;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = companyName;
        inputField.className = 'input-edit'; // このクラスが正しく適用されているか確認
        button.parentNode.replaceChild(inputField, companyNameElement);
        inputField.focus();
    
        inputField.addEventListener('blur', function() {
            const newCompanyName = inputField.value;
            companyNameElement.innerText = newCompanyName;
            button.parentNode.replaceChild(companyNameElement, inputField);
            button.innerText = '編集';
        });
    
        button.innerText = '保存';
    }
    
});
