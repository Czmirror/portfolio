import { db } from './firebase.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    const newsContainer = document.getElementById("news-articles");
    const newsRef = collection(db, "news");
    const q = query(newsRef, orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const article = doc.data();
        const articleElement = document.createElement("div");
        articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.content}</p>
      <small>${article.created_at.toDate()}</small>
    `;
        newsContainer.appendChild(articleElement);
    });
});
