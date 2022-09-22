import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';
import { styles } from './styles';

import { GameParams } from '../../@types/navigation';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.0.120:3333/games/${game.id}/ads`)
    //fetch('http://172.22.7.195:3333/games')
      .then(response => response.json())
      .then(data => setDuos(data));
  }, []);

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
      
      <FlatList
        data={duos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DuoCard data={item}
          onConect={() => {}}
          />
        )}
        horizontal
        style={styles.containerList}
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}