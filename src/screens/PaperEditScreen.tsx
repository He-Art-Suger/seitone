import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AtmosphericBackground } from '../components/AtmosphericBackground';
import { ChannelSwitch } from '../components/ChannelSwitch';
import { FieldInput } from '../components/FieldInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { Paper, PaperLanguage, PaperSection } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  paper?: Paper;
  onSave: (paper: Paper) => void;
  onCancel: () => void;
};

const createSection = (index: number): PaperSection => ({
  id: `section-${Date.now()}-${index}`,
  title: `Section ${index + 1}`,
  content: '',
});

export function PaperEditScreen({ paper, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(paper?.title ?? '');
  const [language, setLanguage] = useState<PaperLanguage>(paper?.language ?? 'ja');
  const [authors, setAuthors] = useState(paper?.authors.join(', ') ?? '');
  const [venue, setVenue] = useState(paper?.venue ?? '');
  const [year, setYear] = useState(paper?.year?.toString() ?? '');
  const [tags, setTags] = useState(paper?.tags.join(', ') ?? '');
  const [abstract, setAbstract] = useState(paper?.abstract ?? '');
  const [sections, setSections] = useState<PaperSection[]>(
    paper?.sections.length ? paper.sections : [createSection(0)]
  );

  const handleSave = () => {
    const now = new Date().toISOString();
    const nextPaper: Paper = {
      id: paper?.id ?? `paper-${Date.now()}`,
      title,
      language,
      authors: authors
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      venue: venue || undefined,
      year: year ? Number(year) : undefined,
      tags: tags
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      status: paper?.status ?? 'draft',
      abstract,
      translatedAbstract: paper?.translatedAbstract,
      overallSummary: paper?.overallSummary,
      sections,
      createdAt: paper?.createdAt ?? now,
      updatedAt: now,
    };

    onSave(nextPaper);
  };

  const updateSection = (index: number, next: Partial<PaperSection>) => {
    setSections((prev) =>
      prev.map((section, i) => (i === index ? { ...section, ...next } : section))
    );
  };

  const addSection = () => {
    setSections((prev) => [...prev, createSection(prev.length)]);
  };

  return (
    <AtmosphericBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {paper ? '論文を編集' : '新規論文を作成'}
          </Text>
          <PrimaryButton label="保存" onPress={handleSave} />
        </View>

        <ChannelSwitch value={language} onChange={setLanguage} />
        <FieldInput label="タイトル" value={title} onChangeText={setTitle} />
        <FieldInput label="著者 (カンマ区切り)" value={authors} onChangeText={setAuthors} />
        <FieldInput label="掲載誌/会議" value={venue} onChangeText={setVenue} />
        <FieldInput label="年" value={year} onChangeText={setYear} />
        <FieldInput label="タグ (カンマ区切り)" value={tags} onChangeText={setTags} />
        <FieldInput
          label="Abstract"
          value={abstract}
          onChangeText={setAbstract}
          multiline
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>章データ</Text>
          <PrimaryButton label="章を追加" onPress={addSection} variant="ghost" />
        </View>

        {sections.map((section, index) => (
          <View key={section.id} style={styles.sectionCard}>
            <FieldInput
              label={`章タイトル ${index + 1}`}
              value={section.title}
              onChangeText={(value) => updateSection(index, { title: value })}
            />
            <FieldInput
              label="内容"
              value={section.content}
              onChangeText={(value) => updateSection(index, { content: value })}
              multiline
            />
            <FieldInput
              label="要約 (任意)"
              value={section.summary ?? ''}
              onChangeText={(value) => updateSection(index, { summary: value })}
              multiline
            />
          </View>
        ))}

        <PrimaryButton label="キャンセル" onPress={onCancel} variant="ghost" />
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
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 22,
    color: colors.ink,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.mono,
    color: colors.ocean,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
