import { StyleSheet } from 'react-native';
export const HomeStyle = StyleSheet.create({
  homeHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profilebox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profileText: {
    fontFamily: 'UrbanistRegular',
    fontSize: 12,
    color: '#757575',
    fontWeight: '400',
    marginBottom: 3
  },
  Location: {
    color: '#212121',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'UrbanistSemiBold'
  },
  Welcomes: {
    color: '#212121',
    fontWeight: '700',
    fontFamily: 'UrbanistBold',
    fontSize: 24
  },
  service: {
    color: '#414141',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'UrbanistMedium',
    marginTop: 5
  },
  welBox: {
    marginVertical: 20
  }
});
