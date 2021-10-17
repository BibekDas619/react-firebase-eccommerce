import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBpLdZuUCYN8ke132Mh1NWtCTl0ApGspCE",
  authDomain: "e-commerce-website-6b7e0.firebaseapp.com",
  projectId: "e-commerce-website-6b7e0",
  storageBucket: "e-commerce-website-6b7e0.appspot.com",
  messagingSenderId: "325449743465",
  appId: "1:325449743465:web:a2b4fb37542fc99d9276f8",
  measurementId: "G-ZB8Y5Y34JM"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch (error) {
      console.log(error.message)
    }

  }
  return userRef
}


/* export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef,obj)
  })


  return await batch.commit()
} */


export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  })

  return transformedCollection.reduce((ac, collection) => {
    ac[collection.title.toLowerCase()] = collection
    return ac
  }, {})
}

firebase.initializeApp(config)


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

//We are creating google sign up popup
export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)


export default firebase
