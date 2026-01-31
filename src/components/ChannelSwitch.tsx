import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PaperLanguage } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  value: PaperLanguage;
  onChange: (value: PaperLanguage) => void;
};

export function ChannelSwitch({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {(['ja', 'en'] as PaperLanguage[]).map((lang) => {
        const active = value === lang;
        return (
          <TouchableOpacity
            key={lang}
            style={[styles.option, active && styles.optionActive]}
            onPress={() => onChange(lang)}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {lang === 'ja' ? '日本語チャンネル' : 'English Channel'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.clay,
    borderRadius: 999,
    padding: 4,
    marginBottom: spacing.md,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: colors.ocean,
  },
  text: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.inkSoft,
  },
  textActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
