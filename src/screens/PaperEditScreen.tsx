import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AtmosphericBackground } from '../components/AtmosphericBackground';
import { ChannelSwitch } from '../components/ChannelSwitch';
import { FieldInput } from '../components/FieldInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { Paper, PaperLanguage, PaperSection } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { parseBibtex } from '../utils/bibtex';

type Props = {
  paper?: Paper;
  onSave: (paper: Paper) => void;
  onCancel: () => void;
  onDelete: (paperId: string) => void;
};

const createSection = (index: number): PaperSection => ({
  id: `section-${Date.now()}-${index}`,
  title: `Section ${index + 1}`,
  content: '',
});

export function PaperEditScreen({ paper, onSave, onCancel, onDelete }: Props) {
  const [inputMode, setInputMode] = useState<'manual' | 'bib'>('manual');
  const [bibText, setBibText] = useState('');
  const [title, setTitle] = useState(paper?.title ?? '');
  const [language, setLanguage] = useState<PaperLanguage>(paper?.language ?? 'ja');
  const [authors, setAuthors] = useState(paper?.authors.join(', ') ?? '');
  const [venue, setVenue] = useState(paper?.venue ?? '');
  const [volume, setVolume] = useState(paper?.volume ?? '');
  const [issue, setIssue] = useState(paper?.issue ?? '');
  const [pageStart, setPageStart] = useState(() => {
    const raw = paper?.pages ?? '';
    const parts = raw.split(/[-–—]/);
    return parts[0]?.trim() ?? '';
  });
  const [pageEnd, setPageEnd] = useState(() => {
    const raw = paper?.pages ?? '';
    const parts = raw.split(/[-–—]/);
    return parts[1]?.trim() ?? '';
  });
  const [year, setYear] = useState(paper?.year?.toString() ?? '');
  const [tags, setTags] = useState<string[]>(
    paper?.tags?.length ? paper.tags : ['']
  );
  const [abstract, setAbstract] = useState(paper?.abstract ?? '');
  const [sections, setSections] = useState<PaperSection[]>(
    paper?.sections.length ? paper.sections : [createSection(0)]
  );

  useEffect(() => {
    if (inputMode !== 'bib') {
      return;
    }
    const handler = setTimeout(() => {
      const parsed = parseBibtex(bibText);
      if (parsed.title) {
        setTitle(parsed.title);
      }
      if (parsed.authors?.length) {
        setAuthors(parsed.authors.join(', '));
      }
      if (parsed.venue) {
        setVenue(parsed.venue);
      }
      if (parsed.volume) {
        setVolume(parsed.volume);
      }
      if (parsed.issue) {
        setIssue(parsed.issue);
      }
      if (parsed.pages) {
        const parts = parsed.pages.split(/[-–—]/);
        setPageStart(parts[0]?.trim() ?? '');
        setPageEnd(parts[1]?.trim() ?? '');
      }
      if (parsed.year) {
        setYear(parsed.year);
      }
      if (parsed.abstract) {
        setAbstract(parsed.abstract);
      }
      if (parsed.keywords?.length) {
        setTags(parsed.keywords);
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [bibText, inputMode]);

  const handleSave = () => {
    const now = new Date().toISOString();
    const pagesValue =
      pageStart && pageEnd
        ? `${pageStart}-${pageEnd}`
        : pageStart || pageEnd || undefined;
    const nextPaper: Paper = {
      id: paper?.id ?? `paper-${Date.now()}`,
      title,
      language,
      authors: authors
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      venue: venue || undefined,
      volume: volume || undefined,
      issue: issue || undefined,
      pages: pagesValue,
      year: year ? Number(year) : undefined,
      tags: tags.map((value) => value.trim()).filter(Boolean),
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

  const updateTag = (index: number, value: string) => {
    setTags((prev) => prev.map((tag, i) => (i === index ? value : tag)));
  };

  const addTag = () => {
    setTags((prev) => [...prev, '']);
  };

  const handleDelete = () => {
    if (!paper?.id) {
      return;
    }
    Alert.alert(
      '削除の確認',
      'この論文を削除しますか？この操作は取り消せません。',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除する', style: 'destructive', onPress: () => onDelete(paper.id) },
      ]
    );
  };

  return (
    <AtmosphericBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {paper ? '論文を編集' : '新規論文を作成'}
            </Text>
            <PrimaryButton label="戻る" onPress={onCancel} variant="dark" />
          </View>

          <ChannelSwitch value={language} onChange={setLanguage} />

          <View style={styles.modeCard}>
            <View style={styles.modeRow}>
              <Text style={styles.modeLabel}>入力方法</Text>
              <View style={styles.modeSwitch}>
                <TouchableOpacity
                  style={[
                    styles.modeOption,
                    inputMode === 'manual' && styles.modeOptionActive,
                  ]}
                  onPress={() => setInputMode('manual')}
                >
                  <Text
                    style={[
                      styles.modeText,
                      inputMode === 'manual' && styles.modeTextActive,
                    ]}
                  >
                    手動入力
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modeOption,
                    inputMode === 'bib' && styles.modeOptionActive,
                  ]}
                  onPress={() => setInputMode('bib')}
                >
                  <Text
                    style={[
                      styles.modeText,
                      inputMode === 'bib' && styles.modeTextActive,
                    ]}
                  >
                    BibTeX
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {inputMode === 'bib' && (
            <View>
              <FieldInput
                label="BibTeX"
                placeholder="@article{...}"
                value={bibText}
                onChangeText={setBibText}
                multiline
                labelStyle={styles.fieldLabel}
                placeholderTextColor={colors.placeholder}
                persistentPlaceholder
              />
              <Text style={styles.bibHint}>
                BibTeXを貼り付けると各項目に自動反映されます。
              </Text>
            </View>
          )}

          {inputMode === 'manual' && (
            <View>
              <FieldInput
                label="タイトル"
                value={title}
                onChangeText={setTitle}
                labelStyle={styles.fieldLabel}
              />
              <FieldInput
                label="著者 (カンマ区切り)"
                value={authors}
                onChangeText={setAuthors}
                labelStyle={styles.fieldLabel}
              />
              <FieldInput
                label="掲載誌/会議"
                value={venue}
                onChangeText={setVenue}
                labelStyle={styles.fieldLabel}
              />
              <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                  <FieldInput
                    label="巻"
                    value={volume}
                    onChangeText={setVolume}
                    labelStyle={styles.fieldLabel}
                  />
                </View>
                <View style={styles.gridItem}>
                  <FieldInput
                    label="号"
                    value={issue}
                    onChangeText={setIssue}
                    labelStyle={styles.fieldLabel}
                  />
                </View>
              </View>
              <View style={styles.gridRow}>
                <View style={styles.gridItem}>
                  <FieldInput
                    label="ページ"
                    value={pageStart}
                    onChangeText={setPageStart}
                    labelStyle={styles.fieldLabel}
                  />
                </View>
                <View style={styles.pageHyphenWrapper}>
                  <Text style={styles.pageHyphen}>-</Text>
                </View>
                <View style={styles.gridItem}>
                  <FieldInput
                    label=" "
                    value={pageEnd}
                    onChangeText={setPageEnd}
                    labelStyle={styles.fieldLabel}
                  />
                </View>
              </View>
              <FieldInput
                label="年"
                value={year}
                onChangeText={setYear}
                labelStyle={styles.fieldLabel}
              />
            </View>
          )}

          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>タグ</Text>
              <PrimaryButton label="タグを追加" onPress={addTag} variant="ocean" />
            </View>
            <Text style={styles.sectionHint}>
              タグを追加して論文を分類できます。
            </Text>
            {tags.map((tag, index) => (
              <FieldInput
                key={`tag-${index}`}
                label={`タグ ${index + 1}`}
                value={tag}
                onChangeText={(value) => updateTag(index, value)}
                labelStyle={styles.fieldLabel}
              />
            ))}
          </View>

          <FieldInput
            label="Abstract"
            value={abstract}
            onChangeText={setAbstract}
            multiline
            labelStyle={styles.fieldLabel}
          />

          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>章データ</Text>
              <PrimaryButton label="章を追加" onPress={addSection} variant="ocean" />
            </View>
            <Text style={styles.sectionHint}>
              章を追加して本文と要約を分割管理できます。
            </Text>

            {sections.map((section, index) => (
              <View key={section.id} style={styles.sectionCard}>
                <FieldInput
                  label={`章タイトル ${index + 1}`}
                  value={section.title}
                  onChangeText={(value) => updateSection(index, { title: value })}
                  labelStyle={styles.fieldLabel}
                />
                <FieldInput
                  label="内容"
                  value={section.content}
                  onChangeText={(value) => updateSection(index, { content: value })}
                  multiline
                  labelStyle={styles.fieldLabel}
                />
                <FieldInput
                  label="要約 (任意)"
                  value={section.summary ?? ''}
                  onChangeText={(value) => updateSection(index, { summary: value })}
                  multiline
                  labelStyle={styles.fieldLabel}
                />
              </View>
            ))}
          </View>

          <PrimaryButton label="保存" onPress={handleSave} />
          {paper?.id ? (
            <View style={styles.actionRow}>
              <PrimaryButton
                label="保存せずに戻る"
                onPress={onCancel}
                variant="dark"
                style={[styles.actionButton, styles.actionButtonLeft]}
              />
              <PrimaryButton
                label="削除する"
                onPress={handleDelete}
                variant="danger"
                style={styles.actionButton}
              />
            </View>
          ) : (
            <PrimaryButton
              label="保存せずに戻る"
              onPress={onCancel}
              variant="dark"
              style={styles.cancelButton}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
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
  fieldLabel: {
    fontSize: 14,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  gridItem: {
    flex: 1,
  },
  pageHyphenWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 28,
  },
  pageHyphen: {
    fontFamily: typography.mono,
    color: colors.inkSoft,
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
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHint: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.md,
  },
  modeCard: {
    marginBottom: spacing.md,
  },
  modeRow: {},
  modeLabel: {
    fontFamily: typography.mono,
    color: colors.ocean,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  modeSwitch: {
    flexDirection: 'row',
    backgroundColor: colors.clayDeep,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 4,
  },
  modeOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    alignItems: 'center',
  },
  modeOptionActive: {
    backgroundColor: colors.ocean,
  },
  modeText: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.inkSoft,
  },
  modeTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  bibHint: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.md,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButton: {
    marginTop: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonLeft: {
    marginRight: spacing.sm,
  },
});
