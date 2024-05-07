<?php

require_once 'UserModel.php';
require_once 'CompanyModel.php';


// JSON 形式のフォームデータを受け取る
$inputJSON = file_get_contents('php://input');
$formData = json_decode($inputJSON, true);

// UserModel クラスのインスタンスを作成
$userModel = new UserModel($pdo);

// CompanyModel クラスのインスタンスを作成
$companyModel = new CompanyModel($pdo);

// ReflectionClass を使用して対応するモデルクラスの情報を取得
$reflectionClass = new ReflectionClass($formData["model"]); // model
$method = $reflectionClass->getMethod($formData["method"]); // method

// メソッドを呼び出し、結果を取得
if ($formData["model"] == "UserModel") {
    $result = $method->invoke($userModel, $formData['data']);
} elseif ($formData["model"] == "CompanyModel") {
    $result = $method->invoke($companyModel, $formData['data']);
} else {
    $result = "Invalid model specified.";
}

// JSON形式でレスポンスを返す
$response['body'] = $result;
echo json_encode($response);




