import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
const db = getFirestore();

export async function updateUserByEmail(email: string, name: string) {
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    const userRef = doc(db, "Users", document.id);
    await updateDoc(userRef, { name: name });
  });
}

// Use the function
updateUserByEmail("example@example.com", "New Name");
