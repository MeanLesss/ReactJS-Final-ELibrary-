//all services
export const GetLogin = async (info) => {
    // console.log(info.name.current.value);
    // console.log(info.api_token);
    var formdata = new FormData();
    formdata.append("api_token", info.api_token);
    formdata.append("username", info.name.current.value);
    formdata.append("password", info.pass.current.value);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    var res = await fetch(process.env.REACT_APP_API_LOGIN, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    // console.log(res);
    if (res.user != null && res.user.role === 'Student') {
        res = { token: '', error: 'Invalid username or password!', user: null, status: 'FAILED' }
    }

    return res;
}
export const GetSummary = async (info) => {
    var formdata = new FormData();
    formdata.append("api_token", info.api_token);
    formdata.append("user_token", info.user_token);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const res = await fetch(process.env.REACT_APP_API_SUMMARY, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    // console.log(res);
    return res;

}

export const GetGroupList = async (info) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var res = await fetch("http://172.104.166.110/FT_SD_M_11/api/groups.php?api_token=" + process.env.REACT_APP_API_TOKEN + "&user_token=" + info, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    // console.log(res);
    if (res.length <= 0) {
        res = [{ id: 0, name: 'Not Found' }]
    }
    return res;
}
export const GetStudents = async (info) => {
    // console.log(info)
    var formdata = new FormData();
    formdata.append("api_token", process.env.REACT_APP_API_TOKEN);
    formdata.append("group_id", info.group_id);
    formdata.append("user_token", info.user_token);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    var res = await fetch(process.env.REACT_APP_API_STUDENTS, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    // console.log(res);
    return res;
}
export const GetSearchGroup = () => {

}
export const GetSearchStudent = () => {

}

export const GetBooks = async (info) => {
    var formdata = new FormData();
    formdata.append("api_token", process.env.REACT_APP_API_TOKEN);
    formdata.append("user_token", info.token);
    formdata.append("group_id", info.group_id);
    formdata.append("search", info.search);
    formdata.append("sort_order", info.sort);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    var res = await fetch(process.env.REACT_APP_API_BOOKS, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    // console.log(res);
    return res;
}
//the download book link
// {'http://172.104.166.110/FT_SD_M_11'+book.path+'?api_token='+process.env.REACT_APP_API_TOKEN+
//                             '&user_token='+user.token}

export const GetProfile = async (info) => {
    var formdata = new FormData();
    formdata.append("api_token", "api_634f58d8b0ff2");
    formdata.append("user_token", "tea_636724a82060f");

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    var res = await fetch("http://172.104.166.110/FT_SD_M_11/api/profile.php", requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));

    return res;
}

export const GetUsers = async (info) => {
    var formdata = new FormData();
    formdata.append("api_token", process.env.REACT_APP_API_TOKEN);
    formdata.append("user_token", info.token);
    if(info.search != null){
        formdata.append("search", info.search);
    }
    if(info.group_id != null){
        formdata.append("group_id", info.group_id);
    }
    if(info.role != null){
        formdata.append("role", info.role);
    }
    if(info.role != null){
        formdata.append("sort_order", info.sort_order);
    }

    var requestOptions = {
        signal: info.control,
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    var res = await fetch(process.env.REACT_APP_API_USERS, requestOptions)
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log('error', error));
    // console.log(res)
    return res;
}
export const AddUpdateUser = async (info) => {

console.log(info)

    var formdata = new FormData();
    formdata.append("api_token",process.env.REACT_APP_API_TOKEN);
    formdata.append("user_token", info.user_token);
    if(info.id != null){
        formdata.append("user_id", info.id);
    }
    if(info.username != null){
        formdata.append("username", info.username);
    }
    if(info.pwd != null){
        formdata.append("pwd", info.pwd);
    }
    if(info.old_pwd != null){
        formdata.append("old_pwd", info.old_pwd);
    }
    if(info.confirm_pwd != null){
        formdata.append("confirm_pwd",info.confirm_pwd)
    }
    if(info.group_id != null){
        formdata.append("group_id", info.group_id);
    }
    formdata.append("role", info.role);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    var res = await fetch(process.env.REACT_APP_API_ADD_UP_USER, requestOptions)
        .then(response => response.json())
        .then(result => {return result})
        .catch(error => console.log('error', error));
        console.log(res);
    return res;
}