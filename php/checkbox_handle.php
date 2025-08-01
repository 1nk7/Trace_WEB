<?php

function CBsaveState($state_data) {
    file_put_contents('../save_datas/checkbox_state.json', json_encode($state_data));
    echo "状态已保存";
    flush(); // 确保输出
}

function CBgetState() {
    $filepath = '../save_datas/checkbox_state.json';
    if (file_exists($filepath)){
        $state_datas = json_decode(file_get_contents($filepath));
        echo json_encode($state_datas);
    } else {
        // echo "读取失败！\n状态文件好像没了..??"
        echo json_encode('{"cb1":0,"cb2":0,"cb3":0}');
    }
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['action']) && $data['action'] === 'save') {
        CBsaveState($data['states_data']);
    } 
    elseif (isset($data['action']) && $data['action'] === 'get') {
        CBgetState();
    }

} 

?>

