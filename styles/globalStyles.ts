import { StyleSheet } from 'react-native';

const theme = {
  primaryColor: 'darkblue',
  defaultRadius: 4,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    height: 32,
    borderWidth: 1,
    padding: 4,
    borderColor: 'darkblue',
    borderRadius: theme.defaultRadius,
    width: '100%',
    marginTop: 12,
  },
  button: {
    height: 32,
    padding: 4,
    backgroundColor: 'darkblue',
    borderRadius: theme.defaultRadius,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});

export default globalStyles;
