import { updateDoc, doc, getFirestore } from "firebase/firestore";
const db = getFirestore();

export async function updateUserByEmail(email: string, name: string) {
  const userRef = doc(db, "Users", email);
  await updateDoc(userRef, { name: name });
}
