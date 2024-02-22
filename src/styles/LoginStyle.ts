import { StyleSheet } from 'react-native';
export const LoginStyle = StyleSheet.create({
  Welcome: {
    // display: "flex",
    // flex: 1,
    // alignItems: "center",
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'UrbanistBold',
    marginBottom: 20
  },
  Subtext: {
    fontFamily: 'UrbanistRegular',
    fontSize: 16,
    color: '#414141',
    fontWeight: '500'
  },
  inpBox: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: '#E1E1E1',
    borderRadius: 14,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  inpBox2: {
    backgroundColor: '#FAFAFA',

    paddingVertical: 10,
    paddingHorizontal: 16,
    borderColor: '#E1E1E1',
    borderRadius: 14,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  inp: {
    flex: 1,
    marginLeft: 15,
    color: '#616161',
    fontFamily: 'UrbanistRegular',
    fontWeight: '500'
  },
  Orbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  emptyBox: {
    height: 2,
    backgroundColor: '#D9D9D9',
    flex: 1
  },
  OrText: {
    marginHorizontal: 10,
    fontFamily: 'UrbanistRegular',
    fontSize: 14,
    fontWeight: '500',
    color: '#616161'
  },
  google: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 14
  },
  google2: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 14,
    marginTop: 10
  },
  googleText: {
    fontWeight: '600',
    color: '#212121',
    fontFamily: 'UrbanistBold',
    fontSize: 16
  },
  center: {
    flex: 1
  },
  progressContainer: {
    flexDirection: 'row',
    marginVertical: 0,
    marginLeft: 5,
    maxWidth: '100%',
    flex: 1
  },
  progressStep: {
    width: '45%',
    height: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 2,
    borderRadius: 2
  },
  progressStep2: {
    width: '22%',
    height: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 2,
    borderRadius: 2
  },
  completedStep: {
    backgroundColor: '#192A53'
  },

  HeaderBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    marginBottom: 24
  },

  HeaderBox2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    marginBottom: 0
  },
  headText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'UrbanistBold',
    color: '#212121',
    marginBottom: 10
  },

  ImageText: {
    fontFamily: 'UrbanistBold',
    fontSize: 14,
    fontWeight: '700',
    color: '#212121'
  },
  addService: {
    backgroundColor: 'rgba(25, 42, 83, 0.12)',
    borderRadius: 54,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#192A53'
  },

  addServiceText: {
    fontSize: 16,
    fontFamily: 'UrbanistBold',
    fontWeight: '700',
    color: '#192A53'
  },

  serviceItem: {
    height: 80,

    marginVertical: 10,
    borderRadius: 14,
    position: 'relative'
  },
  ServiceImage: {
    width: '100%',
    height: 80,
    borderRadius: 14
  },
  Shadow: {
    backgroundColor: 'rgba(0, 0,0, 0.5)',
    width: '100%',
    height: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 14
  },
  ServiceDetails: {
    position: 'absolute',
    top: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24
  },

  Detailtext: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'UrbanistBold'
  },

  deleteBtn: {
    height: 24,
    width: 24,
    borderRadius: 24,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
