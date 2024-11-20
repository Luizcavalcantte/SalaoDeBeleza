import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../components/Container';
import {logOut, getUserInfo} from '../Api';
import {useNavigation} from '@react-navigation/native';
import userAvatar from '../assets/avatar.png';

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    async function getUser() {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  return (
    <Container>
      {userInfo && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.avatarButtom}>
              <Image source={userAvatar} style={styles.avatarImage} />
            </TouchableOpacity>
            <Text style={styles.name}>{userInfo.name}</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.bodyText}>{userInfo.name}</Text>
            <Text style={styles.bodyText}>{userInfo.email}</Text>
            <Text style={styles.bodyText}>{userInfo.phone}</Text>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <Button
          title="sair"
          onPress={() => {
            // logOut(navigation);
            // console.log(userInfo.uid);
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  avatarImage: {
    height: 100,
    width: 100,
  },
  header: {
    paddingHorizontal: 10,
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarButtom: {
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '',
    marginRight: 20,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  bodyText: {
    backgroundColor: '#fff',
    marginBottom: 30,
    padding: 10,
    borderRadius: 5,
    color: '#000',
  },
  footer: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
});
