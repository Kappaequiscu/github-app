import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Grid, Spinner} from 'theme-ui'
import Requests from '../Requests'
import Pagination from '../Pagination'
import Issues from '../Issues'

const Repos = () => {
    
    const location = useLocation()
    const reposId = location.state

    const [loading, setLoading] = useState(true)
    const [issues, setIssues] = useState('')
    const [pulls, setPulls] = useState('')
    const [currentIssue, setCurrentIssue] = useState(1)
    const [currentPull, setCurrentPull] = useState(1)
    const [postsPerIssue] = useState(10)
    const [postsPerPull] = useState(10)

    useEffect(() => {
        Promise.all([
            fetch(`https://api.github.com/repos/${reposId.name}/issues`).then(res => res.json()),
            fetch(`https://api.github.com/repos/${reposId.name}/pulls`).then(res => res.json())
        ]).then(([issue, pull]) => {
            setIssues(issue)
            setPulls(pull)
            setLoading(false)
        })
    }, [reposId])

    const indexOfLastIssue = currentIssue * postsPerIssue
    const indexOfFirstIssue = indexOfLastIssue - postsPerIssue
    const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue)

    const indexOfLastPull = currentPull * postsPerPull
    const indexOfFirstPull = indexOfLastPull - postsPerPull
    const currentPulls = pulls.slice(indexOfFirstPull, indexOfLastPull)

    const paginateIssues = (pageNumber) => setCurrentIssue(pageNumber)
    const paginatePulls = (pageNumber) => setCurrentPull(pageNumber)

    return (
        <div>
            {
                loading ? (
                    <Box sx={{textAlign: "center"}}>
                        <Spinner/>
                    </Box>
                ) : (
                    <>
                        <Grid columns={2} p={2}>
                            <Box>
                                <h2 className='mt-2'>Issues</h2>
                                <Issues posts={currentIssues} />
                                <Pagination postsPerPage={postsPerIssue} totalPosts={issues.length} paginate={paginateIssues} />
                            </Box>
                            <Box>
                                <h2 className='mt-2'>Pull Requests</h2>
                                <Requests posts={currentPulls}/>
                                <Pagination postsPerPage={postsPerPull} totalPosts={pulls.length} paginate={paginatePulls} />
                            </Box>
                        </Grid>
                    </>
                )
            }
        </div>
    )
}

export default Repos
