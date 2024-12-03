import { StyleSheet, Text, View, Image, FlatList, TextInput, Button, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import axios from "axios"

interface Character {
  id: number,
  name: string,
  image: string
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
    <View>
      <Image source={{uri: item.image}}/>
      <View style>
        <Text>{item.name}</Text>
      </View>
    </View>
  )
  
  return (
    <View>

    </View>
  );
}

const styles = StyleSheet.create({

});
