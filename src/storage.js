const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "apiKey", // TODO
    authDomain: "authDomain", // TODO
    projectId: "projectId", // TODO
    storageBucket: "storageBucket", // TODO
    messagingSenderId: "messagingSenderId", // TODO
    appId: "appId" // TODO
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const hasNotified = async (houseId) => {
    const houseRef = doc(db, "houses", houseId);
    const houseSnap = await getDoc(houseRef);

    return houseSnap.exists();
}

const markNotified = async (house) => {
    const houseRef = doc(db, "houses", house.id)
    await setDoc(houseRef, house);
}

module.exports = { hasNotified, markNotified };