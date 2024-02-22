import { StyleSheet } from 'react-native';
export const GlobalStyle = StyleSheet.create({
  containers: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 24,
    marginTop: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },

  main: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  blue: {
    width: 80,
    height: 80,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#192A53'
  },
  great: {
    color: '#212121',
    fontWeight: '700',
    fontSize: 24,
    fontFamily: 'UrbanistBold'
  },
  confirm: {
    fontFamily: 'UrbanistMedium',
    fontSize: 16,
    fontWeight: '500',
    color: '#414141',
    textAlign: 'center'
  }
});
