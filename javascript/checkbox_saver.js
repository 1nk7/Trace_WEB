//保存勾选状态
function save_CBstate() {
    var cb_data = document.querySelectorAll('input[type="checkbox"]');
    let cb_arrs = {};
    cb_data.forEach(checkbox => {
        cb_arrs[checkbox.name] = checkbox.checked ? 1 : 0;
    });

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/php/checkbox_handle.php', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify({
        action: 'save',
        states_data: cb_arrs
    }));
}

//读取勾选状态
window.onload = function(){
    // alert("hello");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/php/checkbox_handle.php', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const cb_states = JSON.parse(xhr.responseText);
            for(const [cbname, check_state] of Object.entries(cb_states)) {
                const checkbox_obj = document.querySelector(`input[name="${cbname}"]`);
                if(checkbox_obj) {
                    checkbox_obj.checked = check_state;
                }
            }
        }
    }
    xhr.send(JSON.stringify({
        action: 'get',
        states_data: 0,
    }));
}
