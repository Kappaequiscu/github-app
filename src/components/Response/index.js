import React from 'react'
import { theme } from '../../constants/theme'
import { Image, Heading } from 'theme-ui'

const Response = ({ name, repo, avatar}) => {
    return (
        <>
            <Image src={avatar} width={theme.images.repos.width} mt={2} sx={{border: "1px solid grey", borderRadius: "5px"}} />
            <Heading>{name}</Heading>
            <Heading as='h3' mb={2}>{repo}</Heading>            
        </>
    )
}

export default Response