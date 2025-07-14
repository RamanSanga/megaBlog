import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
                fileId: file ? file.$id : post.fileId, // Pass fileId for schema
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                data.fileId = fileId; // Pass fileId for schema
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
            type="submit"
            className="w-full"
            bgColor={post ? "bg-green-500" : "bg-blue-600"}
          >
            {post ? "Update Post" : "Publish Post"}
          </Button>
            </div>
        </form>
    );
}












// //chatgpt :- import React, { useCallback, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/conf";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.slug || "", // ✅ Use clean slug instead of $id
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string") {
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^\w\s-]/g, "")        // remove special chars
//                 .replace(/\s+/g, "-")            // replace spaces with -
//                 .replace(/--+/g, "-")            // merge multiple dashes
//                 .replace(/^-+|-+$/g, "");        // remove leading/trailing -
//         }
//         return "";
//     }, []);

//     useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 const newSlug = slugTransform(value.title);
//                 setValue("slug", newSlug, { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     const submit = async (data) => {
//         if (post) {
//             const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

//             if (file) {
//                 await appwriteService.deleteFile(post.featuredImage);
//             }

//             const updatedData = {
//                 ...data,
//                 ...(file && { featuredImage: file.$id }), // ✅ Don't pass undefined
//             };

//             const dbPost = await appwriteService.updatePost(post.$id, updatedData);

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             const file = await appwriteService.uploadFile(data.image[0]);

//             if (file) {
//                 const newPost = {
//                     ...data,
//                     featuredImage: file.$id,
//                     userId: userData?.$id,
//                 };

//                 const dbPost = await appwriteService.createPost(newPost);

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         const newSlug = slugTransform(e.currentTarget.value);
//                         setValue("slug", newSlug, { shouldValidate: true });
//                     }}
//                 />
//                 <RTE
//                     label="Content :"
//                     name="content"
//                     control={control}
//                     defaultValue={getValues("content")}
//                 />
//             </div>

//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />

//                 {post?.featuredImage && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}

//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />

//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }
