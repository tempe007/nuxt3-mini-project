interface Post {
    id: string;
    title: string;
    content: string;
}
export interface PostState {
    posts: NewPost[];
}
export interface NewPost {
    title: string;
    content: string;
}