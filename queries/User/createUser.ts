import { collection, addDoc, getFirestore } from "firebase/firestore";
const db = getFirestore();

export async function addUser(
  email: string | null,
  name: string | null,
  blackListed: boolean,
  isAdmin: boolean
) {
  if (email != null) {
    try {
      const docRef = await addDoc(collection(db, "Users", email), {
        name: name,
        blackListed: blackListed,
        isAdmin: isAdmin,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
