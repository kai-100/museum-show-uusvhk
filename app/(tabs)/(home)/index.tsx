
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
  owner: string;
}

export default function HomeScreen() {
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: 'allan_album',
      title: 'Allan\'s Collection',
      description: 'Exclusive photos from Allan\'s adventures and memories',
      owner: 'Allan',
      photos: [
        {
          id: 'allan_photo_1',
          uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          name: 'Allan Portrait 1'
        },
        {
          id: 'allan_photo_2', 
          uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
          name: 'Allan Portrait 2'
        },
        {
          id: 'allan_photo_3',
          uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          name: 'Allan Adventure 1'
        },
        {
          id: 'allan_photo_4',
          uri: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
          name: 'Allan Adventure 2'
        },
        {
          id: 'allan_photo_5',
          uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
          name: 'Allan Memory'
        }
      ],
      price: 3000,
      isPurchased: false,
    },
    {
      id: 'ganza_album',
      title: 'Ganza\'s Gallery',
      description: 'Beautiful moments captured by Ganza',
      owner: 'Ganza',
      photos: [
        {
          id: 'ganza_photo_1',
          uri: 'https://images.unsplash.com/photo-1494790108755-2616c27b1e2d?w=400',
          name: 'Ganza Portrait 1'
        },
        {
          id: 'ganza_photo_2',
          uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
          name: 'Ganza Portrait 2'
        },
        {
          id: 'ganza_photo_3',
          uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
          name: 'Ganza Style 1'
        },
        {
          id: 'ganza_photo_4',
          uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
          name: 'Ganza Style 2'
        },
        {
          id: 'ganza_photo_5',
          uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
          name: 'Ganza Memory'
        },
        {
          id: 'ganza_photo_6',
          uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
          name: 'Ganza Special'
        }
      ],
      price: 2500,
      isPurchased: false,
    },
    {
      id: 'paci_album',
      title: 'Paci\'s Portfolio',
      description: 'Paci\'s creative and artistic photo collection',
      owner: 'Paci',
      photos: [
        {
          id: 'paci_photo_1',
          uri: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400',
          name: 'Paci Creative 1'
        },
        {
          id: 'paci_photo_2',
          uri: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400',
          name: 'Paci Creative 2'
        },
        {
          id: 'paci_photo_3',
          uri: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400',
          name: 'Paci Art 1'
        },
        {
          id: 'paci_photo_4',
          uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
          name: 'Paci Art 2'
        },
        {
          id: 'paci_photo_5',
          uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
          name: 'Paci Vision'
        }
      ],
      price: 4000,
      isPurchased: false,
    },
    {
      id: 'beda_album',
      title: 'Beda\'s Moments',
      description: 'Special moments and experiences from Beda\'s life',
      owner: 'Beda',
      photos: [
        {
          id: 'beda_photo_1',
          uri: 'https://images.unsplash.com/photo-1522075469751-3847ae2c4c1c?w=400',
          name: 'Beda Moment 1'
        },
        {
          id: 'beda_photo_2',
          uri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400',
          name: 'Beda Moment 2'
        },
        {
          id: 'beda_photo_3',
          uri: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400',
          name: 'Beda Experience 1'
        },
        {
          id: 'beda_photo_4',
          uri: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
          name: 'Beda Experience 2'
        },
        {
          id: 'beda_photo_5',
          uri: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400',
          name: 'Beda Journey'
        },
        {
          id: 'beda_photo_6',
          uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          name: 'Beda Adventure'
        },
        {
          id: 'beda_photo_7',
          uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
          name: 'Beda Memory'
        }
      ],
      price: 3500,
      isPurchased: false,
    },
    {
      id: 'sanyu_album',
      title: 'Sanyu\'s Stories',
      description: 'Captivating stories told through Sanyu\'s photography',
      owner: 'Sanyu',
      photos: [
        {
          id: 'sanyu_photo_1',
          uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
          name: 'Sanyu Story 1'
        },
        {
          id: 'sanyu_photo_2',
          uri: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
          name: 'Sanyu Story 2'
        },
        {
          id: 'sanyu_photo_3',
          uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
          name: 'Sanyu Tale 1'
        },
        {
          id: 'sanyu_photo_4',
          uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
          name: 'Sanyu Tale 2'
        },
        {
          id: 'sanyu_photo_5',
          uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
          name: 'Sanyu Chronicle'
        },
        {
          id: 'sanyu_photo_6',
          uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
          name: 'Sanyu Narrative'
        }
      ],
      price: 2800,
      isPurchased: false,
    }
  ]);
  
  const [showUploader, setShowUploader] = useState(false);

  const handleAlbumCreate = (newAlbum: Omit<Album, 'id' | 'isPurchased' | 'owner'>) => {
    const album: Album = {
      ...newAlbum,
      id: `album_${Date.now()}`,
      isPurchased: false,
      owner: 'Admin',
    };
    
    setAlbums(prev => [album, ...prev]);
    setShowUploader(false);
    console.log('New album created:', album.title);
  };

  const handlePurchase = (albumId: string) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    setAlbums(prev => prev.map(album => 
      album.id === albumId 
        ? { ...album, isPurchased: true }
        : album
    ));
    
    Alert.alert(
      'Purchase Successful!', 
      `You now have access to all ${album.photos.length} photos in ${album.owner}'s album.`,
      [{ text: 'OK' }]
    );
    console.log('Album purchased:', albumId, 'Owner:', album.owner);
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
        "Welcome to Museum Show!\n\n👥 Browse personal photo albums\n💰 Prices in RWF\n👀 Preview 2 photos for free\n🔒 Pay to unlock full collections\n\nEach person has their own exclusive album!"
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

  const totalPhotos = albums.reduce((sum, album) => sum + album.photos.length, 0);
  const soldAlbums = albums.filter(a => a.isPurchased).length;

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
                Personal Photo Collections
              </Text>
              <Text style={styles.description}>
                Explore exclusive albums from Allan, Ganza, Paci, Beda & Sanyu
              </Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{albums.length}</Text>
                <Text style={styles.statLabel}>Albums</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{soldAlbums}</Text>
                <Text style={styles.statLabel}>Purchased</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalPhotos}</Text>
                <Text style={styles.statLabel}>Total Photos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {totalRevenue.toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>RWF Earned</Text>
              </View>
            </View>
            
            <View style={styles.albumsHeader}>
              <Text style={styles.albumsTitle}>Personal Collections</Text>
              <Text style={styles.albumsSubtitle}>
                Preview 2 photos free • Pay to unlock full album
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
                  <Text style={styles.stepText}>Browse personal albums by name</Text>
                </View>
                <View style={styles.step}>
                  <Text style={styles.stepNumber}>2</Text>
                  <Text style={styles.stepText}>View 2 preview photos for free</Text>
                </View>
                <View style={styles.step}>
                  <Text style={styles.stepNumber}>3</Text>
                  <Text style={styles.stepText}>Pay to unlock all photos in the album</Text>
                </View>
              </View>
            </View>

            {!showUploader && (
              <TouchableOpacity
                style={styles.createAlbumButton}
                onPress={() => setShowUploader(true)}
              >
                <IconSymbol name="plus.circle.fill" size={24} color={colors.background} />
                <Text style={styles.createAlbumButtonText}>Add New Album</Text>
              </TouchableOpacity>
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
    marginBottom: 8,
    color: colors.primary,
    fontWeight: 'bold',
  },
  description: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    fontSize: 14,
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
    marginHorizontal: 20,
    marginTop: 20,
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
