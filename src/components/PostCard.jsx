import React from 'react'
import appwriteService from "../appwrite/conf"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        
        <Link to={`/post/${$id}`} className="group">
            <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
                <div className="aspect-video overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    console.log(appwriteService.getFilePreview(featuredImage));
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
