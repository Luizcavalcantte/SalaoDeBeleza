import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import {
  initializeAuth,
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jestConfig from '../jest.config';

const firebaseConfig = {
  apiKey: 'AIzaSyAIzeI41ZoiDNySouo3gymDyXALGUCqV-4',
  authDomain: 'salaodebeleza-741ec.firebaseapp.com',
  projectId: 'salaodebeleza-741ec',
  storageBucket: 'salaodebeleza-741ec.firebasestorage.app',
  messagingSenderId: '870955911787',
  appId: '1:870955911787:web:156ad95b855fec0bddbf2e',
  measurementId: 'G-XD8HDC6G32',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

auth.setPersistence(getReactNativePersistence(AsyncStorage));

export async function createUser(name, email, phone, password, navigation) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    await updateProfile(user, {displayName: name});

    const userDocRef = doc(db, 'db', 'LeLYwn2XgFtlzfadkBHy');
    await updateDoc(userDocRef, {
      users: arrayUnion({
        name: name,
        email: email,
        phone: phone,
        uid: user.uid,
      }),
    });

    navigation.replace('MainTab');
    alert('Conta Criada com Sucesso');
  } catch (error) {
    console.log('Erro ao criar usuário: ', error);
  }
}

export async function login(email, password, navigation) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    navigation.replace('MainTab');
  } catch (error) {
    alert('E-mail ou Senha Incorreta!');
    console.log('erro ao fazer loguin', error);
  }
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(email);
}

export async function checkPersistence(navigation) {
  onAuthStateChanged(auth, user => {
    if (user) {
      navigation.replace('MainTab');
    } else {
      navigation.replace('Login');
    }
  });
}

export async function logOut(navigation) {
  try {
    await signOut(auth);
    console.log('usuario deslogado');
    navigation.replace('LoadScreen');
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo() {
  const userUid = await new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resolve(user.uid);
      } else {
        reject('user nao encontrado');
        console.log('user nao encontrado');
      }
    });
  });

  const docRef = doc(db, 'db', 'LeLYwn2XgFtlzfadkBHy');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    data = docSnap.data();

    const users = data.users;

    const userInfo = users.find(user => user.uid == userUid);
    if (userInfo) {
      return userInfo;
    } else {
      console.log('user info nao encontrado');
    }
  } else {
    console.log('documento nao encontrado');
    return [];
  }
}

export async function getServices() {
  const docRef = doc(db, 'db', 'LeLYwn2XgFtlzfadkBHy');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const beautyServices = data.beautyServices;

    return beautyServices;
  } else {
    console.log('nenhum serviço encontrado');
  }
}

export function formatTime(time) {
  if (time == 30) {
    let newTime = '00:30 Minutos';
    return newTime;
  }
  if (time > 30 && time % 60 == 0) {
    let newTime =
      time / 60 == 1
        ? '0' + time / 60 + ':00 hora'
        : '0' + time / 60 + ':00 Horas';
    return newTime;
  } else {
    let newTime = '0' + parseInt(time / 60) + ':' + (time % 60) + ' Horas';
    return newTime;
  }
}

export async function getAppointments() {
  const docRef = doc(db, 'db', 'LeLYwn2XgFtlzfadkBHy');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const appointments = data.appointments;

    return appointments;
  } else {
    console.log('nenhum agendamento encontrado');
  }
}

export async function createAppontment(appointmentService) {
  try {
    const userDocRef = doc(db, 'db', 'LeLYwn2XgFtlzfadkBHy');
    await updateDoc(userDocRef, {
      appointments: arrayUnion(appointmentService),
    });

    alert('Horario marcado com sucesso!!');
  } catch (error) {
    console.log('Erro ao criar usuário: ', error);
  }
}

export async function createAppontmentaa(appointmentService) {
  //verificar, tavelz melhorar essa func, pois pode dar probela se 2
  // usuarios tentarem marcar horario ao msmo tempo
  const newAppontment = appointmentService;
  try {
    const docRef = doc(db, 'db', 'LeLYwn2XgFtlzfadkBHy');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('doc exist');
      const data = docSnap.data();
      const appointments = data.appointments;

      const checkappontment = appointments.filter(
        a => a.date == newAppontment.data,
      );

      if (checkappontment) {
        console.log('checkappoint exist');
        for (i = 0; i < appointments.length; i++) {
          console.log('entrou no for');

          if (appointments[i].date == newAppontment.date) {
            console.log('entrou no if do for');

            appointments[i].unavailableDate.push(
              newAppontment.unavailableDate[0],
            );
            console.log(appointments);

            await updateDoc(docRef, {appointments: appointments});
            console.log('aconteceu alguma coisa');
            i++;
          } else {
            i++;
          }
        }
      } else {
        console.log('algo deu errado erro 1');
      }
    } else {
      console.log('algo deu errado erro 2');
    }

    alert('Horario marcado com sucesso!!');
  } catch (error) {
    console.log('Erro ao marcar horario: ', error);
  }
}

// await updateDoc(userDocRef, {
//   users: arrayUnion({
//     name: name,
//     email: email,
//     phone: phone,
//     uid: user.uid,
//   }),
// });
