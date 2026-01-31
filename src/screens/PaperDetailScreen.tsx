import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AtmosphericBackground } from '../components/AtmosphericBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionSummaryCard } from '../components/SectionSummaryCard';
import { TagPill } from '../components/TagPill';
import { Paper } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { mockSummarize, mockTranslateToJapanese } from '../utils/aiMocks';

type Props = {
  paper: Paper;
  onEdit: (paper: Paper) => void;
  onUpdate: (paper: Paper) => void;
};

export function PaperDetailScreen({ paper, onEdit, onUpdate }: Props) {
  const [current, setCurrent] = useState<Paper>(paper);

  useEffect(() => {
    setCurrent(paper);
  }, [paper]);

  const handleTranslate = () => {
    const translated = mockTranslateToJapanese(current.abstract);
    const next = { ...current, translatedAbstract: translated };
    setCurrent(next);
    onUpdate(next);
  };

  const handleSummarize = () => {
    const summary = mockSummarize(
      [current.abstract, ...current.sections.map((section) => section.content)].join(
        ' '
      )
    );
    const next = { ...current, overallSummary: summary };
    setCurrent(next);
    onUpdate(next);
  };

  const handleSummarizeSections = () => {
    const nextSections = current.sections.map((section) => ({
      ...section,
      summary: section.summary ?? mockSummarize(section.content),
    }));
    const next = { ...current, sections: nextSections };
    setCurrent(next);
    onUpdate(next);
  };

  return (
    <AtmosphericBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{current.title}</Text>
          <PrimaryButton label="編集" onPress={() => onEdit(current)} />
        </View>
        <Text style={styles.meta}>
          {current.venue ?? '未設定'} · {current.year ?? '—'} ·{' '}
          {current.authors.join(', ')}
        </Text>
        <View style={styles.tags}>
          <TagPill label={current.language === 'ja' ? '日本語' : 'English'} tone="accent" />
          {current.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Abstract</Text>
          <Text style={styles.sectionText}>{current.abstract}</Text>
          {current.language === 'en' && (
            <View style={styles.buttonRow}>
              <PrimaryButton label="日本語へ翻訳" onPress={handleTranslate} />
            </View>
          )}
        </View>

        {current.language === 'en' && (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>日本語訳</Text>
            <Text style={styles.sectionText}>
              {current.translatedAbstract ?? '翻訳はまだありません。'}
            </Text>
          </View>
        )}

        <View style={styles.sectionBlock}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>全体要約</Text>
            <PrimaryButton label="自動要約" onPress={handleSummarize} variant="ghost" />
          </View>
          <Text style={styles.sectionText}>
            {current.overallSummary ?? 'まだ要約がありません。'}
          </Text>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>章ごとの要約</Text>
            <PrimaryButton
              label="一括要約"
              onPress={handleSummarizeSections}
              variant="ghost"
            />
          </View>
          {current.sections.map((section) => (
            <SectionSummaryCard
              key={section.id}
              title={section.title}
              summary={section.summary}
            />
          ))}
        </View>
      </ScrollView>
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: typography.heading,
    fontSize: 22,
    color: colors.ink,
    marginRight: spacing.sm,
  },
  meta: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  sectionBlock: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontFamily: typography.mono,
    fontSize: 12,
    color: colors.ocean,
    marginBottom: spacing.sm,
  },
  sectionText: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    lineHeight: 20,
  },
  buttonRow: {
    marginTop: spacing.md,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
});
