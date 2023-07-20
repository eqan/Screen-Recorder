import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore();

export async function deleteUserByEmail(email: string) {
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    const userRef = doc(db, "Users", document.id);
    await deleteDoc(userRef);
  });
}
