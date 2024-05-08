
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>顧客登録</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/register.css">

</head>
<body>
  <div class="container">
    <h1>顧客登録</h1>
    <form action="submit.php" method="post">
        <div class="form-group">
            <label for="customer_name">1. 顧客名</label>
            <input type="text" id="customer_name" name="name">
        </div>
        <div class="form-group">
            <label for="customer_name_kana">2. 顧客名カナ</label>
            <input type="text" id="customer_name_kana" name="name_kana">
        </div>
        <div class="form-group">
            <label for="email">3. メールアドレス</label>
            <input type="email" id="email" name="email">
        </div>
        <div class="form-group">
            <label for="phone">4. 電話番号</label>
            <input type="tel" id="phone" name="phone">
        </div>
        <div class="form-group">
        </select>
            <label for="gender">5. 性別</label>
            <select id="gender" name="gender">
            <option value="1">男性</option>
            <option value="2">女性</option>
            <option value="3">その他</option>
            </select>
        </div>
        <div class="search-field">
            <label class="search-label">6.生年月日:</label>
            <div class="date-range-container">
                <div class="date-range-box end-date-box">
                    <input type="date" name="birthday" class="search-box">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="company">7. 所属会社</label>
                <select id="company_id" name="company_id" class="form-control">
                    <!-- <option value="1">会社1</option>
                    <option value="2">会社2</option>
                    <option value="3">会社3</option> -->
                    <!-- その他のオプションを追加可能 -->
                </select>
                <button type="button" id="select-company-button" onclick="openCompanyModal()">会社名を登録・編集・削除</button>
        </div>
        <input type="submit" id="register-button"value="登録する">
    </form>
    <a href="list.php" class="back-link">一覧画面へ戻る</a>
  </div>

  <!-- ここにモーダルのHTMLを追加 -->
  <!-- モーダルのHTML -->
    <div id="companyModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>会社一覧</h2>
           <!-- ここに会社一覧を表示するコンテンツ -->
                <div class="company-item">
                    <input type="text" id="company" name="company" class="company-input" placeholder="会社名を入力">
                    <button id="registerButton" class="register-button">登録</button>
                </div>
                <div id="company-list" class="company-list">
                <div class="company-item">
                    <h3>会社名1</h3>
                    <button class="edit-button" onclick="editCompanyName(this)">編集</button>
                    <button class="delete-button">削除</button>
                </div>
                <div class="company-item">
                    <h3>会社名1</h3>
                    <button class="edit-button" onclick="editCompanyName(this)">編集</button>
                    <button class="delete-button">削除</button>
                </div>
                <div class="company-item">
                    <h3>会社名1</h3>
                    <button class="edit-button" onclick="editCompanyName(this)">編集</button>
                    <button class="delete-button">削除</button>
                </div>
                <div class="company-item">
                    <h3>会社名1</h3>
                    <button class="edit-button" onclick="editCompanyName(this)">編集</button>
                    <button class="delete-button">削除</button>
                </div>
    </div>
<script src="js/insert.js" ></script>
<script src="js/insert_modal.js" ></script>
<script src="js/modal_register.js" ></script>
</body>
</html>
