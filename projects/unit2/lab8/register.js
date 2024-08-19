import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[^\d=?\\/@#%^&*()]+$/;
  const zipCodeRegex = /^\d{5}$/;

  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    setFirstNameError(nameRegex.test(text) ? '' : 'Error: Must only include word or symbol characters, no numbers.');
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
    setLastNameError(nameRegex.test(text) ? '' : 'Error: Must only include word or symbol characters, no numbers.');
  };

  const handleUsernameChange = (text) => setUsername(text);

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    setPhoneError(phoneRegex.test(text) ? '' : 'Error: Must be exactly (xxx) xxx-xxxx and all digits.');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(passwordRegex.test(text) ? '' : 'Error: Must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long.');
  };

  const handleConfirmPasswordChange = (text) => setConfirmPassword(text);

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(emailRegex.test(text) ? '' : 'Error: Must include an "@" sign and at least one period following it.');
  };

  const handleZipCodeChange = (text) => {
    setZipCode(text);
    setZipCodeError(zipCodeRegex.test(text) ? '' : 'Error: Must include 5 digits (US Zip codes).');
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (
      phoneError ||
      emailError ||
      passwordError ||
      firstNameError ||
      lastNameError ||
      zipCodeError
    ) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      let userData = {
        firstName,
        lastName,
        username,
        phoneNumber,
        password,
        email,
        zipCode,
        newsletter
      };
      let allUsers = await AsyncStorage.getItem('registeredUsers');
      if (allUsers) {
        allUsers = JSON.parse(allUsers);
        allUsers.push(userData);
      } else {
        allUsers = [userData];
      }
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(allUsers));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registration Screen</Text>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={handleFirstNameChange}
        onBlur={handleFirstNameChange}
        testID="firstname"
      />
      <Text style={styles.error}>{firstNameError}</Text>
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={handleLastNameChange}
        onBlur={handleLastNameChange}
        testID="lastname"
      />
      <Text style={styles.error}>{lastNameError}</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={handleUsernameChange}
        testID="username"
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        onBlur={handlePhoneNumberChange}
        testID="phonenumber"
      />
      <Text style={styles.error}>{phoneError}</Text>
      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        onBlur={handlePasswordChange}
        testID="password"
      />
      <Text style={styles.error}>{passwordError}</Text>
      <TextInput
        label="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        testID="confirmpassword"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        onBlur={handleEmailChange}
        testID="email"
      />
      <Text style={styles.error}>{emailError}</Text>
      <TextInput
        label="ZIP Code"
        value={zipCode}
        onChangeText={handleZipCodeChange}
        onBlur={handleZipCodeChange}
        testID="zip"
      />
      <Text style={styles.error}>{zipCodeError}</Text>
      <View style={styles.newsletterContainer}>
        <Text>Sign up for newsletter</Text>
        <Switch
          value={newsletter}
          onValueChange={setNewsletter}
          testID="newsletter"
        />
      </View>
      <Button
        title="Register"
        onPress={handleRegister}
        testID="register-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  newsletterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Register;