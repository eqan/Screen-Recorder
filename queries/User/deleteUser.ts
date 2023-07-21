import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const db = getFirestore();

export async function deleteUserByEmail(email: string) {
  const userRef = doc(db, "Users", email);
  await deleteDoc(userRef);
}
