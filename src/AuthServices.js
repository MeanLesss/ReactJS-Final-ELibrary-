//all services
export const GetLogin = (info) => {
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

    var res = fetch(process.env.REACT_APP_API_LOGIN, requestOptions)
        .then(response => response.json())
        // .then(result => console.log(result))
        .then(result => {return result})
        .catch(error => console.log('error', error));
        
    return res;
}
