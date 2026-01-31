import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  label: string;
  tone?: 'neutral' | 'accent' | 'success' | 'warning';
};

const toneMap = {
  neutral: colors.clay,
  accent: colors.accentSoft,
  success: 'rgba(63, 142, 115, 0.2)',
  warning: 'rgba(227, 167, 63, 0.2)',
};

export function TagPill({ label, tone = 'neutral' }: Props) {
  return (
    <View style={[styles.pill, { backgroundColor: toneMap[tone] }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  text: {
    fontFamily: typography.mono,
    fontSize: 12,
    color: colors.inkSoft,
  },
});
