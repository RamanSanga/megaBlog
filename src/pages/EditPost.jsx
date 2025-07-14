import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/conf";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    navigate('/'); // If post not found
                }
                setLoading(false);
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="py-8">
                <Container>
                    <p className="text-center text-lg">Loading post...</p>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <h1 className="text-2xl font-semibold mb-6">Edit Post</h1>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
