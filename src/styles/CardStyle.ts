import { StyleSheet } from 'react-native';
export const CardStyle = StyleSheet.create({
  cardBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginVertical: 10
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    fontFamily: 'UrbanistSemiBold'
  },
  connect: {
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'UrbanistBold',
    color: '#192A53'
  },
  cardImg: {
    // width: 24,
    // height: 24,
    marginRight: 10
  },
  paymentBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  addbtn: {
    backgroundColor: 'rgba(25, 42, 83, 0.12  )',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 54,
    borderWidth: 1.5,
    borderColor: '#192A53',
    alignItems: 'center'
  },
  btnText: {
    color: '#192A53',
    fontFamily: 'UrbanistSemiBold',
    fontSize: 16,
    fontWeight: '700'
  },
  cardsImg: {
    height: 177,
    position: 'relative',
    marginVertical: 10
  },
  imageStyle: {
    borderRadius: 24
  },

  CardsText: {
    position: 'absolute',
    top: 70,
    paddingHorizontal: 24
  },
  numberText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 23.29
  },
  cardDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  expirybox: {
    marginLeft: 50
  },
  detailsName: {
    fontWeight: '400',
    color: '#ffff',
    fontSize: 10
  },
  detailsData: {
    color: '#ffff',
    fontWeight: '600',
    fontSize: 14
  },
  label: {
    fontFamily: 'UrbanistBold',
    fontSize: 14,
    fontWeight: '700',
    color: '#212121'
  },
  inputbox: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderColor: '#E5E5E5',
    marginVertical: 10
  }
});
