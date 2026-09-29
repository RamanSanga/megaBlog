import config from "../config/config";
import { Client, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId, fileId }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                    fileId
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error ", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId, fileId }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    fileId
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
            );
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries,
            );
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error ", error);
            return { documents: [] };
        }
    }

    async uploadFile(file) {
        const { cloudinaryCloudName, cloudinaryUploadPreset } = config;

        if (!cloudinaryCloudName || cloudinaryCloudName === "undefined" ||
            !cloudinaryUploadPreset || cloudinaryUploadPreset === "undefined") {
            throw new Error(
                "Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env."
            );
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", cloudinaryUploadPreset);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
                { method: "POST", body: formData }
            );
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error?.message || "Cloudinary upload failed");
            }

            // Keep the current database fields unchanged: they now store the image URL.
            return { $id: result.secure_url, publicId: result.public_id };
        } catch (error) {
            console.error("Cloudinary :: uploadFile :: error ", error);
            throw error;
        }
    }

    async deleteFile(fileID) {
        // Cloudinary deletion requires an API secret and must happen in a trusted backend.
        // Do not expose that secret in this Vite client.
        if (fileID?.startsWith("http")) {
            return true;
        }

        try {
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileID
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error ", error);
            return false;
        }
    }

    getFilePreview(fileID) {
        if (!fileID) {
            return null;
        }

        // Newly uploaded images are Cloudinary secure URLs. Keep the fallback so
        // images already stored in Appwrite continue to render.
        if (fileID.startsWith("http")) {
            return fileID;
        }

        try {
            return this.bucket.getFilePreview(
                config.appWriteBucketId,
                fileID
            );
        } catch (error) {
            console.error("Appwrite Service :: getFilePreview :: error ", error);
            return null;
        }
    }
}

const service = new Service();

export default service;
