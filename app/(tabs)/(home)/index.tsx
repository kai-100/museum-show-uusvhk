
import React, { useState } from "react";
import { Stack } from "expo-router";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Platform,
  Alert 
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import PhotoAlbum from "@/components/PhotoAlbum";
import PhotoUploader from "@/components/PhotoUploader";

interface Album {
  id: string;
  title: string;
  description: string;
  photos: Array<{
    id: string;
    uri: string;
    name: string;
  }>;
  price: number;
  isPurchased: boolean;
}

export default function HomeScreen() {
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: 'sample_1',
      title: 'Nature Collection',
      description: 'Beautiful landscapes and wildlife photography from Rwanda',
      photos: [
        {
          id: 'photo_1',
          uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          name: 'Mountain Vista'
        },
        {
          id: 'photo_2', 
          uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
          name: 'Forest Path'
        },
        {
          id: 'photo_3',
          uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          name: 'Lake Reflection'
        },
        {
          id: 'photo_4',
          uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
          name: 'Sunset Valley'
        },
        {
          id: 'photo_5',
          uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          name: 'Wildlife Safari'
        }
      ],
      price: 5000,
      isPurchased: false,
    },
    {
      id: 'sample_2',
      title: 'Urban Architecture',
      description: 'Modern cityscapes and architectural marvels',
      photos: [
        {
          id: 'photo_6',
          uri: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
          name: 'City Skyline'
        },
        {
          id: 'photo_7',
          uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
          name: 'Modern Building'
        },
        {
          id: 'photo_8',
          uri: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
          name: 'Street Art'
        },
        {
          id: 'photo_9',
          uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
          name: 'Bridge Design'
        }
      ],
      price: 3500,
      isPurchased: true,
    }
  ]);
  
  const [showUploader, setShowUploader] = useState(false);

  const handleAlbumCreate = (newAlbum: Omit<Album, 'id' | 'isPurchased'>) => {
    const album: Album = {
      ...newAlbum,
      id: `album_${Date.now()}`,
      isPurchased: false,
    };
    
    setAlbums(prev => [album, ...prev]);
    setShowUploader(false);
    console.log('New album created:', album.title);
  };

  const handlePurchase = (albumId: string) => {
    setAlbums(prev => prev.map(album => 
      album.id === albumId 
        ? { ...album, isPurchased: true }
        : album
    ));
    
    Alert.alert(
      'Purchase Successful!', 
      'You now have access to all photos in this album.',
      [{ text: 'OK' }]
    );
    console.log('Album purchased:', albumId);
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => setShowUploader(!showUploader)}
      style={[commonStyles.headerButton, showUploader && styles.activeButton]}
    >
      <IconSymbol 
        name={showUploader ? "xmark" : "plus"} 
        color={showUploader ? colors.background : colors.primary} 
        size={20}
      />
    </TouchableOpacity>
  );

  const renderHeaderLeft = () => (
    <TouchableOpacity
      onPress={() => Alert.alert(
        "Museum Show", 
        "Welcome to Museum Show!\n\n📸 Upload photo albums\n💰 Set your prices in RWF\n👥 Let users preview 3 photos\n🔒 They pay to see the full collection\n\nTap the + button to create your first album!"
      )}
      style={commonStyles.headerButton}
    >
      <IconSymbol
        name="info.circle"
        color={colors.primary}
        size={20}
      />
    </TouchableOpacity>
  );

  const totalRevenue = albums
    .filter(album => album.isPurchased)
    .reduce((sum, album) => sum + album.price, 0);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Museum Show",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontFamily: 'monospace',
              fontWeight: 'bold',
            },
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
          }}
        />
      )}
      
      <View style={styles.container}>
        {showUploader ? (
          <PhotoUploader onAlbumCreate={handleAlbumCreate} />
        ) : (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Museum Show</Text>
              <Text style={styles.subtitle}>
                Create & Monetize Your Photo Albums
              </Text>
              
              {!showUploader && (
                <TouchableOpacity
                  style={styles.createAlbumButton}
                  onPress={() => setShowUploader(true)}
                >
                  <IconSymbol name="plus.circle.fill" size={24} color={colors.background} />
                  <Text style={styles.createAlbumButtonText}>Create New Album</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {albums.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="photo.stack" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyTitle}>No Albums Yet</Text>
                <Text style={styles.emptyDescription}>
                  Start by creating your first photo album.{'\n'}
                  Upload photos, set a price, and start earning!
                </Text>
                <TouchableOpacity
                  style={styles.createFirstButton}
                  onPress={() => setShowUploader(true)}
                >
                  <IconSymbol name="camera.fill" size={20} color={colors.background} />
                  <Text style={styles.createFirstButtonText}>Create First Album</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{albums.length}</Text>
                    <Text style={styles.statLabel}>Albums</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {albums.filter(a => a.isPurchased).length}
                    </Text>
                    <Text style={styles.statLabel}>Sold</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {albums.reduce((sum, album) => sum + album.photos.length, 0)}
                    </Text>
                    <Text style={styles.statLabel}>Photos</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {totalRevenue.toLocaleString()}
                    </Text>
                    <Text style={styles.statLabel}>RWF Earned</Text>
                  </View>
                </View>
                
                <View style={styles.albumsHeader}>
                  <Text style={styles.albumsTitle}>Your Albums</Text>
                  <Text style={styles.albumsSubtitle}>
                    Users can preview 3 photos before purchasing
                  </Text>
                </View>
                
                {albums.map((album) => (
                  <PhotoAlbum
                    key={album.id}
                    album={album}
                    onPurchase={handlePurchase}
                  />
                ))}
                
                <View style={styles.howItWorks}>
                  <Text style={styles.howItWorksTitle}>How It Works:</Text>
                  <View style={styles.stepContainer}>
                    <View style={styles.step}>
                      <Text style={styles.stepNumber}>1</Text>
                      <Text style={styles.stepText}>Upload photos & set price</Text>
                    </View>
                    <View style={styles.step}>
                      <Text style={styles.stepNumber}>2</Text>
                      <Text style={styles.stepText}>Users see 3 preview photos</Text>
                    </View>
                    <View style={styles.step}>
                      <Text style={styles.stepNumber}>3</Text>
                      <Text style={styles.stepText}>They pay to unlock all photos</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Extra space for floating tab bar
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    ...commonStyles.title,
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  createAlbumButton: {
    ...commonStyles.button,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  createAlbumButtonText: {
    ...commonStyles.buttonText,
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: 'monospace',
  },
  statLabel: {
    ...commonStyles.textSecondary,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  albumsHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  albumsTitle: {
    ...commonStyles.subtitle,
    textAlign: 'left',
    marginBottom: 4,
  },
  albumsSubtitle: {
    ...commonStyles.textSecondary,
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyTitle: {
    ...commonStyles.subtitle,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyDescription: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  createFirstButton: {
    ...commonStyles.button,
    backgroundColor: colors.accent,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  createFirstButtonText: {
    ...commonStyles.buttonText,
    fontSize: 16,
  },
  howItWorks: {
    margin: 20,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  howItWorksTitle: {
    ...commonStyles.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.primary,
  },
  stepContainer: {
    gap: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    backgroundColor: colors.primary,
    color: colors.background,
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  stepText: {
    ...commonStyles.textSecondary,
    fontSize: 14,
    flex: 1,
  },
});
