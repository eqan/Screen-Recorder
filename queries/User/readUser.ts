import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

export async function getUserByEmail(email: string) {
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}
