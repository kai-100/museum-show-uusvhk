
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
    owner?: string;
  };
  onPurchase: (albumId: string) => void;
}

export default function PhotoAlbum({ album, onPurchase }: PhotoAlbumProps) {
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  
  // Show only 2 free photos instead of 3
  const previewPhotos = album.photos.slice(0, 2);
  const remainingPhotos = album.photos.slice(2);
  
  const handleViewMore = () => {
    if (album.isPurchased) {
      // Show all photos
      console.log('Showing all photos for purchased album:', album.title);
    } else {
      setShowPaymentPrompt(true);
    }
  };

  const handlePurchase = () => {
    const ownerName = album.owner || 'this person';
    Alert.alert(
      'Purchase Album',
      `Purchase ${ownerName}'s album "${album.title}" for ${album.price} RWF?\n\nYou'll get access to all ${album.photos.length} photos.`,
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
      <View style={styles.albumHeader}>
        <Text style={styles.albumTitle}>{album.title}</Text>
        {album.owner && (
          <View style={styles.ownerBadge}>
            <IconSymbol name="person.circle.fill" size={16} color={colors.accent} />
            <Text style={styles.ownerText}>{album.owner}</Text>
          </View>
        )}
      </View>
      <Text style={styles.albumDescription}>{album.description}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
        {previewPhotos.map((photo, index) => renderPhoto(photo, index))}
      </ScrollView>
      
      <View style={styles.previewInfo}>
        <Text style={styles.previewText}>
          {album.isPurchased 
            ? `All ${album.photos.length} Photos Available` 
            : `Free Preview (${previewPhotos.length} of ${album.photos.length} photos)`
          }
        </Text>
        {!album.isPurchased && (
          <Text style={styles.lockedText}>
            {remainingPhotos.length} more photos locked 🔒
          </Text>
        )}
      </View>
      
      {!album.isPurchased && (
        <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
          <IconSymbol name="lock.fill" size={20} color={colors.background} />
          <Text style={styles.viewMoreText}>
            Unlock All {album.photos.length} Photos - {album.price} RWF
          </Text>
        </TouchableOpacity>
      )}
      
      {album.isPurchased && (
        <View style={styles.purchasedBanner}>
          <IconSymbol name="checkmark.circle.fill" size={20} color={colors.accent} />
          <Text style={styles.purchasedText}>Full Album Purchased</Text>
        </View>
      )}
      
      {album.isPurchased && remainingPhotos.length > 0 && (
        <>
          <Text style={styles.additionalPhotosTitle}>Additional Photos:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
            {remainingPhotos.map((photo, index) => renderPhoto(photo, index + 2))}
          </ScrollView>
        </>
      )}
      
      {showPaymentPrompt && (
        <View style={styles.paymentPrompt}>
          <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <IconSymbol name="lock.open.fill" size={32} color={colors.accent} />
              <Text style={styles.paymentTitle}>Unlock {album.owner}'s Album</Text>
            </View>
            
            <Text style={styles.paymentDescription}>
              Get exclusive access to all {album.photos.length} high-quality photos in {album.owner}'s personal collection.
            </Text>
            
            <View style={styles.benefitsContainer}>
              <View style={styles.benefit}>
                <IconSymbol name="photo.stack.fill" size={16} color={colors.primary} />
                <Text style={styles.benefitText}>{album.photos.length} exclusive photos</Text>
              </View>
              <View style={styles.benefit}>
                <IconSymbol name="arrow.down.circle.fill" size={16} color={colors.primary} />
                <Text style={styles.benefitText}>High-resolution downloads</Text>
              </View>
              <View style={styles.benefit}>
                <IconSymbol name="infinity" size={16} color={colors.primary} />
                <Text style={styles.benefitText}>Lifetime access</Text>
              </View>
            </View>
            
            <Text style={styles.priceText}>{album.price} RWF</Text>
            
            <View style={styles.paymentButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowPaymentPrompt(false)}
              >
                <Text style={styles.cancelButtonText}>Maybe Later</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.purchaseButton]}
                onPress={handlePurchase}
              >
                <IconSymbol name="creditcard.fill" size={16} color={colors.background} />
                <Text style={styles.purchaseButtonText}>Purchase Now</Text>
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
  albumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  albumTitle: {
    ...commonStyles.subtitle,
    textAlign: 'left',
    flex: 1,
  },
  ownerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  ownerText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: 'bold',
    fontFamily: 'monospace',
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
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  photoName: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    maxWidth: width * 0.35,
  },
  previewInfo: {
    alignItems: 'center',
    marginVertical: 8,
  },
  previewText: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    fontSize: 13,
  },
  lockedText: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    fontSize: 11,
    color: colors.accent,
    marginTop: 2,
  },
  viewMoreButton: {
    ...commonStyles.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.accent,
  },
  viewMoreText: {
    ...commonStyles.buttonText,
  },
  purchasedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 12,
  },
  purchasedText: {
    color: colors.accent,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  additionalPhotosTitle: {
    ...commonStyles.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: colors.primary,
  },
  paymentPrompt: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
    maxWidth: width * 0.9,
  },
  paymentHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentTitle: {
    ...commonStyles.subtitle,
    marginTop: 8,
    textAlign: 'center',
  },
  paymentDescription: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  benefitsContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  benefitText: {
    ...commonStyles.textSecondary,
    fontSize: 13,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  paymentButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
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
    fontSize: 14,
  },
  purchaseButton: {
    backgroundColor: colors.primary,
  },
  purchaseButtonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize: 14,
  },
});
