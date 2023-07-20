import { collection, addDoc, getFirestore } from "firebase/firestore";
const db = getFirestore();

export async function addVideo(email: string | null, url: string | null) {
  if (email != null) {
    try {
      const docRef = await addDoc(collection(db, "Videos"), {
        email: email,
        url: url,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
