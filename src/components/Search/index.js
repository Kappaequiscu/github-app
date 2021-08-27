import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Input, Box, Button, Grid, Container, Text, Spinner } from 'theme-ui'
import Error from '../Error'
import Response from '../Response'

const Search = () => {

    const [userInput, setUserInput] = useState('')
    const [repoInput, setRepoInput] = useState('')
    const [data, setData] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSearchUser = (e) => {
        setUserInput(e.target.value)
    }

    const handleSearchRepo = (e) => {
        setRepoInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if(!userInput.trim()){
            setError("You need to fill username!")
            setData('')
            setLoading(false)
        } else {
            fetch(`https://api.github.com/search/repositories?q=${repoInput}+user:${userInput}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(`${data.errors[0].code} - ${data.errors[0].message}`)
                    setData('')
                    setLoading(false)
                } else {
                    setError('')
                    setData(data.items)
                    setLoading(false)
                }
            })
        }
    }

    return (
        <>
            <Container pl={4} pt={4} pr={4}>
                <form onSubmit={handleSubmit}>
                    <Grid columns={3}>
                        <Box>
                            <Input placeholder="Introduce username" name="search-user" id="search-user" onChange={handleSearchUser} />
                        </Box>
                        <Box>
                            <Input placeholder="Introduce repository name" name="search-repo" id="search-repo" onChange={handleSearchRepo} />
                        </Box>
                        <Box>
                            <Button>Search</Button>
                        </Box>
                    </Grid>
                </form>
                <>
                    {
                        error ? (
                            <Error error={error}/>
                        ) : (
                            <Text/>
                        )
                    }
                </>
            </Container>
            <Container p={4}>
                <>
                    {
                        loading ? (
                            <Box sx={{textAlign: "center"}}>
                                <Spinner/>
                            </Box>
                        ) : (
                            <Grid columns={2}>
                                {
                                    Object.values(data).map(items => (
                                        <Link key={items.id} to={{pathname: `/repos/${items.id}`, state: {name: items.full_name}}}>
                                            <Box sx={{textAlign: "center", border: "1px solid grey", borderRadius: "5px"}}>
                                                <Response name={items.owner.login} repo={items.full_name} avatar={items.owner.avatar_url} />
                                            </Box>
                                        </Link>
                                    ))
                                }
                            </Grid>
                        )
                    }
                </>
            </Container>
        </>
    )
}

export default withRouter(Search)
