import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  title: string;
  summary?: string;
};

export function SectionSummaryCard({ title, summary }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>
        {summary ? summary : 'まだ要約がありません。自動要約を実行してください。'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontFamily: typography.mono,
    fontSize: 14,
    color: colors.ocean,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  summary: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.inkSoft,
    lineHeight: 18,
  },
});
