
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
  Modal,
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
    owner: string;
  }) => void;
}

const ALBUM_OWNERS = ['Allan', 'Ganza', 'Paci', 'Beda', 'Sanyu', 'Other'];

export default function PhotoUploader({ onAlbumCreate }: PhotoUploaderProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDescription, setAlbumDescription] = useState('');
  const [albumPrice, setAlbumPrice] = useState('');
  const [albumOwner, setAlbumOwner] = useState('');
  const [customOwner, setCustomOwner] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [bulkUploadProgress, setBulkUploadProgress] = useState(0);

  const pickImages = async () => {
    try {
      // Request permission first
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow access to your photo library to upload images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 50, // Increased limit for bulk uploads
      });

      if (!result.canceled && result.assets) {
        const newPhotos: Photo[] = result.assets.map((asset, index) => ({
          id: `photo_${Date.now()}_${index}`,
          uri: asset.uri,
          name: `Photo ${photos.length + index + 1}`,
        }));
        
        setPhotos(prev => [...prev, ...newPhotos]);
        console.log(`Added ${newPhotos.length} photos to album`);
        
        // Show success message
        Alert.alert(
          'Photos Added!', 
          `Successfully added ${newPhotos.length} photo${newPhotos.length !== 1 ? 's' : ''} to your album.`
        );
      }
    } catch (error) {
      console.log('Error picking images:', error);
      Alert.alert('Error', 'Failed to pick images. Please try again.');
    }
  };

  const bulkUploadImages = async () => {
    try {
      setShowBulkUploadModal(true);
      setBulkUploadProgress(0);

      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow access to your photo library to upload images.');
        setShowBulkUploadModal(false);
        return;
      }

      // Simulate bulk upload process with progress
      setBulkUploadProgress(25);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 50,
      });

      setBulkUploadProgress(50);

      if (!result.canceled && result.assets) {
        setBulkUploadProgress(75);
        
        const newPhotos: Photo[] = result.assets.map((asset, index) => ({
          id: `bulk_photo_${Date.now()}_${index}`,
          uri: asset.uri,
          name: `Bulk Photo ${photos.length + index + 1}`,
        }));
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPhotos(prev => [...prev, ...newPhotos]);
        setBulkUploadProgress(100);
        
        setTimeout(() => {
          setShowBulkUploadModal(false);
          setBulkUploadProgress(0);
          
          Alert.alert(
            'Bulk Upload Complete!', 
            `Successfully uploaded ${newPhotos.length} photos. You can now organize them and create your album.`
          );
        }, 500);
        
        console.log(`Bulk uploaded ${newPhotos.length} photos`);
      } else {
        setShowBulkUploadModal(false);
        setBulkUploadProgress(0);
      }
    } catch (error) {
      console.log('Error bulk uploading images:', error);
      setShowBulkUploadModal(false);
      setBulkUploadProgress(0);
      Alert.alert('Error', 'Failed to bulk upload images. Please try again.');
    }
  };

  const takePhoto = async () => {
    try {
      // Request camera permission
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow camera access to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const newPhoto: Photo = {
          id: `photo_${Date.now()}`,
          uri: result.assets[0].uri,
          name: `Photo ${photos.length + 1}`,
        };
        
        setPhotos(prev => [...prev, newPhoto]);
        console.log('Photo taken and added to album');
        
        Alert.alert('Photo Added!', 'Your photo has been added to the album.');
      }
    } catch (error) {
      console.log('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const removePhoto = (photoId: string) => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPhotos(prev => prev.filter(photo => photo.id !== photoId));
            console.log('Photo removed from album');
          },
        },
      ]
    );
  };

  const updatePhotoName = (photoId: string, newName: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, name: newName } : photo
    ));
  };

  const autoNamePhotos = () => {
    Alert.alert(
      'Auto-Name Photos',
      'Choose a naming pattern for your photos:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sequential (Photo 1, Photo 2...)',
          onPress: () => {
            setPhotos(prev => prev.map((photo, index) => ({
              ...photo,
              name: `Photo ${index + 1}`
            })));
          }
        },
        {
          text: 'Album-based',
          onPress: () => {
            const albumName = albumTitle || 'Album';
            setPhotos(prev => prev.map((photo, index) => ({
              ...photo,
              name: `${albumName} ${index + 1}`
            })));
          }
        }
      ]
    );
  };

  const reorderPhotos = (fromIndex: number, toIndex: number) => {
    const newPhotos = [...photos];
    const [movedPhoto] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, movedPhoto);
    setPhotos(newPhotos);
  };

  const createAlbum = async () => {
    if (!albumTitle.trim()) {
      Alert.alert('Missing Title', 'Please enter an album title to continue.');
      return;
    }

    if (!albumOwner) {
      Alert.alert('Missing Owner', 'Please select who this album belongs to.');
      return;
    }

    if (albumOwner === 'Other' && !customOwner.trim()) {
      Alert.alert('Missing Owner Name', 'Please enter the owner\'s name.');
      return;
    }
    
    if (photos.length < 3) {
      Alert.alert(
        'Not Enough Photos', 
        `You need at least 3 photos to create an album. Please add ${3 - photos.length} more photo${3 - photos.length !== 1 ? 's' : ''}.`
      );
      return;
    }
    
    if (!albumPrice.trim() || isNaN(Number(albumPrice)) || Number(albumPrice) <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price in RWF (must be greater than 0).');
      return;
    }

    setIsUploading(true);
    
    try {
      const finalOwner = albumOwner === 'Other' ? customOwner.trim() : albumOwner;
      
      const album = {
        title: albumTitle.trim(),
        description: albumDescription.trim(),
        photos,
        price: Number(albumPrice),
        owner: finalOwner,
      };

      // Simulate upload delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      onAlbumCreate(album);
      
      // Reset form
      setPhotos([]);
      setAlbumTitle('');
      setAlbumDescription('');
      setAlbumPrice('');
      setAlbumOwner('');
      setCustomOwner('');
      
      Alert.alert(
        'Album Created!', 
        `"${album.title}" has been successfully created for ${finalOwner} with ${album.photos.length} photos. Users can preview 2 photos and pay ${album.price} RWF for full access.`
      );
    } catch (error) {
      console.log('Error creating album:', error);
      Alert.alert('Error', 'Failed to create album. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to clear all photos and form data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            setPhotos([]);
            setAlbumTitle('');
            setAlbumDescription('');
            setAlbumPrice('');
            setAlbumOwner('');
            setCustomOwner('');
            console.log('Form cleared');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Photo Album</Text>
          <Text style={styles.subtitle}>
            Upload organized photos and set a price for users to access the collection
          </Text>
        </View>

        {/* Folder Upload Simulation Section */}
        <View style={styles.folderUploadSection}>
          <Text style={styles.sectionTitle}>📁 Folder-Style Upload</Text>
          <Text style={styles.sectionDescription}>
            Simulate uploading organized image folders from your PC
          </Text>
          
          <View style={styles.uploadButtons}>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
              <IconSymbol name="photo.stack" size={24} color={colors.background} />
              <Text style={styles.uploadButtonText}>Select Multiple Images</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.uploadButton, styles.bulkUploadButton]} 
              onPress={bulkUploadImages}
            >
              <IconSymbol name="folder.badge.plus" size={24} color={colors.background} />
              <Text style={styles.uploadButtonText}>Bulk Upload (50 max)</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.uploadButton, styles.cameraButton]} onPress={takePhoto}>
            <IconSymbol name="camera.fill" size={24} color={colors.background} />
            <Text style={styles.uploadButtonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Album Owner *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ownerScroll}>
            {ALBUM_OWNERS.map((owner) => (
              <TouchableOpacity
                key={owner}
                style={[
                  styles.ownerButton,
                  albumOwner === owner && styles.ownerButtonSelected
                ]}
                onPress={() => setAlbumOwner(owner)}
              >
                <Text style={[
                  styles.ownerButtonText,
                  albumOwner === owner && styles.ownerButtonTextSelected
                ]}>
                  {owner}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {albumOwner === 'Other' && (
            <TextInput
              style={styles.input}
              value={customOwner}
              onChangeText={setCustomOwner}
              placeholder="Enter owner's name..."
              placeholderTextColor={colors.textSecondary}
              maxLength={30}
            />
          )}
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Album Title *</Text>
          <TextInput
            style={styles.input}
            value={albumTitle}
            onChangeText={setAlbumTitle}
            placeholder="Enter a catchy album title..."
            placeholderTextColor={colors.textSecondary}
            maxLength={50}
          />
          <Text style={styles.charCount}>{albumTitle.length}/50</Text>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={albumDescription}
            onChangeText={setAlbumDescription}
            placeholder="Describe what makes this album special..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
          <Text style={styles.charCount}>{albumDescription.length}/200</Text>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Price (RWF) *</Text>
          <TextInput
            style={styles.input}
            value={albumPrice}
            onChangeText={setAlbumPrice}
            placeholder="Enter price in Rwandan Francs (e.g., 3000)..."
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
          />
          {albumPrice && !isNaN(Number(albumPrice)) && Number(albumPrice) > 0 && (
            <Text style={styles.pricePreview}>
              Users will pay {Number(albumPrice).toLocaleString()} RWF to access all photos
            </Text>
          )}
        </View>
        
        <View style={styles.photoSection}>
          <View style={styles.photoSectionHeader}>
            <Text style={styles.label}>
              Photos ({photos.length}) {photos.length >= 3 ? '✓' : `- Need ${3 - photos.length} more`}
            </Text>
            {photos.length > 0 && (
              <TouchableOpacity onPress={autoNamePhotos} style={styles.autoNameButton}>
                <IconSymbol name="wand.and.stars" size={16} color={colors.primary} />
                <Text style={styles.autoNameText}>Auto-Name</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {photos.length > 0 && (
            <>
              <View style={styles.photoHeader}>
                <Text style={styles.photoCount}>
                  {photos.length} photo{photos.length !== 1 ? 's' : ''} added
                </Text>
                <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
              </View>
              
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
                      maxLength={30}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removePhoto(photo.id)}
                    >
                      <IconSymbol name="xmark.circle.fill" size={20} color={colors.accent} />
                    </TouchableOpacity>
                    <View style={styles.photoIndexContainer}>
                      <Text style={styles.photoIndex}>{index + 1}</Text>
                      {index < 2 && (
                        <Text style={styles.freeLabel}>FREE</Text>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </View>
        
        {photos.length >= 3 && albumTitle.trim() && albumPrice.trim() && albumOwner && 
         (albumOwner !== 'Other' || customOwner.trim()) && (
          <TouchableOpacity
            style={[styles.createButton, isUploading && styles.disabledButton]}
            onPress={createAlbum}
            disabled={isUploading}
          >
            <IconSymbol 
              name={isUploading ? "arrow.clockwise" : "checkmark.circle.fill"} 
              size={20} 
              color={colors.background} 
            />
            <Text style={styles.createButtonText}>
              {isUploading ? 'Creating Album...' : 'Create Album'}
            </Text>
          </TouchableOpacity>
        )}
        
        {photos.length > 0 && photos.length < 3 && (
          <View style={styles.warningContainer}>
            <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.accent} />
            <Text style={styles.warningText}>
              Add at least {3 - photos.length} more photo{3 - photos.length !== 1 ? 's' : ''} to create an album
            </Text>
          </View>
        )}
        
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>💡 Folder Upload Simulation Tips:</Text>
          <Text style={styles.helpText}>• Use "Bulk Upload" to select up to 50 images at once</Text>
          <Text style={styles.helpText}>• Organize photos by naming them systematically</Text>
          <Text style={styles.helpText}>• Use "Auto-Name" to quickly rename all photos</Text>
          <Text style={styles.helpText}>• First 2 photos will be free previews</Text>
          <Text style={styles.helpText}>• Consider creating a web interface for true folder uploads</Text>
          <Text style={styles.helpText}>• Set competitive prices (typical range: 2000-5000 RWF)</Text>
        </View>

        <View style={styles.webInterfaceInfo}>
          <Text style={styles.webInterfaceTitle}>🌐 Future Web Interface</Text>
          <Text style={styles.webInterfaceText}>
            For true folder uploads from your PC, consider creating a web interface that can:
          </Text>
          <Text style={styles.helpText}>• Accept drag-and-drop folder uploads</Text>
          <Text style={styles.helpText}>• Preserve folder structure and organization</Text>
          <Text style={styles.helpText}>• Batch process multiple albums at once</Text>
          <Text style={styles.helpText}>• Sync with this mobile app via Supabase</Text>
        </View>
      </View>

      {/* Bulk Upload Progress Modal */}
      <Modal
        visible={showBulkUploadModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.progressModal}>
            <IconSymbol name="folder.badge.plus" size={48} color={colors.primary} />
            <Text style={styles.progressTitle}>Bulk Uploading Photos</Text>
            <Text style={styles.progressText}>Processing your images...</Text>
            
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${bulkUploadProgress}%` }]} />
            </View>
            
            <Text style={styles.progressPercentage}>{bulkUploadProgress}%</Text>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 120, // Extra space for floating tab bar
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    ...commonStyles.title,
    marginBottom: 8,
  },
  subtitle: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    fontSize: 14,
  },
  folderUploadSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  sectionTitle: {
    ...commonStyles.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.accent,
  },
  sectionDescription: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    marginBottom: 16,
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
  ownerScroll: {
    marginBottom: 8,
  },
  ownerButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  ownerButtonSelected: {
    backgroundColor: colors.primary,
  },
  ownerButtonText: {
    ...commonStyles.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  ownerButtonTextSelected: {
    color: colors.background,
  },
  input: {
    ...commonStyles.input,
    marginVertical: 0,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  pricePreview: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    marginTop: 4,
    color: colors.accent,
  },
  photoSection: {
    marginBottom: 30,
  },
  photoSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  autoNameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  autoNameText: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    color: colors.primary,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  uploadButton: {
    ...commonStyles.button,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 0,
  },
  bulkUploadButton: {
    backgroundColor: colors.accent,
  },
  cameraButton: {
    backgroundColor: colors.secondary,
    marginBottom: 16,
  },
  uploadButtonText: {
    ...commonStyles.buttonText,
    fontSize: 14,
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  photoCount: {
    ...commonStyles.text,
    fontSize: 14,
    color: colors.accent,
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    textDecorationLine: 'underline',
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
    marginVertical: 0,
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  photoIndexContainer: {
    position: 'absolute',
    top: 4,
    left: 4,
    alignItems: 'center',
  },
  photoIndex: {
    backgroundColor: colors.background,
    color: colors.accent,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'monospace',
  },
  freeLabel: {
    backgroundColor: colors.accent,
    color: colors.background,
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 3,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  createButton: {
    ...commonStyles.button,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonText: {
    ...commonStyles.buttonText,
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.6,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  warningText: {
    ...commonStyles.textSecondary,
    fontStyle: 'italic',
    flex: 1,
  },
  helpSection: {
    marginTop: 30,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  helpTitle: {
    ...commonStyles.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.primary,
  },
  helpText: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  webInterfaceInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  webInterfaceTitle: {
    ...commonStyles.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.accent,
  },
  webInterfaceText: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressModal: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    minWidth: width * 0.8,
  },
  progressTitle: {
    ...commonStyles.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  progressText: {
    ...commonStyles.textSecondary,
    marginBottom: 24,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressPercentage: {
    ...commonStyles.text,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.accent,
  },
});
