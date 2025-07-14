import config from "../config/config";
import { Client , Databases , Storage, Query, ID } from "appwrite";
import { Permission, Role } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appWriteProjectId)
        
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
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
    console.log("Appwrite Service :: getCurrentUser ::error ", error);
  }
}


    async updatePost(slug , {title , content , featuredImage , status , userId}){
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
                    userId
                }
            )
            
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser ::error ", error)  
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
    
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                )
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser ::error ", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser ::error ", error)
        }
    }

    //file Upload service

    async uploadFile(file) {
    try {
        return await this.bucket.createFile(
            config.appWriteBucketId,
            ID.unique(),
            file,
            [
                Permission.read(Role.any())  // ✅ Public Read Access
            ]
        );
    } catch (error) {
        console.log("uploadFile error", error);
    }
}

    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileID
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser ::error ", error)
            return false;
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            config.appWriteBucketId,
            fileID
        )
    }
}



const service = new Service();

export default service;