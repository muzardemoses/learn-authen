import { auth, createUserProfileDocument, database, onAuthStateChanged, ref } from './config';
import { useEffect, useState } from 'react';
import { UserContext } from './user-context';
import { getDoc } from 'firebase/firestore';
import { update } from 'firebase/database';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //set the user
        const userRef = await createUserProfileDocument(user, user.photoURL);
        const userSnapshot = await getDoc(userRef);
        console.log("snapshot", userSnapshot.data());
        const imgSrc = user.imgSrc || user.photoURL;

        const { displayName, email, createdAt } = userSnapshot.data();
        console.log(displayName, email, createdAt);
        localStorage.setItem("email", email);
        localStorage.setItem("name", displayName);
        setUser({ displayName, email, createdAt, imgSrc });
        setAuthenticated(true);
        const lgDate = new Date().toLocaleString();
        update(ref(database, "users/" + user), {
          last_login: lgDate,
        });
        window.location.href = "/";
      } else {
        //set the user to null
        setUser(null);
        setAuthenticated(false);
      }
    });
  }, []);


  return (
    <UserContext.Provider value={user}>
      {children} 
    </UserContext.Provider>
  );
};


export default UserProvider;