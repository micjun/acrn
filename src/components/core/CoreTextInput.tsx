/* eslint-disable react/require-default-props */
import React, { createRef, useEffect, useState, useRef, forwardRef,  } from 'react';
import {
  TextInput,
  View,
  Text,
  TextStyle,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextProps,
  AccessibilityProps
} from 'react-native';


// TODO: if we have time, pull out default styles to keep code DRY
const editableTextInputColor = '#494949';
const disabledTextInputColor = '#BBB';
const focusedInputColor = 'blue';
const minimumTouchableSize = 48;

interface Props extends TextInputProps , TextProps {
  /** Pass along stylesheet in props */
  //TODO: CHANGE STYLE TYPE FOR A STYLESHEET.CREATE StyleProp<TextStyle>
  /** Pass along label and placeholder props for input */
  labelText?: string;
  placeholderText?: string;
  changeEditable?: boolean;
  // TODO: find a way to avoid this any
  style?: any;
}


const CoreTextInput = React.forwardRef<TextInput, Props>(
 ({labelText = 'Label Placeholder', 
  placeholderText = 'Placeholder',
  accessibilityLabel = 'Accessible Text Input',
  changeEditable = true,
  style,
  ...rest}: Props, ref) => {
  
  const [value, setValue] = useState('');
  /** We allow user to disable text input (can be useful because disabled
   * text inputs don't get submitted) */
  const [editable, setEditable] = useState(true);
  const [valueIsFocused, setValueIsFocused] = useState(false);
  const textInputColor = editable
    ? editableTextInputColor
    : disabledTextInputColor;
  const accessibilityState = { disabled: !editable };
  
  /** Default Stylesheet */
  const defaultStyle = StyleSheet.create({
    label: {
      color: valueIsFocused ? focusedInputColor : textInputColor,
    },
    input: {
      backgroundColor: '#FFF',
      padding: 8,
      height: minimumTouchableSize,
      width: '100%',
      borderColor: valueIsFocused ? focusedInputColor : textInputColor,
      borderWidth: valueIsFocused ? 2 : 1,
      borderRadius: 4,
      marginTop: 8,
    },
  });
  useEffect(() => {
    if (changeEditable === false) {
      setEditable(false)
    }
  }, [editable])
  
  return (
    <View
      accessible
      accessibilityLabel= {accessibilityLabel}
      accessibilityState={accessibilityState}
    >
      <Text style = {style ? ([defaultStyle.label, style.label]):defaultStyle.label}>
        {labelText}
      </Text>
      <TextInput 
        ref={ref}
        style = {style ? ([defaultStyle.input, style.input]): defaultStyle.input}
        // style={[defaultStyle.input, style.input]}
        placeholder={placeholderText}
        placeholderTextColor={textInputColor}
        value={value}
        onChangeText={(text) => setValue(text)}
        editable={editable}
        onFocus={() => setValueIsFocused(true)}
        onBlur={() => setValueIsFocused(false)}
      />
    </View>
  );
})

export default CoreTextInput;
