export const decodeLaravelErrors = (responseError: any) => {
    let errors = [];
    
    if (!!responseError.error.errors) {
        for (let errorKey in responseError.error.errors) {
            responseError.error.errors[errorKey].forEach(error => {
                errors.push(error)
            })
        }
    }

    return {
        message: responseError.error.message,
        errors
    };
}