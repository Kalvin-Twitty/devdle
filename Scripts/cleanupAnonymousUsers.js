import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const deleteAnonymousUsers = async () => {
  let nextPageToken;
  do {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    nextPageToken = listUsersResult.pageToken;

    const uidsToDelete = listUsersResult.users
      .filter(user => user.providerData.length === 0) // Filter anonymous users
      .map(user => user.uid);

    if (uidsToDelete.length > 0) {
      await Promise.all(uidsToDelete.map(uid => admin.auth().deleteUser(uid)));
      console.log(`Deleted ${uidsToDelete.length} anonymous users`);
    }
  } while (nextPageToken);
};

deleteAnonymousUsers().catch(console.error);
