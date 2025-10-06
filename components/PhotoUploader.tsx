
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

const { width } = Dimensions.get('window');

interface Photo {
  id: string;
  uri: string;
  name: string;
}

interface PhotoUploaderProps {
  onAlbumCreate: (album: {
    title: string;
    description: string;
    photos: Photo[];
    price: number;
  }) => void;
}

export default function PhotoUploader({ onAlbumCreate }: PhotoUploaderProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDescription, setAlbumDescription] = useState('');
  const [albumPrice, setAlbumPrice] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 20,
      });

      if (!result.canceled && result.assets) {
        const newPhotos: Photo[] = result.assets.map((asset, index) => ({
          id: `photo_${Date.now()}_${index}`,
          uri: asset.uri,
          name: `Photo ${photos.length + index + 1}`,
        }));
        
        setPhotos(prev => [...prev, ...newPhotos]);
        console.log(`Added ${newPhotos.length} photos to album`);
      }
    } catch (error) {
      console.log('Error picking images:', error);
      Alert.alert('Error', 'Failed to pick images. Please try again.');
    }
  };

  const removePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const updatePhotoName = (photoId: string, newName: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, name: newName } : photo
    ));
  };

  const createAlbum = () => {
    if (!albumTitle.trim()) {
      Alert.alert('Error', 'Please enter an album title');
      return;
    }
    
    if (photos.length < 3) {
      Alert.alert('Error', 'Please add at least 3 photos to create an album');
      return;
    }
    
    if (!albumPrice.trim() || isNaN(Number(albumPrice))) {
      Alert.alert('Error', 'Please enter a valid price in RWF');
      return;
    }

    const album = {
      title: albumTitle.trim(),
      description: albumDescription.trim(),
      photos,
      price: Number(albumPrice),
    };

    onAlbumCreate(album);
    
    // Reset form
    setPhotos([]);
    setAlbumTitle('');
    setAlbumDescription('');
    setAlbumPrice('');
    
    Alert.alert('Success', 'Album created successfully!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Photo Album</Text>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Album Title *</Text>
          <TextInput
            style={styles.input}
            value={albumTitle}
            onChangeText={setAlbumTitle}
            placeholder="Enter album title..."
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={albumDescription}
            onChangeText={setAlbumDescription}
            placeholder="Describe your photo album..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Price (RWF) *</Text>
          <TextInput
            style={styles.input}
            value={albumPrice}
            onChangeText={setAlbumPrice}
            placeholder="Enter price in Rwandan Francs..."
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.photoSection}>
          <Text style={styles.label}>Photos ({photos.length})</Text>
          
          <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
            <IconSymbol name="plus.circle.fill" size={24} color={colors.background} />
            <Text style={styles.uploadButtonText}>Add Photos</Text>
          </TouchableOpacity>
          
          {photos.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
              {photos.map((photo, index) => (
                <View key={photo.id} style={styles.photoItem}>
                  <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
                  <TextInput
                    style={styles.photoNameInput}
                    value={photo.name}
                    onChangeText={(text) => updatePhotoName(photo.id, text)}
                    placeholder="Photo name..."
                    placeholderTextColor={colors.textSecondary}
                  />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePhoto(photo.id)}
                  >
                    <IconSymbol name="xmark.circle.fill" size={20} color={colors.accent} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        
        {photos.length >= 3 && (
          <TouchableOpacity
            style={[styles.createButton, isUploading && styles.disabledButton]}
            onPress={createAlbum}
            disabled={isUploading}
          >
            <Text style={styles.createButtonText}>
              {isUploading ? 'Creating Album...' : 'Create Album'}
            </Text>
          </TouchableOpacity>
        )}
        
        {photos.length > 0 && photos.length < 3 && (
          <Text style={styles.warningText}>
            Add at least {3 - photos.length} more photo{3 - photos.length !== 1 ? 's' : ''} to create an album
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Extra space for floating tab bar
  },
  title: {
    ...commonStyles.title,
    marginBottom: 30,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    ...commonStyles.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    ...commonStyles.input,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  photoSection: {
    marginBottom: 30,
  },
  uploadButton: {
    ...commonStyles.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  uploadButtonText: {
    ...commonStyles.buttonText,
  },
  photoScroll: {
    marginVertical: 12,
  },
  photoItem: {
    marginRight: 12,
    alignItems: 'center',
    position: 'relative',
  },
  photoPreview: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  photoNameInput: {
    ...commonStyles.input,
    width: width * 0.25,
    fontSize: 12,
    padding: 6,
    marginTop: 4,
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  createButton: {
    ...commonStyles.button,
    backgroundColor: colors.accent,
    paddingVertical: 16,
  },
  createButtonText: {
    ...commonStyles.buttonText,
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.6,
  },
  warningText: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 16,
  },
});
