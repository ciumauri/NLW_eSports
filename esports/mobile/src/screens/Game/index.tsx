import axios from "axios";

import { useEffect, useState } from 'react';
import { Text, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';
import { styles } from './styles';

import { GameParams } from '../../@types/navigation';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [duoMatch, setDuoMatch] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleBack() {
    navigation.goBack();
  }

  async function getDiscordDuos(adsId: string) {
    //axios(`http://192.168.0.120:3333/ads/${adsId}/discord`)
    axios(`http://172.22.7.195:3333/ads/${adsId}/discord`)
      .then(response => setDuoMatch(response.data.discord))
  }

  useEffect(() => {
    //axios(`http://192.168.0.120:3333/games/${game.id}/ads`)
    axios(`http://172.22.7.195:3333/games/${game.id}/ads`)
      .then(response => setDuos(response.data))
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
            onConect={() => getDiscordDuos(item.id)}
          />
        )}
        horizontal
        style={styles.containerList}
        contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhum anúncio publicado no momento.
          </Text>
        )}
      />

      <DuoMatch
        visible={duoMatch.length > 0}
        discord={duoMatch}       
        onClose={() => setDuoMatch("")}
      />
    </SafeAreaView>
  );
}