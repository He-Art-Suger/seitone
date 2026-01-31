import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Paper } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { TagPill } from './TagPill';

type Props = {
  paper: Paper;
  onPress: () => void;
};

const statusTone = {
  draft: 'warning',
  reviewing: 'accent',
  ready: 'success',
  archived: 'neutral',
} as const;

export function PaperCard({ paper, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{paper.title}</Text>
        <Text style={styles.language}>{paper.language.toUpperCase()}</Text>
      </View>
      <Text style={styles.meta}>
        {paper.venue ?? '未設定'} · {paper.year ?? '—'} · {paper.authors.join(', ')}
      </Text>
      <Text numberOfLines={2} style={styles.abstract}>
        {paper.abstract}
      </Text>
      <View style={styles.tags}>
        <TagPill label={paper.status} tone={statusTone[paper.status]} />
        {paper.tags.slice(0, 3).map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: typography.heading,
    fontSize: 18,
    color: colors.ink,
    marginRight: spacing.sm,
  },
  language: {
    fontFamily: typography.mono,
    fontSize: 12,
    color: colors.ocean,
    backgroundColor: 'rgba(61, 107, 111, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  meta: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.inkSoft,
    marginBottom: spacing.sm,
  },
  abstract: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.sm,
    lineHeight: 19,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
