import React from 'react'
import moment from 'moment'
import { OverlayTrigger, Popover} from 'react-bootstrap'

const Issues = ({ posts }) => {

    return (
        <ul className='list-group mb-2 ml-2'>
            {
                posts.map(post => (
                    <>
                        <li key={post.id} className='list-group-item'>
                            <OverlayTrigger
                                key={post.number}
                                delay={{ show: 100, hide: 100 }}
                                placement={"bottom"}
                                overlay={
                                    <Popover id='popover-positioned-bottom'>
                                        <Popover.Header as="h3"><strong>{post.title}</strong></Popover.Header>
                                        <Popover.Body>
                                            <ul className='list-group'>
                                                <li className='list-group-item'>Creator: {post.user.login}</li>
                                                <li className='list-group-item'>Comments: {post.comments}</li>
                                                <li className='list-group-item'>State: {post.state}</li>
                                                {
                                                    Object.values(post.labels).map(label => (
                                                        <li className='list-group-item'>{label.name}</li>
                                                    ))
                                                }
                                            </ul>
                                        </Popover.Body>
                                    </Popover>
                                }
                            >
                                <span>
                                    <strong>{post.title}</strong> - {moment(post.created_at).format("DD/MM/YYYY HH:mm")}
                                </span>
                            </OverlayTrigger>
                        </li>
                        
                    </>
                ))
            }
        </ul>
    )
}

export default Issues