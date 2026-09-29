# MegaBlog — Viva Notes

## Project in one line

MegaBlog is a full-stack-style React blog application where users can sign up, log in, create, edit, read, and delete blog posts with featured images.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React + Vite | Frontend UI and fast development build tool |
| React Router | Client-side page navigation |
| Redux Toolkit | Stores logged-in user/authentication state globally |
| React Hook Form | Handles and validates post form inputs |
| Tailwind CSS | Responsive styling and layout |
| TinyMCE | Rich-text editor for post content |
| Appwrite | Backend service for authentication and blog-post database |
| Cloudinary | Stores and delivers featured images |

## Main workflow

1. A user creates an account or logs in through Appwrite Authentication.
2. User data is saved in the Redux store, so protected pages know who is logged in.
3. The user creates a post using title, slug, content, status, and image.
4. The image is uploaded directly to Cloudinary using an unsigned upload preset.
5. Cloudinary returns a secure image URL.
6. The app saves the post data and that image URL in an Appwrite database document.
7. The All Posts page fetches documents from Appwrite and renders them as post cards.
8. Only the post author can edit or delete their own post.

## Important implementation details

- **Slug:** generated from the title and used as the post/document ID.
- **Rich text:** TinyMCE returns HTML content, which is rendered on the post page.
- **Image storage:** new images are Cloudinary URLs; Appwrite remains the database and authentication provider.
- **Environment variables:** Appwrite IDs, Cloudinary cloud name, and upload preset are stored in `.env` using `VITE_` prefixes for Vite.
- **Cloudinary security:** the frontend uses only the public cloud name and unsigned preset. The Cloudinary API secret is never exposed in React.

## Folder overview

- `src/pages` — application pages such as Home, All Posts, Add Post, Edit Post, and Post.
- `src/components` — reusable UI pieces, including the post form and editor.
- `src/appwrite` — Appwrite authentication and database service methods.
- `src/store` — Redux store and authentication slice.
- `src/config` — reads environment configuration.

## Likely viva questions

**Why use Redux Toolkit?**  
To keep login/user data available across pages without passing props through many components.

**Why use Appwrite and Cloudinary together?**  
Appwrite handles authentication and structured post data. Cloudinary is specialized for reliable image upload, storage, and delivery.

**Why not put the Cloudinary API secret in `.env` on the frontend?**  
Vite exposes `VITE_` variables to the browser. A secret there would be visible to every user. Image deletion should instead use a secure backend.

**What is protected routing?**  
It prevents unauthenticated users from opening pages such as creating or editing posts.

**What happens when a post is created?**  
The image uploads to Cloudinary first; its returned URL is then stored with the post document in Appwrite.

**How is author access controlled?**  
The post stores `userId`; the UI compares it with the logged-in user ID before showing Edit and Delete actions.
