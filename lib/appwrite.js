import { Client, ID, Query } from "react-native-appwrite";
import { Account, Avatars, Databases } from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.indra.vidgram",
  projectId: "67d5b8ad0012491365c9",
  databaseId: "67d5ba13002b35cbf0d0",
  userCollectionId: "67d5ba46003bb0bf1128",
  videoCollectionId: "67d5ba6b001045af3a5f",
  storageId: "67d5bbea0011a78d3070",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async (email, password, username) => {
  try {
    console.log("Creating account...");
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log("Account created:", newAccount);
    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl = avatars.getInitials(username);
    console.log("Avatar URL:", avatarUrl);

    console.log("Signing in...");
    await signIn(email, password);
    console.log("Signed in successfully");

    console.log("Creating user document...");
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    console.log("User document created:", newUser);

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof AppwriteException) {
      console.error(
        "AppwriteException details:",
        error.message,
        error.code,
        error.response
      );
    }
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};
// Register User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    return currentUser.documents[0];
  } catch (error) {}
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
