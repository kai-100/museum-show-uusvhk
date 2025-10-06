
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function WebUploadGuide() {
  const openSupabaseGuide = () => {
    Alert.alert(
      'Supabase Setup',
      'To enable true folder uploads from PC, you would need to:\n\n1. Set up a Supabase project\n2. Create a web interface\n3. Configure file storage\n4. Sync with this mobile app\n\nWould you like to learn more about Supabase?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Learn More',
          onPress: () => Linking.openURL('https://supabase.com/docs/guides/storage')
        }
      ]
    );
  };

  const showWebInterfaceExample = () => {
    Alert.alert(
      'Web Interface Example',
      'A web interface for folder uploads would include:\n\n• Drag & drop folder upload\n• Batch photo processing\n• Album organization tools\n• Price setting interface\n• Direct sync to mobile app\n\nThis would require web development skills and a backend service like Supabase.',
      [{ text: 'Got it!' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <IconSymbol name="globe" size={48} color={colors.primary} />
          <Text style={styles.title}>Web Upload Interface</Text>
          <Text style={styles.subtitle}>
            How to enable true folder uploads from your PC
          </Text>
        </View>

        <View style={styles.currentLimitationsSection}>
          <Text style={styles.sectionTitle}>📱 Current Mobile App Limitations</Text>
          <View style={styles.limitationItem}>
            <IconSymbol name="xmark.circle" size={16} color={colors.accent} />
            <Text style={styles.limitationText}>Cannot directly access PC folders</Text>
          </View>
          <View style={styles.limitationItem}>
            <IconSymbol name="xmark.circle" size={16} color={colors.accent} />
            <Text style={styles.limitationText}>Limited to device photo library</Text>
          </View>
          <View style={styles.limitationItem}>
            <IconSymbol name="xmark.circle" size={16} color={colors.accent} />
            <Text style={styles.limitationText}>Manual photo selection required</Text>
          </View>
        </View>

        <View style={styles.solutionSection}>
          <Text style={styles.sectionTitle}>💡 Recommended Solution</Text>
          <Text style={styles.solutionDescription}>
            Create a companion web interface that allows true folder uploads from your PC, 
            then syncs the data with this mobile app.
          </Text>

          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
              <Text style={styles.featureText}>Drag & drop folder uploads</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
              <Text style={styles.featureText}>Preserve folder structure</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
              <Text style={styles.featureText}>Batch album creation</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
              <Text style={styles.featureText}>Auto-organize by folder names</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color={colors.primary} />
              <Text style={styles.featureText}>Sync with mobile app</Text>
            </View>
          </View>
        </View>

        <View style={styles.implementationSection}>
          <Text style={styles.sectionTitle}>🛠️ Implementation Steps</Text>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Set up Backend (Supabase)</Text>
              <Text style={styles.stepDescription}>
                Create a Supabase project for file storage and database management
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Build Web Interface</Text>
              <Text style={styles.stepDescription}>
                Create a web app with drag-and-drop folder upload functionality
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Configure File Processing</Text>
              <Text style={styles.stepDescription}>
                Set up automatic image processing, resizing, and organization
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Sync with Mobile App</Text>
              <Text style={styles.stepDescription}>
                Connect the mobile app to fetch albums and photos from the backend
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.technicalSection}>
          <Text style={styles.sectionTitle}>⚙️ Technical Requirements</Text>
          
          <View style={styles.techStack}>
            <Text style={styles.techStackTitle}>Frontend (Web):</Text>
            <Text style={styles.techItem}>• React.js or Next.js</Text>
            <Text style={styles.techItem}>• File upload libraries (react-dropzone)</Text>
            <Text style={styles.techItem}>• Image processing (sharp, canvas)</Text>
          </View>

          <View style={styles.techStack}>
            <Text style={styles.techStackTitle}>Backend:</Text>
            <Text style={styles.techItem}>• Supabase (recommended)</Text>
            <Text style={styles.techItem}>• File storage bucket</Text>
            <Text style={styles.techItem}>• PostgreSQL database</Text>
          </View>

          <View style={styles.techStack}>
            <Text style={styles.techStackTitle}>Mobile App Updates:</Text>
            <Text style={styles.techItem}>• Supabase client integration</Text>
            <Text style={styles.techItem}>• Real-time sync capabilities</Text>
            <Text style={styles.techItem}>• Offline caching</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={openSupabaseGuide}>
            <IconSymbol name="link" size={20} color={colors.background} />
            <Text style={styles.primaryButtonText}>Learn About Supabase</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={showWebInterfaceExample}>
            <IconSymbol name="eye" size={20} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>View Example Interface</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.alternativeSection}>
          <Text style={styles.sectionTitle}>🔄 Current Workaround</Text>
          <Text style={styles.alternativeDescription}>
            Until you implement a web interface, you can simulate folder uploads by:
          </Text>
          
          <View style={styles.workaroundList}>
            <Text style={styles.workaroundItem}>1. Organize photos on your PC into folders</Text>
            <Text style={styles.workaroundItem}>2. Transfer folders to your mobile device</Text>
            <Text style={styles.workaroundItem}>3. Use the "Bulk Upload" feature in this app</Text>
            <Text style={styles.workaroundItem}>4. Name albums based on folder names</Text>
            <Text style={styles.workaroundItem}>5. Use "Auto-Name" to organize photos</Text>
          </View>
        </View>
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
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    ...commonStyles.title,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    ...commonStyles.textSecondary,
    textAlign: 'center',
    fontSize: 14,
  },
  currentLimitationsSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  sectionTitle: {
    ...commonStyles.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.primary,
  },
  limitationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  limitationText: {
    ...commonStyles.textSecondary,
    fontSize: 14,
  },
  solutionSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  solutionDescription: {
    ...commonStyles.textSecondary,
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    ...commonStyles.textSecondary,
    fontSize: 14,
  },
  implementationSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    ...commonStyles.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDescription: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  technicalSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  techStack: {
    marginBottom: 16,
  },
  techStackTitle: {
    ...commonStyles.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.accent,
  },
  techItem: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    ...commonStyles.button,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    ...commonStyles.buttonText,
    fontSize: 16,
  },
  secondaryButton: {
    ...commonStyles.button,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  alternativeSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  alternativeDescription: {
    ...commonStyles.textSecondary,
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  workaroundList: {
    gap: 8,
  },
  workaroundItem: {
    ...commonStyles.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
