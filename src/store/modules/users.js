import { auth, db, storage } from '../../firebase/init';

const collection = 'users';

const state = {
  users: [],
  user: '',
  profileImage: ''
};

const getters = {
  allUsers: state => state.users,
  user: state => state.user,
  profileImage: state => state.profileImage
};

const actions = {
  async loginUser({ commit }, user) {
    try {
      await auth.signInWithEmailAndPassword(user.email, user.password);
      commit('login', auth.currentUser.displayName);
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },

  async logoutUser({ commit }) {
    try {
      await auth.signOut();
      commit('logout')
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },

  fetchCurrentUser({ commit }) {
    try {
      const user = auth.currentUser;
      user ? commit('login', user) : '';
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },

  async createUser({ commit }, user) {
    try {
      await auth.createUserWithEmailAndPassword(user.email, user.password);
      delete user.password;
      let uid = auth.currentUser.uid;
      await db.collection(collection).doc(uid).set({...user});
      await auth.currentUser.updateProfile({
        displayName: user.name
      });
      commit('login', user);
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },
  // Profile
  async fetchProfileImage({ commit }, uid) {
    const doc = await db.collection(collection).doc(uid).get();
    if (doc.exists && doc.data().imageUrl) {
      commit('setProfileImage', doc.data().imageUrl);
    } else {
      console.log('Nenhum arquivo encontrado');
    }
  },
  uploadFile({ commit, getters }, file) {
    let storageRef = storage.ref();
    let uploadTask = storageRef.child(`${getters.user.uid}/${getters.user.displayName}`).put(file);

    uploadTask.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    }, error => {
      console.log(error);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log(`File available at: ${downloadURL}`);
        db.collection(collection).doc(getters.user.uid).update({
          imageUrl: downloadURL
        })
        .then(() => console.log('Documento atualizado com sucesso,'))
        .catch(error => console.log('Ocorreu um erro ao atualizar o documento: ', error));
      });
    });
  },
  async deleteImageProfile({ commit, getters }) {
    const imageRef = storage.ref().child(`${getters.user.uid}/${getters.user.displayName}`);
    await imageRef.delete();
    db.collection(collection).doc(getters.user.uid).update({
      imageUrl: ''
    })
    .then(() => console.log('Documento atualizado com sucesso.'))
    .catch(error => console.log('Ocorreu um erro ao atualizar o documento: ', error));
    commit('removeImageProfile');
    console.log('Arquivo excluido com sucesso');
  }
};

const mutations = {
  setUsers: (state, users) => state.users = users,
  newUser: (state, user) => state.users.push(user),
  login: (state, user) => state.user = user,
  logout: state => state.user = null,
  setProfileImage: (state, image) => state.profileImage = image,
  removeImageProfile: state => state.profileImage = ''
};

export default {
  state,
  getters,
  actions,
  mutations
}