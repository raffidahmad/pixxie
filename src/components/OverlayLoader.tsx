import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRecoilValue } from 'recoil';
import { isLoading } from '@/recoil/atoms';

const OverlayLoader = () => {
  const isLoaderActive = useRecoilValue(isLoading);
  return <Spinner visible={isLoaderActive} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />;
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  }
});

export default OverlayLoader;
