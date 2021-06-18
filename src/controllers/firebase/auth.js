import { auth, firestore } from './../../config';

export const signUpWithCredential = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth.signOut();
};

export const updateEmail = async (email) => {
  const currentUser = auth.currentUser;

  return await currentUser
    .updateEmail(email)
    .then(() => {
      return 'Email updated';
    })
    .catch((error) => {
      return error;
    });
};

export const updatePassword = (password) => {
  const currentUser = auth.currentUser;

  return currentUser.updatePassword(password);
};

export const updateProfileData = async (data) => {
  const currentUser = auth.currentUser;

  return await currentUser
    .updateProfile(data)
    .then(() => {
      return 'Profile updated';
    })
    .catch((error) => {
      return error;
    });
};

export const deleteUser = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) return;

  return firestore
    .collection('users')
    .doc(currentUser.uid)
    .delete()
    .then(() => {
      currentUser.delete();
    })
    .catch((error) => {
      return error;
    });
};

export const addUserToCollection = async (userId, data) => {
  return firestore
    .collection('users')
    .doc(userId)
    .set(data)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return error;
    });
};

export const getUserDoc = async (userId) => {
  const userRef = firestore.collection('users').doc(userId);

  return await userRef
    .get()
    .then((user) => {
      if (user.exists) {
        return user.data();
      } else {
        return 'No such user!';
      }
    })
    .catch((error) => {
      return `Error getting user:", ${error}`;
    });
};
