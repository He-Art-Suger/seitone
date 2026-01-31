import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import { Feather } from '@expo/vector-icons';
import { mockPapers } from './src/data/mock';
import { Paper } from './src/types';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { PaperDetailScreen } from './src/screens/PaperDetailScreen';
import { PaperEditScreen } from './src/screens/PaperEditScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { colors } from './src/theme/colors';

enableScreens();

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type MainStackParamList = {
  Tabs: undefined;
  PaperDetail: { paperId: string };
  PaperEdit: { paperId?: string };
};

type TabsParamList = {
  Library: undefined;
  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const Tabs = createBottomTabNavigator<TabsParamList>();

export default function App() {
  const [papers, setPapers] = useState<Paper[]>(mockPapers);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const paperMap = useMemo(() => {
    return papers.reduce<Record<string, Paper>>((acc, paper) => {
      acc[paper.id] = paper;
      return acc;
    }, {});
  }, [papers]);

  const updatePaper = (nextPaper: Paper) => {
    setPapers((prev) => {
      const exists = prev.some((paper) => paper.id === nextPaper.id);
      if (!exists) {
        return [nextPaper, ...prev];
      }
      return prev.map((paper) => (paper.id === nextPaper.id ? nextPaper : paper));
    });
  };

  const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn">
        {({ navigation }) => (
          <SignInScreen
            onSignIn={(email) => setUserEmail(email || 'demo@seitone.app')}
            onMoveToSignUp={() => navigation.navigate('SignUp')}
          />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp">
        {({ navigation }) => (
          <SignUpScreen
            onSignUp={(email) => setUserEmail(email || 'demo@seitone.app')}
            onMoveToSignIn={() => navigation.navigate('SignIn')}
          />
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );

  const TabsScreen = () => (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: 'rgba(25, 30, 39, 0.08)',
          backgroundColor: colors.white,
        },
        tabBarActiveTintColor: colors.ocean,
        tabBarInactiveTintColor: colors.inkSoft,
      }}
    >
      <Tabs.Screen
        name="Library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" size={size} color={color} />
          ),
        }}
      >
        {({ navigation }) => (
          <LibraryScreen
            papers={papers}
            onSelectPaper={(paper) =>
              navigation.getParent()?.navigate('PaperDetail', { paperId: paper.id })
            }
            onCreatePaper={() => navigation.getParent()?.navigate('PaperEdit')}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="sliders" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <SettingsScreen
            userEmail={userEmail ?? 'demo@seitone.app'}
            onSignOut={() => setUserEmail(null)}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );

  const MainStackScreen = () => (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Tabs" component={TabsScreen} />
      <MainStack.Screen name="PaperDetail">
        {({ route, navigation }) => {
          const paper = paperMap[route.params.paperId];
          if (!paper) {
            return null;
          }
          return (
            <PaperDetailScreen
              paper={paper}
              onEdit={(target) =>
                navigation.navigate('PaperEdit', { paperId: target.id })
              }
              onUpdate={updatePaper}
            />
          );
        }}
      </MainStack.Screen>
      <MainStack.Screen name="PaperEdit">
        {({ route, navigation }) => (
          <PaperEditScreen
            paper={route.params?.paperId ? paperMap[route.params.paperId] : undefined}
            onSave={(next) => {
              updatePaper(next);
              navigation.goBack();
            }}
            onCancel={() => navigation.goBack()}
          />
        )}
      </MainStack.Screen>
    </MainStack.Navigator>
  );

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {userEmail ? (
          <RootStack.Screen name="Main" component={MainStackScreen} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
