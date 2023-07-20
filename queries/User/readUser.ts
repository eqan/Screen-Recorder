import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore();

export async function getUserByEmail(email: string) {
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}
