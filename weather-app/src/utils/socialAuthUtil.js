// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuEmz5gxvY9mGJPIE_1CqcKIZkmA9ud4o",
  authDomain: "weather-social-login.firebaseapp.com",
  projectId: "weather-social-login",
  storageBucket: "weather-social-login.appspot.com",
  messagingSenderId: "408631273356",
  appId: "1:408631273356:web:85fb95560548e0413098a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

//팝업창 로그인 함수 

const signInWithGoogle = () =>{
  return signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(result);

    localStorage.setItem("access_token", token)
    window.alert("회원가입에 성공하였습니다.");
    
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(error);
    window.alert("소셜로그인에 실패. 일반로그인을 해주세요")
  });
}; 

export { signInWithGoogle}