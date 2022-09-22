import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';
import { styles } from './styles';

import { GameParams } from '../../@types/navigation';

import { DuoCard } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Entypo
            name="chevron-left"
            color={THEME.COLORS.CAPTION_300}
            size={20}
          />
        </TouchableOpacity>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        <View style={styles.right} />
      </View>
      <Image
        source={{ uri: game.bannerUrl }}
        style={styles.cover}
        resizeMode="cover"
      />
      <Heading 
        title={game.title}
        subtitle='Conecte-se e comece a jogar'
      />
      <DuoCard/>
    </SafeAreaView>
  );
}