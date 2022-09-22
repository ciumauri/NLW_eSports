import { View } from 'react-native';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export function DuoCard() {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nomes'
        value='Mauricio Oliveira'
      />
      <DuoInfo
        label='Nome'
        value='Mauricio Oliveira'
      />
      <DuoInfo
        label='Nome'
        value='Mauricio Oliveira'
      />
      <DuoInfo
        label='Nome'
        value='Mauricio Oliveira'
      />
    </View>
  );
}