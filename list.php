<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>顧客管理システム</title>
    <link rel="stylesheet" href="css\base.css">
    <link rel="stylesheet" href="css\list.css">
</head>
<body>
    <button onclick="location.href='index.php'" class="header-button">TOPに戻る</button>
    <button class="register-button" onclick="window.location.href='register.php'">登録</button>
    <!-- テキスト・セレクトボックス -->
    <div class="search-fields">
        <div class="search-field">
            <label for="customerName" class="search-label">顧客名:</label>
            <input type="text" id="name" name="name" class="search-box">
        </div>
        <div class="search-field">
            <label for="customerKana" class="search-label">顧客名カナ:</label>
            <input type="text" id="name_kana" name="name_kana" class="search-box">
        </div>
        <div class="search-field">
            <label for="gender" class="search-label">性別:</label>
            <select id="gender" name="gender" class="search-box">
                <option value="">選択してください</option>
                <option value="1">男性</option>
                <option value="2">女性</option>
                <option value="all">全て</option>
            </select>
        </div>
        <div class="search-field">
            <label class="search-label">生年月日:</label>
            <div class="date-range-container">
                <div class="date-range-box start-date-box">
                <input type="date" id="birthdateStart" name="birthdateStart" class="search-box">
                </div>
                <div class="date-range-box end-date-box">
                    <input type="date" id="birthdateEnd" name="birthdateEnd" class="search-box">
                </div>
            </div>
        </div>
        <div class="search-field">
        <label for="company" class="search-label company-label">所属会社:</label>
        <div class="company-search-buttons">
            <select id="company_id" name="company_id" class="search-box">
                <option value="all">全て</option>
            </select>
        </div>
        </div>
        <button class="search-button" id="search-button">検索</button>
    <script src="js/search.js" ></script>
    </div>
    <!-- テキスト・セレクトボックス -->
    
    <!-- 顧客情報のテーブル -->
    <table class="customer-table wide-table">
        <thead>
            <tr>
                <th>顧客ID</th>
                <th>顧客名</th>
                <th>顧客名カナ</th>
                <th>メールアドレス</th>
                <th>電話番号</th>
                <th>所属会社</th>
                <th>登録日時</th>
                <th>更新日時</th>
                <th>編集</th>
                <th>削除</th>
            </tr>
        </thead>
        <tbody id="results">
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button class="edit-button" id="edit-button">編集</button></td>
                <td><button class="delete-button">削除</button></td>
            </tr>
        </tbody>
    </table>
    <script src="js/delete.js" ></script>
    <script src="js/modal_register.js" ></script>
</body>
</html>
