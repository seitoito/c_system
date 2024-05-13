<?php
require 'db.php';

class UserModel {
    protected $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    // $formdataには登録フォームの内容
    public function insert($formData) {
        try {
            // $formData = $formDatas['data'];
            $stmt = $this->pdo->prepare("INSERT INTO users (name, name_kana, phone, email, company_id, birthday, gender) VALUES (:name, :name_kana, :phone, :email, :company_id, :birthday, :gender)");
            $stmt->bindParam(':name', $formData['name']);
            $stmt->bindParam(':name_kana', $formData['name_kana']);
            $stmt->bindParam(':phone', $formData['phone']);
            $stmt->bindParam(':email', $formData['email']);
            $stmt->bindParam(':company_id', $formData['company_id']);
            $stmt->bindParam(':birthday', $formData['birthday']);
            $stmt->bindParam(':gender', $formData['gender']);
            $stmt->execute();
            $responseData['success'] = 0;
            return $formData;
        } catch (PDOException $e) {
            $responseData['success'] = 1;
            $responseData['error'] = $e->getMessage();
            return $responseData;
        }
    }

    public function search($data) {
        // データベースから会社の一覧を取得
        $sql = "SELECT id, name FROM companies";

        $pdo = $this->pdo;
        $sql = "SELECT u.*, c.name AS company_name FROM users AS u LEFT JOIN companies AS c ON u.company_id = c.id WHERE 1=1";
    
    
        // 顧客名の文字列部分一致検索
        if (!empty($data['name'])) {
            $sql .= " AND u.name LIKE '%" . $data['name'] . "%'";
        }
    
        // 顧客名カナの文字列部分一致検索
        if (!empty($data['name_kana'])) {
            $sql .= " AND u.name_kana LIKE '%" . $data['name_kana'] . "%'";
        }
    
        // 性別の選択
        if (!empty($data['gender']) && $data['gender'] !== 'all') {
            $sql .= " AND u.gender = '" . $data['gender'] . "'";
        }
    
        // 生年月日の範囲選択
        if (!empty($data['birthdateStart']) && !empty($data['birthdateEnd'])) {
            $dob_start = $data['birthdateStart'];
            $dob_end = $data['birthdateEnd'];
            $sql .= " AND u.birthday BETWEEN '$dob_start' AND '$dob_end'";
        }
                    
        // 所属会社の選択
        if (!empty($data['company_id'])) {
            if ($data['company_id'] === 'all') {
                // 「全て」が選択された場合は条件を追加しない
            } else {
                $company_id = $data['company_id'];
                $sql .= " AND u.company_id = '" . $company_id . "'";
            }
        }
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    


    //顧客データを取得して初期表示
    public function edit($customerId) {
        try {
            // 顧客IDをもとにデータベースから顧客の情報を取得
            $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = :customerId");//users テーブルから id 列が :customerId にバインドされた値と一致する行を取得
            $stmt->bindParam(':customerId', $customerId["id"]);
            $stmt->execute();//sql文をDBに送信して実行
            $customerData = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // 取得した顧客の情報を返す
            return $customerData;
        } catch (PDOException $e) {
            // エラーが発生した場合の処理
            $responseData['success'] = 1;
            $responseData['error'] = $e->getMessage();
            return $responseData;
        }
    }
        // 編集
        public function update($formData) {
            try {
                $stmt = $this->pdo->prepare("UPDATE users SET name = :name, name_kana = :name_kana, phone = :phone, email = :email, company_id = :company_id, birthday = :birthday, gender = :gender WHERE id = :id");//各カラム名と値をセット、whereでどのＩＤか
                $stmt->bindParam(':id', $formData['id']);
                $stmt->bindParam(':name', $formData['name']);
                $stmt->bindParam(':name_kana', $formData['name_kana']);
                $stmt->bindParam(':phone', $formData['phone']);
                $stmt->bindParam(':email', $formData['email']);
                $stmt->bindParam(':company_id', $formData['company_id']);
                $stmt->bindParam(':birthday', $formData['birthday']);
                $stmt->bindParam(':gender', $formData['gender']);
                $stmt->execute();
                $responseData['success'] = 0;
                return $responseData;

            } catch (PDOException $e) {
                $responseData['success'] = 1;
                $responseData['error'] = $e->getMessage();
                return $responseData;
            }
        }
    
        //削除の処理
        public function delete($customerId) {
            try {
                $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = :id");//指定された条件に一致する行をテーブルから削除
                $stmt->bindParam(':id', $customerId["id"]);
                $stmt->execute();
    
                $responseData['success'] = 0;
                return $responseData;
            } catch (PDOException $e) {
                $responseData['success'] = 1;
                $responseData['error'] = $e->getMessage();
                return $responseData;
            }
        }
    
}
