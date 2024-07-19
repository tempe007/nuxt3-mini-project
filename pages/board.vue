<template>
  <div class="board">
    <h1>Board</h1>
    <!-- 게시글 목록 표시 -->
    <div v-for="post in posts" :key="post.id" class="post card">
      <div class="post-header">
        <h2>{{ post.title }}</h2>
        <p class="date">{{ post.date }}</p>
        <button @click="deletePost(post.id)" class="delete-btn">🗑️</button>
      </div>
      <p>{{ post.content }}</p>
    </div>
    <!-- 게시글 작성 폼 -->
    <div class="new-post card">
      <h2>New Post</h2>
      <input v-model="newPostTitle" placeholder="Title" />
      <textarea v-model="newPostContent" placeholder="Content"></textarea>
      <button @click="addPost">Add Post</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/plugins/firebase';

// Post 인터페이스 정의
interface Post {
  id: string;
  title: string;
  content: string;
  date: string; // 날짜 필드 추가
}

// posts 배열에 Post 타입 지정
const posts = ref<Post[]>([]);
const newPostTitle = ref('');
const newPostContent = ref('');

const fetchPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  posts.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Post));
};

const addPost = async () => {
  if (newPostTitle.value.trim() && newPostContent.value.trim()) {
    const newPost: Omit<Post, 'id'> = {
      title: newPostTitle.value,
      content: newPostContent.value,
      date: new Date().toLocaleString() // 현재 날짜와 시간 추가
    };
    await addDoc(collection(db, 'posts'), newPost);
    newPostTitle.value = '';
    newPostContent.value = '';
    fetchPosts(); // 새로운 게시글 추가 후 게시글 목록 갱신
  }
};

const deletePost = async (id: string) => {
  await deleteDoc(doc(db, 'posts', id));
  fetchPosts(); // 게시글 삭제 후 게시글 목록 갱신
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.board {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.post {
  border-left: 5px solid #007bff;
}

.new-post {
  border-left: 5px solid #28a745;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
}

.date {
  font-size: 0.9em;
  color: #888;
  margin: 0 10px 0 0;
}

input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  color: #ff4d4d;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0;
  margin-left: 10px;
  width: 100px;
}

.delete-btn:hover {
  color: #e60000;
}
</style>
