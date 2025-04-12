import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function bookmarks() {
  return (
    <View>
      <Text>bookmarks</Text>
      <Link href={"/(auth)/login"}>login</Link>
    </View>
  )
}