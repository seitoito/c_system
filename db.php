<?php
class DB {
    public $host = 'localhost';    // ホスト名
    public $dbname = 'client_db';  // データベース名
    public $username = 'root';     // ユーザー名

    public $pdo;  // PDO インスタンスを保持するプロパティ

    public function __construct() {
        try {
            // PDO インスタンスの作成とプロパティへの割り当て
            $this->pdo = new PDO("mysql:host={$this->host};dbname={$this->dbname}", $this->username);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // 接続成功のメッセージを出力（開発時のみ推奨）
        } catch (PDOException $e) {
            // データベース接続エラーが発生した場合の処理
            echo "データベース接続エラー: " . $e->getMessage();
        }
    }

    public function getPDO() {
        return $this->pdo;  // PDO オブジェクトのゲッターメソッド
    }
}

// DBクラスのインスタンスを作成
$db = new DB();

// PDOオブジェクトを取得
$pdo = $db->getPDO();

// データベースへの接続が成功したことをコンソールに表示
// echo "接続できました";

$conditions = [];
$params = [];
