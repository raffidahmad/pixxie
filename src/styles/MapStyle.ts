import { StyleSheet } from 'react-native';
export const MapStyle = StyleSheet.create({
  Mapcontainer: {
    flex: 1,
    position: 'relative'
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0
  },

  MapHeader: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: 100,
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24
  },
  profileBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginRight: 5
  },
  proftext: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'UrbanistSemiBold',
    color: 'white'
  },
  welText: {
    color: 'rgba(255, 255, 255, 0.80);',
    fontSize: 12,
    fontWeight: '400'
  },

  buttons: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white'
  },
  request: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 33,
    borderTopLeftRadius: 33,
    zIndex: 1000
  },

  ScrollHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  HeaderText: {
    color: '#212121',
    fontFamily: 'UrbanistSemiBold',
    fontSize: 16
  },
  Text2: {
    color: '#212121',
    fontFamily: 'UrbanistMedium',
    fontSize: 14,
    fontWeight: '600'
  },
  hr: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#192A53',
    marginTop: 30
  },
  hr2: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#192A53',
    marginVertical: 10
  },
  clintBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  clintName: {
    color: '#212121',
    fontSize: 18,
    fontFamily: 'UrbanistSemiBold',
    fontWeight: '700'
  },
  clintLocation: {
    fontSize: 14,
    color: '#616161',
    fontFamily: 'UrbanistSemiBold',
    fontWeight: '500'
  },

  requestHeading: {
    color: '#212121',
    fontFamily: 'UrbanistBold',
    fontSize: 18,
    marginVertical: 10
  },

  TimeBox: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#192A53',
    alignSelf: 'flex-start',
    marginVertical: 10
  },

  timeText: {
    color: '#192A53',
    fontSize: 16,
    fontFamily: 'UrbanistSemiBold'
  },

  reqstbuttonsBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10
  },

  requestbtns: {
    backgroundColor: '#192A53',
    height: 48,
    width: 48,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backbtn: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  matchHeader: {
    position: 'absolute',
    left: 0,
    top: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24
  },

  MatchHeaderText: {
    fontFamily: 'UrbanistBold',
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  check: {
    color: '#616161',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'UrbanistRegular',
    marginVertical: 5
  },
  dropdownContainer: {
    marginLeft: 'auto',
    backgroundColor: '#fafafa',
    width: 100
  },
  seemore: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  seeText: {
    color: '#616161',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'UrbanistBold'
  }
});
