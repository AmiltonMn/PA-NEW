import { StyleSheet, Text, View, Image, FlatList, TextInput, Button, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import axios from "axios"

interface Character {
  _id: number,
  name: string,
  imageUrl: string
}

export default function TabTwoScreen() {

  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<string>("1")

  const fetchCharacters = async (pageNumber: string) => {

    try {
      const response = await axios.get(
        `https://api.disneyapi.dev/character?page=${pageNumber}`
      )

      setCharacters(response.data.data)
    } catch (error) {
      console.error("Erro ao buscar personagens: ", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters(page)
  }, [])

  const renderCharacter = ({item} : {item: Character}) => (
    <View style={styles.card}>
      <Image source={{uri: item.imageUrl}} style={styles.image}/>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#20F6CFFF"/>
      </View>
    )
  }
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <Text>1/149 - </Text>
        <TextInput
          style={styles.input}
          value={page}
          onChangeText={(text) => setPage(text)}
          keyboardType='numeric'
          placeholder='Digite o número da página'
        />
        <Button title='Buscar' onPress={() => fetchCharacters(page)} />
      </View>
      <FlatList 
        data={characters}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderCharacter}
        contentContainerStyle={styles.list}/>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F9F9F9FF",
    marginBottom: 12,
    borderRadius: 8,
    width: 'auto',
    overflow: "hidden",
    elevation: 2, // * Sombra pra android

    // * Abaixo sombra para IOS
    // * link para criar a sombra https://ethercreative.github.io/react-native-shadow-generator/
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0, 
      height: 2
    },
    shadowRadius: 8
  },
  image: {
    width: 150,
    height: 150
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  status: {
    fontSize: 14,
    color: "#c6c6c6ff"
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    padding: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0'
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8
  }
});
