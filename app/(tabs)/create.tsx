import { View, Text, TouchableOpacity, TextComponent, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, TextInput } from 'react-native'
import { Image } from 'expo-image';
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { styles } from '@/styles/create.styles'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function CreateScreen() {
  const router = useRouter()
  const { user } = useUser()
  const { caption, setCaption } = useState<any | string>("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [3, 2],
      quality: 0.8

    })
    if (!result.canceled) setSelectedImage(result.assets[0].uri)
  }

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl)
  const createPost = useMutation(api.posts.createPost)

  const handleShare = async () => {
    if(!selectedImage) return

    try {
      
    } catch (error) {
      
    }
  }

  if (!selectedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={28} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <View style={{ width: 28 }}></View>
        </View>

        <TouchableOpacity style={styles.emptyImageContainer} onPress={pickImage}>
          <Ionicons name='image-outline' size={48} color={Colors.gray} />
          <Text style={styles.emptyImageText}> Tap to select an image</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.contentContainer}>
        {/* Header  */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { setSelectedImage(null); setCaption("") }} disabled={isSharing}>
            <Ionicons name='close-outline' size={28} color={isSharing ? Colors.gray : Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity style={[styles.shareButton, isSharing && styles.shareButtonDisabled]} disabled={isSharing || !selectedImage}>
            {isSharing ? (
              <ActivityIndicator size={"small"} color={Colors.primary} />
            ) : (
              <Text style={styles.shareText}> Share</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} keyboardShouldPersistTaps={"handled"}>
          <View
            style={[styles.content, isSharing && styles.contentDisabled]}
          >
            {/* Image section  */}
            <View style={styles.imageSection}>
              <Image
                source={selectedImage}
                style={styles.previewImage}
                contentFit="cover"
                transition={200}
              />
              <TouchableOpacity style={styles.changeImageButton} onPress={pickImage} disabled={isSharing}>
                <Ionicons name='image-outline' size={20} color={Colors.white} />
                <Text style={styles.changeImageText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* input section  */}
            <View style={styles.inputSection}>
              <View style={styles.captionContainer}>
                <Image
                  source={user?.imageUrl}
                  style={styles.userAvatar}
                  contentFit='cover'
                  transition={200}
                />
                <TextInput
                  style={styles.captionInput}
                  placeholder='Write a caption...'
                  placeholderTextColor={Colors.white}
                  multiline
                  value={caption}
                  onChangeText={setCaption}
                  editable={!isSharing}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}
