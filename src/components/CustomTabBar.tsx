import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const iconMap: Record<string, keyof typeof Feather.glyphMap> = {
  Library: 'book-open',
  Settings: 'sliders',
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { bottom: Math.max(insets.bottom, 10), left: spacing.lg, right: spacing.lg },
      ]}
    >
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const iconName = iconMap[route.name] ?? 'circle';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.item}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
            >
              {isFocused ? (
                <View style={styles.activeBubble}>
                  <Feather name={iconName} size={22} color={colors.white} />
                  <Text style={styles.activeLabel}>{String(label)}</Text>
                </View>
              ) : (
                <View style={styles.inactive}>
                  <Feather name={iconName} size={20} color={colors.ocean} />
                  <Text style={styles.inactiveLabel}>{String(label)}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  pill: {
    backgroundColor: colors.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  activeBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.ocean,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLabel: {
    marginTop: 1,
    fontFamily: typography.body,
    fontSize: 9,
    color: colors.white,
  },
  inactive: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveLabel: {
    marginTop: 2,
    fontFamily: typography.body,
    fontSize: 11,
    color: colors.ocean,
  },
});
