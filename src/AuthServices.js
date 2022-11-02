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

    console.log(info)
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