<?php
require_once 'db.php';  // DB クラスを含むファイルを読み込む


class CompanyModel {
    protected $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function search($data) {
        $sql = "SELECT id, name FROM companies";
        $stmt = $this->pdo->query($sql);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result; // 配列で結果を返す
    }
    
    } 
