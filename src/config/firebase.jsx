
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


export default function startFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyAFko7loQl4rfXCGuyO_G_OYjq04V0j2jc",
        authDomain: "joined-africa-notification.firebaseapp.com",
        databaseURL: "https://joined-africa-notification-default-rtdb.firebaseio.com",
        projectId: "joined-africa-notification",
        storageBucket: "joined-africa-notification.appspot.com",
        messagingSenderId: "69345522595",
        appId: "1:69345522595:web:1c58a3d41596a6fce9a016",
        measurementId: "G-TS86FMB5V9"
      };
      // Initialize Firebase
const app = initializeApp(firebaseConfig);
return getDatabase(app);

}
