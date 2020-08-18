export function PostData(type, userData){
    let BaseUrl = 'http://localhost:3002/';

    return new Promise((resolve, reject ) => {
        fetch(BaseUrl+type,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            response.json()
        })
        .then(responseJson => {
            console.log(responseJson);
            resolve(responseJson)
        })
        .catch(error => {
            reject(error)
        });
    });
}