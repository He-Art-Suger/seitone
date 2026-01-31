import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  label: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'dark';
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  style,
  labelStyle,
}: Props) {
  const isPrimitive = typeof label === 'string' || typeof label === 'number';
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], style]}
      onPress={onPress}
    >
      {isPrimitive ? (
        <Text style={[styles.text, variant === 'dark' && styles.textDark, labelStyle]}>
          {label}
        </Text>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
  },
  ghost: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dark: {
    backgroundColor: colors.ink,
  },
  text: {
    fontFamily: typography.body,
    color: colors.white,
    fontWeight: '600',
  },
  textDark: {
    color: colors.white,
  },
});
