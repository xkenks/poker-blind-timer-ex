import { useLanguageStore } from '../store/languageStore';

export type Language = 'ja' | 'en';

export const translations = {
  ja: {
    // メイン表示
    tournamentSettings: 'トーナメント設定',
    prizePool: '賞金プール',
    nextBreakIn: '次回休憩まで',
    avgStack: '平均スタック',
    players: 'プレイヤー数',
    tournament: 'トーナメント',
    noBreak: '休憩なし',
    breakTime: '休憩時間！',
    
    // 設定項目
    blindSettings: 'ブラインド設定',
    playerManager: 'プレイヤー管理',
    prizePoolSettings: '賞金設定',
    displaySettings: '表示設定',
    savedTournaments: '保存されたトーナメント',
    
    // ブラインド設定
    blindLevel: 'ブラインドレベル',
    smallBlind: 'スモールブラインド',
    bigBlind: 'ビッグブラインド',
    ante: 'アンテ',
    time: '時間',
    break: '休憩',
    addLevel: 'レベル追加',
    deleteLevel: 'レベル削除',
    bulkTimeSetting: '一括時間設定',
    applyToAll: '全てに適用',
    dragToReorder: 'ドラッグ&ドロップで順序変更',
    load: '読み込み',
    delete: '削除',
    save: '保存',
    cancel: 'キャンセル',
    reset: 'リセット',
    
    // プレイヤー管理
    initialPlayers: '初期プレイヤー数',
    currentPlayers: '現在のプレイヤー数',
    rebuys: 'リバイ数',
    playersOut: '退場者数',
    initialStack: '初期スタック',
    averageStack: '平均スタック',
    eliminatedPlayers: '脱落プレイヤー数',
    currentStatus: '現在の状況',
    remaining: '残り',
    
    // 賞金設定
    prizePool: '賞金プール',
    position: '順位',
    prize: '賞金',
    addPrize: '賞金追加',
    deletePrize: '賞金削除',
    first: '1位',
    second: '2位',
    third: '3位',
    
    // 表示設定
    backgroundColor: '背景色',
    textColor: '文字色',
    backgroundImage: '背景画像',
    soundSettings: '音声設定',
    soundEnabled: '音声を有効にする',
    warningSound: '警告音',
    levelChangeSound: 'レベル変更音',
    
    // ボタン・アクション
    start: '開始',
    pause: '一時停止',
    reset: 'リセット',
    next: '次へ',
    previous: '前へ',
    settings: '設定',
    home: 'ホーム',
    close: '閉じる',
    
    // テンプレート
    turbo100: 'ターボ100',
    turbo10: 'ターボ10',
    turbo1: 'ターボ1',
    longStructure: 'ロングストラクチャー',
    
    // 通貨・単位
    jpy: '円',
    usd: 'ドル',
    coin: 'コイン',
    ticket: 'チケット',
    item: 'アイテム',
    
    // 時間
    minutes: '分',
    seconds: '秒',
    hours: '時間',
    
    // その他
    action: 'アクション',
    customization: 'カスタマイズ',
  },
  en: {
    // メイン表示
    tournamentSettings: 'Tournament Settings',
    prizePool: 'PRIZE POOL',
    nextBreakIn: 'NEXT BREAK IN',
    avgStack: 'AVG STACK',
    players: 'PLAYERS',
    tournament: 'Tournament',
    noBreak: 'No Break',
    breakTime: 'Break Time!',
    
    // 設定項目
    blindSettings: 'Blind Settings',
    playerManager: 'Player Manager',
    prizePoolSettings: 'Prize Pool Settings',
    displaySettings: 'Display Settings',
    savedTournaments: 'Saved Tournaments',
    
    // ブラインド設定
    blindLevel: 'Blind Level',
    smallBlind: 'Small Blind',
    bigBlind: 'Big Blind',
    ante: 'Ante',
    time: 'Time',
    break: 'Break',
    addLevel: 'Add Level',
    deleteLevel: 'Delete Level',
    bulkTimeSetting: 'Bulk Time Setting',
    applyToAll: 'Apply to All',
    dragToReorder: 'You can drag & drop to change order',
    load: 'Load',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    reset: 'Reset',
    
    // プレイヤー管理
    initialPlayers: 'Initial Players',
    currentPlayers: 'Current Players',
    rebuys: 'Rebuys',
    playersOut: 'Players Out',
    initialStack: 'Initial Stack',
    averageStack: 'Average Stack',
    eliminatedPlayers: 'Eliminated Players',
    currentStatus: 'Current Status',
    remaining: 'Remaining',
    
    // 賞金設定
    prizePool: 'Prize Pool',
    position: 'Position',
    prize: 'Prize',
    addPrize: 'Add Prize',
    deletePrize: 'Delete Prize',
    first: '1st',
    second: '2nd',
    third: '3rd',
    
    // 表示設定
    backgroundColor: 'Background Color',
    textColor: 'Text Color',
    backgroundImage: 'Background Image',
    soundSettings: 'Sound Settings',
    soundEnabled: 'Enable Sound',
    warningSound: 'Warning Sound',
    levelChangeSound: 'Level Change Sound',
    
    // ボタン・アクション
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    next: 'Next',
    previous: 'Previous',
    settings: 'Settings',
    home: 'Home',
    close: 'Close',
    
    // テンプレート
    turbo100: 'Turbo 100',
    turbo10: 'Turbo 10',
    turbo1: 'Turbo 1',
    longStructure: 'Long Structure',
    
    // 通貨・単位
    jpy: '¥',
    usd: '$',
    coin: 'COIN',
    ticket: 'TICKET',
    item: 'ITEM',
    
    // 時間
    minutes: 'min',
    seconds: 'sec',
    hours: 'hr',
    
    // その他
    action: 'Action',
    customization: 'Customization',
  },
};

export const useTranslation = () => {
  const { language } = useLanguageStore();
  return (key: keyof typeof translations.ja) => translations[language][key];
};
