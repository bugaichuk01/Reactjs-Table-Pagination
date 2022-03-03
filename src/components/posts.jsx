import React, {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

const pageSize = 10;
const Posts = () => {
    const [posts, setPosts] = useState();
    const [paginated, setPaginated] = useState();
    const [current, setCurrent] = useState(1);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((result) => {
                console.log(result.data);
                setPosts(result.data);
                setPaginated(_(result.data).slice(0).take(pageSize).value())
            })
            .catch((error) => {
                console.log(error);
            })
    },[]);

    const pageCount = posts? Math.ceil(posts.length/pageSize) : 0;
    if (pageCount === 1) return null;
    // npm i lodash
    const pages = _.range(1, pageCount + 1)
    const pagination = (page) => {
        setCurrent(page);
        const startIndex = (page - 1) * pageSize;
        const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
        setPaginated(paginatedPost);
    }
    return (
        <div className='container'>{
            !paginated ? ('No data found') : (
                <table className='table table-bordered'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paginated.map((post, index) => (
                            <tr key={index}>
                                <td>{post.id}</td>
                                <td>{post.userId}</td>
                                <td>{post.title}</td>
                                <td>
                                    <p
                                        className={
                                        post.completed ? 'btn btn-success' : 'btn btn-danger'
                                        }>
                                        {post.completed ? 'Completed' : 'Pending'}
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            )
        }
        <nav className='d-flex justify-content-center'>
            <ul className='pagination'>
                {
                    pages.map((page) => <li className={page === current ? 'page-item active' : 'page-item'}>
                        <p onClick={() => pagination(page)} className='page-link'>{page}</p></li>)
                }
            </ul>
        </nav>
        </div>
    );
};

export default Posts;