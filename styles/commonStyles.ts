
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#000000',        // Black
  text: '#00FF00',             // Green Hacker Font
  textSecondary: '#A9A9A9',    // Dark Gray
  primary: '#32CD32',          // Lime Green
  secondary: '#2E8B57',        // Sea Green
  accent: '#ADFF2F',           // Green Yellow
  card: '#121212',             // Dark Charcoal
  highlight: '#00FA9A',        // Medium Spring Green
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accent: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'monospace',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontFamily: 'monospace',
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    boxShadow: '0px 4px 8px rgba(0, 255, 0, 0.2)',
    elevation: 4,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    fontSize: 16,
    fontFamily: 'monospace',
    marginVertical: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
