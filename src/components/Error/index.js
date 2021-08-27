import React from 'react'
import { Alert, Close } from 'theme-ui'

const Error = ({ error }) => {
    return (
        <Alert mt={2} mb={2}>
            {error}
        </Alert>
    )
}

export default Error
