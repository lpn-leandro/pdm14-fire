import {
  Text,
  TouchableHighlightProps,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import globalStyles from '../../../styles/globalStyles';

type StyledButtonProps = {
  title: string;
} & TouchableHighlightProps;

export default function StyledButton({ title, ...props }: StyledButtonProps) {
  return (
    <TouchableHighlight {...props} style={[globalStyles.button, props.style]}>
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
}
