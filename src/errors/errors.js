export function notFoundError(entity) {
    return {
        type: 'not_found',
        message: `${entity} not found`
    }
}

export function gameNotAvailableError() { 
    return {
        type: 'unprocessable_entity',
        message: 'game not available'
    }
}

export function invalidUrlError() {
    return {
        type: 'bad_request',
        message: 'invalid url'
    }
}

export function rentalAlreadyEndedError() {
    return {
        type: 'unprocessable_entity',
        message: 'rental already ended'
    }
}

export function rentalStillOngoingError() {
    return {
        type: 'bad_request',
        message: 'rent still ongoing'
    }
}

export function cpfAlreadyInUseError() {
    return {
        type: 'conflict',
        message: 'this cpf is already in use'
    }
}

export function gameAlreadyExistsError() {
    return {
        type: 'conflict',
        message: 'this game already exists'
    }
}



