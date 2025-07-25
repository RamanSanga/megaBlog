import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((result) => {
                if (result) {
                    setPost(result);
                } else {
                    navigate("/");
                }
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        const status = await appwriteService.deletePost(post.$id);
        if (status) {
            await appwriteService.deleteFile(post.featuredImage);
            navigate("/");
        }
    };

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
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white shadow">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl max-h-[500px] object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                </div>
                <div className="browser-css text-gray-700 leading-relaxed">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}
