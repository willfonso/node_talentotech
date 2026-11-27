import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const COLLECTION_NAME = 'products';
const productsCollection = collection(db, COLLECTION_NAME);

export const ProductModel = {
  async getAll() {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async getById(id) {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    return { id: docSnap.id, ...docSnap.data() };
  },

  async create(productData) {
    const docRef = await addDoc(productsCollection, {
      ...productData,
      createdAt: new Date().toISOString()
    });
    return { id: docRef.id, ...productData };
  },

  async delete(id) {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    await deleteDoc(docRef);
    return { id };
  }
};
