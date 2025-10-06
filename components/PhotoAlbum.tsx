
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

const { width } = Dimensions.get('window');

interface Photo {
  id: string;
  uri: string;
  name: string;
}

interface PhotoAlbumProps {
  album: {
    id: string;
    title: string;
    description: string;
    photos: Photo[];
    price: number;
    isPurchased: boolean;
  };
  onPurchase: (albumId: string) => void;
}

export default function PhotoAlbum({ album, onPurchase }: PhotoAlbumProps) {
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  
  const previewPhotos = album.photos.slice(0, 3);
  const remainingPhotos = album.photos.slice(3);
  
  const handleViewMore = () => {
    if (album.isPurchased) {
      // Show all photos
      console.log('Showing all photos for purchased album');
    } else {
      setShowPaymentPrompt(true);
    }
  };

  const handlePurchase = () => {
    Alert.alert(
      'Purchase Album',
      `Purchase "${album.title}" for ${album.price} RWF?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Purchase',
          onPress: () => {
            onPurchase(album.id);
            setShowPaymentPrompt(false);
          },
        },
      ]
    );
  };

  const renderPhoto = (photo: Photo, index: number) => (
    <View key={photo.id} style={styles.photoContainer}>
      <Image source={{ uri: photo.uri }} style={styles.photo} />
      <Text style={styles.photoName}>{photo.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.albumTitle}>{album.title}</Text>
      <Text style={styles.albumDescription}>{album.description}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
        {previewPhotos.map((photo, index) => renderPhoto(photo, index))}
      </ScrollView>
      
      <Text style={styles.previewText}>
        {album.isPurchased ? 'All Photos' : `Preview (${previewPhotos.length} of ${album.photos.length} photos)`}
      </Text>
      
      {!album.isPurchased && (
        <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
          <IconSymbol name="lock.fill" size={20} color={colors.background} />
          <Text style={styles.viewMoreText}>
            View All {album.photos.length} Photos - {album.price} RWF
          </Text>
        </TouchableOpacity>
      )}
      
      {album.isPurchased && remainingPhotos.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
          {remainingPhotos.map((photo, index) => renderPhoto(photo, index + 3))}
        </ScrollView>
      )}
      
      {showPaymentPrompt && (
        <View style={styles.paymentPrompt}>
          <View style={styles.paymentCard}>
            <Text style={styles.paymentTitle}>Unlock Full Album</Text>
            <Text style={styles.paymentDescription}>
              Get access to all {album.photos.length} high-quality photos in this album.
            </Text>
            <Text style={styles.priceText}>{album.price} RWF</Text>
            
            <View style={styles.paymentButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowPaymentPrompt(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.purchaseButton]}
                onPress={handlePurchase}
              >
                <Text style={styles.purchaseButtonText}>Purchase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.card,
    marginHorizontal: 16,
  },
  albumTitle: {
    ...commonStyles.subtitle,
    textAlign: 'left',
    marginBottom: 8,
  },
  albumDescription: {
    ...commonStyles.textSecondary,
    marginBottom: 16,
  },
  photoScroll: {
    marginVertical: 12,
  },
  photoContainer: {
    marginRight: 12,
    alignItems: 'center',
  },
  photo: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  photoName: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    maxWidth: width * 0.3,
  },
  previewText: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    marginVertical: 8,
  },
  viewMoreButton: {
    ...commonStyles.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  viewMoreText: {
    ...commonStyles.buttonText,
  },
  paymentPrompt: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  paymentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    margin: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  paymentTitle: {
    ...commonStyles.subtitle,
    marginBottom: 12,
  },
  paymentDescription: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  paymentButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  purchaseButton: {
    backgroundColor: colors.primary,
  },
  purchaseButtonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});
