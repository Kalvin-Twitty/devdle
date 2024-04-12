// Import necessary modules
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') // Firebase private key needs to be parsed correctly
  }),
});

const db = admin.firestore();

// GitHub repository information
const owner = 'Kalvin-Twitty';
const repo = 'devdle';
const githubToken = process.env.GITHUB_TOKEN;

// Function to fetch commits from GitHub API
async function fetchCommits() {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  const data = await response.json();
  return data.map(commit => ({
    sha: commit.sha,
    message: commit.commit.message,
    author: commit.commit.author.name,
    timestamp: commit.commit.author.date,
  }));
}

// Function to import commits into Firestore
async function importCommits(commits) {
  const batch = db.batch();
  const collectionRef = db.collection('commits');

  commits.forEach(commit => {
    const docRef = collectionRef.doc(commit.sha);
    batch.set(docRef, commit);
  });

  await batch.commit();
  console.log('Commits imported successfully!');
}

// Main function to fetch commits and import into Firestore
async function main() {
  try {
    const commits = await fetchCommits();
    await importCommits(commits);
  } catch (error) {
    console.error('Error fetching or importing commits:', error);
  }
}

main();