// モーダル表示
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
    };

    // モーダルの外側をクリックしても閉じる処理
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

});
