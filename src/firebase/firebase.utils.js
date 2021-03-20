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

  export const createUserProfileDocument = async(userAuth,additionalData) => {
    if(!userAuth)
    {
      return
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
    if(!snapshot.exists)
    {
      const { displayName,email } = userAuth
      const createdAt = new Date()

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch(error)
      {
       console.log(error.message)
      }
    }
    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)
  export default firebase