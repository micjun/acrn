import React, { useEffect, useRef, useState } from 'react';
import { View, ViewProps, Alert } from 'react-native';
import CoreTextInput from '../../components/CoreTextInput/CoreTextInput';
import NewButton from '../../components/NewButton/NewButton';

/**
 * Allow user to enter in:
 * email
 * full name
 * username
 * password
 * submit/signup button
 */

interface Props extends ViewProps {}

function CreateAccount(props: Props) {
  // const passwordRef = useRef(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef(null);
  const [username, setUsername] = useState('');

  const { accessibilityLabel, accessibilityHint } = props;

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <CoreTextInput
        ref={emailRef}
        value={username}
        onChangeText={(text) => setUsername(text)}
        labelText="Email"
        placeholder="username@domain.com"
      />
      <CoreTextInput
        ref={passwordRef}
        labelText="Full Name"
        placeholder="Enter full name"
      />
      <CoreTextInput
        ref={passwordRef}
        labelText="Username"
        placeholder="Enter username"
      />
      <CoreTextInput
        ref={passwordRef}
        labelText="Password"
        placeholder="Choose password"
        secureTextEntry={true}
      />
      <NewButton
        text="Submit"
        onLongPress={() =>
          Alert.alert('Alert Title', 'My Alert Msg', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ])
        }
      />
    </View>
  );
}

export default CreateAccount;
