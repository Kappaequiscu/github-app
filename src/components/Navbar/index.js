import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Container, Image } from 'theme-ui'

const Navbar = ({image}) => {
    return (
        <Container p={3} bg="muted">
            <Link to={"/"}>
                <Image src={image.src} width={image.width} />GitHub App
            </Link>
        </Container>
    )
}

export default withRouter(Navbar)
