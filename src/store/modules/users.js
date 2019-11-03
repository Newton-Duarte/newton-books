import { auth, db, storage } from '../../firebase/init';

const collection = 'users';

const state = {
  user: null,
};

const getters = {
  allUsers: state => state.users,
  user: state => state.user,
};

const actions = {
  loginUser({ commit }, user) {
    return new Promise(async (resolve, reject) => {
      commit('setLoading', true);
      commit('clearError');
      try {
        const cred = await auth.signInWithEmailAndPassword(user.email, user.password);
        const newUser = {
          id: cred.user.uid,
          name: cred.user.displayName,
          email: cred.user.email
        }
        commit('setLoading', false);
        commit('login', newUser);
        resolve(newUser);
      } catch (error) {
        commit('setLoading', false);
        switch(error.code) {
          case 'auth/invalid-email':
            commit('setError', 'Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            reject('Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            break;
  
          case 'auth/user-disabled':
            commit('setError', 'Usuário desativado, entre em contato com o administrador do sistema.');
            reject('Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            break;
          
          case 'auth/user-not-found':
            commit('setError', 'Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            reject('Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            break;
  
          case 'auth/wrong-password':
            commit('setError', 'Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            reject('Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            break;
        }
      }
    });
  },

  async logoutUser({ commit }) {
    try {
      await auth.signOut();
      commit('logout')
    } catch (error) {
      return error;
    }
  },

  async fetchCurrentUser({ commit }) {
    try {
      const user = auth.currentUser;
      const doc = await db.collection(collection).doc(user.uid).get();
      if (doc.exists && doc.data()) {
        const newUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          imageUrl: doc.data().imageUrl
        }
        user ? commit('login', newUser) : '';
      }
    } catch (error) {
      console.log(`Ocorreu um erro:`, error.message);
    }
  },

  async createUser({ commit }, user) {
    commit('setLoading', true);
    commit('clearError');
    return new Promise(async (resolve, reject) => {
      try {
        await auth.createUserWithEmailAndPassword(user.email, user.password);
        delete user.password;
        let uid = auth.currentUser.uid;
        await db.collection(collection).doc(uid).set({...user});
        await auth.currentUser.updateProfile({
          displayName: user.name
        });
        commit('setLoading', false);
        commit('login', user);
        resolve(user);
      } catch (error) {
        commit('setLoading', false);
        console.log(error.code);
        switch(error.code) {
          case 'auth/invalid-email':
            commit('setError', 'Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            reject('Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            break;
  
          case 'auth/email-already-in-use':
            commit('setError', 'E-mail já cadastrado, por favor utilize outro e-mail');
            reject('E-mail já cadastrado, por favor utilize outro e-mail');
            break;
          
          case 'auth/user-not-found':
            commit('setError', 'Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            reject('Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            break;
  
          case 'auth/wrong-password':
            commit('setError', 'Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            reject('Usuário não encontrado, certifique-se que informou e-mail e senha válidos.');
            break;
        }
      }
    });
  },
  uploadFile({ commit, getters }, file) {
    commit('setLoading', true);
    let storageRef = storage.ref();
    let uploadTask = storageRef.child(`${getters.user.id}/${getters.user.name}`).put(file);

    uploadTask.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    }, error => {
      console.log(error);
      commit('setLoading', false);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log(`File available at: ${downloadURL}`);
        db.collection(collection).doc(getters.user.id).update({
          imageUrl: downloadURL
        })
        .then(() => {
          commit('setImageProfile', downloadURL)
          commit('setLoading', false);
        })
        .catch(error => {
          console.log('Ocorreu um erro ao atualizar o documento: ', error)
          commit('setLoading', false);
        });
      });
    });
  },
  async deleteImageProfile({ commit, getters }) {
    const imageRef = storage.ref().child(`${getters.user.id}/${getters.user.name}`);
    await imageRef.delete();
    db.collection(collection).doc(getters.user.id).update({
      imageUrl: ''
    })
    .then(() => console.log('Documento atualizado com sucesso.'))
    .catch(error => console.log('Ocorreu um erro ao atualizar o documento: ', error));
    commit('removeImageProfile');
    console.log('Arquivo excluido com sucesso');
  }
};

const mutations = {
  newUser: (state, user) => state.users.push(user),
  login: (state, user) => state.user = user,
  logout: state => state.user = null,
  setImageProfile: (state, imageUrl) => state.user.imageUrl = imageUrl,
  removeImageProfile: state => state.user.imageUrl = ''
};

export default {
  state,
  getters,
  actions,
  mutations
}