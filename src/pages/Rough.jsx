import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from '../components'
import { Query } from 'appwrite'  // ✅ IMPORTANT: import Query

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // ✅ Only fetch posts with status = "active"
        appwriteService.getPosts([Query.equal("status", "active")]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container className="bg-gray-100 py-10 rounded-lg">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-700">
                                No posts available yet.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container className="bg-gray-100 py-10 rounded-lg">
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
