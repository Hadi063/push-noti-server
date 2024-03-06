
const admin = require("firebase-admin")

function formatPrivateKey(key) {
    let x = key.replace(/\\n/g, "\n")
    return x;
}

export async function initAdmin() {
    const params = {
        projectId: process.env.FIREBASE_PROJECT_ID ,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
    };

    createFirebaseAdminApp(params)
}
export function createFirebaseAdminApp(params) {
    const privateKey = formatPrivateKey(params.privateKey);
    if (admin.apps.length > 0) {
      return admin.app();
    }
   
    const cert = admin.credential.cert({
      projectId: params.projectId,
      clientEmail: params.clientEmail,
      privateKey,
    });
   
    return admin.initializeApp({
      credential: cert,
      projectId: params.projectId,
    });
  }
