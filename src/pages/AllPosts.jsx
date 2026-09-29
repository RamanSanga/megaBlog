import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/conf";
import featuredImage from '../components/Images/posts.png';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((result) => {
            if (result) {
                console.log("Fetched Posts:", result.documents); // Debug fetched posts
                setPosts(result.documents);
            }
            setLoading(false);
        });
    }, []);

    const firstSixPosts = posts;

    return (
        <div className="w-full py-12 bg-white min-h-screen">
            <Container>
                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">Explore Life’s Moments 📸</h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        Discover stories from food, travel, lifestyle & more 🍜✈️📝
                    </p>
                </div>

                {/* Fixed Featured Image */}
                <div className="mb-16">
                    <img
                        src={featuredImage}
                        alt="Featured Story"
                        className="w-full h-auto rounded-xl shadow-md object-cover"
                    />
                    <p className="text-gray-600 text-center mt-4 text-sm italic">
                        From our travels to your screen — here’s what inspires us ✨
                    </p>
                </div>

                {/* Posts Section */}
                {loading ? (
                    <div className="text-center text-xl font-semibold text-gray-600">Loading posts...</div>
                ) : firstSixPosts.length === 0 ? (
                    <div className="text-center text-xl text-gray-500">No posts found.</div>
                ) : (
                    <div className="flex flex-wrap -mx-4">
                        {firstSixPosts.map((post) => (
                            <div key={post.$id} className="p-4 w-full md:w-1/2">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;