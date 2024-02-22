declare module '*.jpg' {
  export default import('react-native').ImageSource;
}
declare module '*.png' {
  export default import('react-native').ImageSource;
}
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
