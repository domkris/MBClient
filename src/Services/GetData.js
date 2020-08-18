export function GetData(type, userData){
    let BaseUrl = 'http://localhost:3001/';

    return new Promise((resolve, reject ) => {
        fetch(BaseUrl+type,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(responseJson => resolve(responseJson))
        .catch(error => reject(error));
    });
}