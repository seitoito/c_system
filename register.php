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
    <form method="post" id="customer-form">
      <div class="form-group">
        <label for="customer_name">1. 顧客名</label>
        <input type="text"maxlength="32" id="customer_name" name="name" required>
        <div class="error-message" id="error-name"></div>
      </div>
      <div class="form-group">
        <label for="customer_name_kana">2. 顧客名カナ</label>
        <input type="text" id="customer_name_kana" maxlength="32" name="name_kana" pattern="^[ァ-ヶー]+$" required>
        <div class="error-message" id="error-name-kana"></div>
      </div>
      <div class="form-group">
        <label for="email">3. メールアドレス</label>
        <input type="email"maxlength="50" id="email" name="email" >
        <!-- <div class="error-message" id="error-email"></div> -->
      </div>
      <div class="form-group">
        <label for="phone">4. 電話番号</label>
        <input type="tel" id="phone"maxlength="12" pattern="[0-9]{2,4}[0-9]{2,4}[0-9]{3,4}" name="phone">
        <div class="error-message" id="error-phone"></div>
      </div>
      <div class="form-group">
        <label for="gender">5. 性別</label>
        <select id="gender" name="gender">
          <option value="1">男性</option>
          <option value="2">女性</option>
          <option value="3">その他</option>
        </select>
        <div class="error-message" id="error-gender"></div>
      </div>
      <div class="search-field">
        <label class="search-label">6. 生年月日</label>
        <div class="date-range-container">
          <div class="date-range-box end-date-box">
          <input type="date" id="birthday" name="birthday" class="search-box" required>
            <div class="error-message" id="error-birthday"></div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="company">7. 所属会社</label>
        <select id="company_id" name="company_id" class="form-control"></select>
        <button type="button" id="select-company-button" onclick="openCompanyModal()">会社名を登録・編集・削除</button>
        <div class="error-message" id="error-company-id"></div>
      </div>
      <input type="submit" id="register-button" value="登録する">
      <a href="list.php" class="back-link">一覧画面へ戻る</a>
    </form>
  </div>

  <!-- モーダルのHTML -->
  <div id="companyModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>会社一覧</h2>
      <div class="company-item">
        <input type="text" id="company" name="company" class="company-input" placeholder="会社名を入力">
        <button id="registerButton" class="register-button">登録</button>
      </div>
      <div id="company-list" class="company-list">
        <!-- 会社リストの例 -->
        <div class="company-item">
          <h3>会社名1</h3>
          <button class="edit-button" onclick="editCompanyName(this)">編集</button>
          <button class="delete-button">削除</button>
        </div>
        <!-- 必要に応じて追加 -->
      </div>
    </div>
  </div>

  <script src="js/insert.js"></script>
  <script src="js/insert_modal.js"></script>
  <script src="js/modal_register.js"></script>
</body>
</html>
