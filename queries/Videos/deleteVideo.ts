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

export async function deleteVideoByEmail(email: string) {
  const q = query(collection(db, "Videos"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    const userRef = doc(db, "Videos", document.id);
    await deleteDoc(userRef);
  });
}
