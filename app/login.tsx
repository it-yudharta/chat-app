import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginPage () {
  const [username, setUsername] = useState('doejohn');
  const [password, setPassword] = useState('test@123');

  const signIn = async () => {
    const url = 'https://api.freeapi.app/api/v1/users/login';
    const options = {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password,
      })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <Text>Login</Text>
      <View>
        <View>
          <TextInput
            placeholder="Masukkan username"
            onChangeText={newUsername => setUsername(newUsername)}
            value={username}
          /> 
        </View>

        <View>
          <TextInput
            placeholder="Masukkan password"
            onChangeText={password => setPassword(password)}
            value={password}
          /> 
        </View>

        <View>
          <Button title="Login" onPress={signIn}/>
        </View>
      </View>
    </View>
  );
}
