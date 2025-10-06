
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
      style={commonStyles.headerButton}
    >
      <IconSymbol 
        name={showUploader ? "xmark" : "plus"} 
        color={colors.primary} 
        size={20}
      />
    </TouchableOpacity>
  );

  const renderHeaderLeft = () => (
    <TouchableOpacity
      onPress={() => Alert.alert("Museum Show", "Welcome to Museum Show - Upload and monetize your photo albums!")}
      style={commonStyles.headerButton}
    >
      <IconSymbol
        name="info.circle"
        color={colors.primary}
        size={20}
      />
    </TouchableOpacity>
  );

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
                Discover & Purchase Premium Photo Albums
              </Text>
            </View>
            
            {albums.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="photo.stack" size={64} color={colors.textSecondary} />
                <Text style={styles.emptyTitle}>No Albums Yet</Text>
                <Text style={styles.emptyDescription}>
                  Create your first photo album to get started
                </Text>
                <TouchableOpacity
                  style={styles.createFirstButton}
                  onPress={() => setShowUploader(true)}
                >
                  <Text style={styles.createFirstButtonText}>Create Album</Text>
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
                    <Text style={styles.statLabel}>Purchased</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {albums.reduce((sum, album) => sum + album.photos.length, 0)}
                    </Text>
                    <Text style={styles.statLabel}>Photos</Text>
                  </View>
                </View>
                
                {albums.map((album) => (
                  <PhotoAlbum
                    key={album.id}
                    album={album}
                    onPurchase={handlePurchase}
                  />
                ))}
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
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: 'monospace',
  },
  statLabel: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    marginTop: 4,
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
  },
  createFirstButton: {
    ...commonStyles.button,
    backgroundColor: colors.accent,
    paddingHorizontal: 30,
  },
  createFirstButtonText: {
    ...commonStyles.buttonText,
    fontSize: 16,
  },
});
