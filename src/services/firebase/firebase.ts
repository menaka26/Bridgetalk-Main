// Firebase initialization and core services
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { FIREBASE_CONFIG, FIRESTORE_COLLECTIONS } from '@constants/index';
import { logger } from '@utils/index';
import type { User } from '@types';

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

/**
 * Authentication Services
 */

export const registerUser = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName,
      createdAt: new Date(),
      updatedAt: new Date(),
      isOnline: true,
    };

    // Save user to Firestore
    await setDoc(doc(db, FIRESTORE_COLLECTIONS.USERS, firebaseUser.uid), user);

    logger.log('User registered successfully', { userId: firebaseUser.uid });
    return user;
  } catch (error) {
    logger.error('Registration failed', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    logger.log('User logged in successfully', { userId: userCredential.user.uid });
    return userCredential.user;
  } catch (error) {
    logger.error('Login failed', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    logger.log('User logged out successfully');
  } catch (error) {
    logger.error('Logout failed', error);
    throw error;
  }
};

export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * User Services
 */

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const docRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return {
        ...userData,
        createdAt: userData.createdAt?.toDate() || new Date(),
        updatedAt: userData.updatedAt?.toDate() || new Date(),
        lastSeen: userData.lastSeen?.toDate(),
      } as User;
    }

    return null;
  } catch (error) {
    logger.error(`Failed to fetch user: ${userId}`, error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<User>): Promise<void> => {
  try {
    const docRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
    logger.log('User profile updated', { userId });
  } catch (error) {
    logger.error('Failed to update user profile', error);
    throw error;
  }
};

export const updateUserOnlineStatus = async (userId: string, isOnline: boolean): Promise<void> => {
  try {
    const docRef = doc(db, FIRESTORE_COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      isOnline,
      lastSeen: isOnline ? null : new Date(),
    });
  } catch (error) {
    logger.error('Failed to update user online status', error);
  }
};

/**
 * Message Services
 */

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  text: string,
  additionalData?: any
): Promise<void> => {
  try {
    const messagesRef = collection(db, FIRESTORE_COLLECTIONS.MESSAGES);
    const timestamp = new Date();

    await setDoc(doc(messagesRef), {
      senderId,
      receiverId,
      text,
      timestamp,
      isRead: false,
      ...additionalData,
    });

    logger.log('Message sent', { senderId, receiverId });
  } catch (error) {
    logger.error('Failed to send message', error);
    throw error;
  }
};

export const subscribeToMessages = (
  userId: string,
  otherUserId: string,
  callback: (messages: any[]) => void
): (() => void) => {
  try {
    const messagesRef = collection(db, FIRESTORE_COLLECTIONS.MESSAGES);

    // Query for messages sent to the user or by the user
    const q = query(
      messagesRef,
      where('senderId', 'in', [userId, otherUserId]),
      where('receiverId', 'in', [userId, otherUserId])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
        }))
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      callback(messages);
    });

    return unsubscribe;
  } catch (error) {
    logger.error('Failed to subscribe to messages', error);
    throw error;
  }
};

/**
 * Chat Services
 */

export const createOrGetChat = async (
  userId1: string,
  userId2: string
): Promise<string> => {
  try {
    const chatsRef = collection(db, FIRESTORE_COLLECTIONS.CHATS);
    const q = query(
      chatsRef,
      where('participants', 'array-contains', userId1)
    );

    const snapshot = await getDocs(q);
    let chatId: string | null = null;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participants.includes(userId2)) {
        chatId = doc.id;
      }
    });

    if (chatId) {
      return chatId;
    }

    // Create new chat
    const newChat = {
      participants: [userId1, userId2],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(chatsRef), newChat);
    logger.log('Chat created', { participants: [userId1, userId2] });

    return userId1 + '-' + userId2;
  } catch (error) {
    logger.error('Failed to create or get chat', error);
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  onAuthStateChange,
  getUserById,
  updateUserProfile,
  updateUserOnlineStatus,
  sendMessage,
  subscribeToMessages,
  createOrGetChat,
};
