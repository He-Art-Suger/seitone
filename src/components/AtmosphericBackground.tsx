import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
};

export function AtmosphericBackground({ children }: Props) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.mist, colors.clay, colors.accentSoft]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.blobOne} />
      <View style={styles.blobTwo} />
      <View style={styles.blobThree} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.mist,
  },
  blobOne: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(197, 176, 211, 0.45)',
  },
  blobTwo: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(63, 107, 111, 0.25)',
  },
  blobThree: {
    position: 'absolute',
    top: 180,
    left: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(239, 124, 80, 0.18)',
  },
});
