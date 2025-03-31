// 効果音の種類を定義
export enum SoundType {
  CASINO = 'casino',
  SIMPLE = 'simple',
  DIGITAL = 'digital'
}

// グローバルな音声設定
export let selectedWarningSound: SoundType = SoundType.CASINO;
export let selectedLevelChangeSound: SoundType = SoundType.CASINO;

// AudioContext インスタンスをグローバルで管理し、再利用する
let sharedAudioContext: AudioContext | null = null;
let isAudioInitialized = false; // オーディオが初期化されたかどうかを示すフラグ

// 安全にAudioContextを取得する関数
const getAudioContext = (): AudioContext | null => {
  try {
    // AudioContextの初期化が未完了なら初期化する
    if (!isAudioInitialized) {
      if (!sharedAudioContext) {
        // 新しいAudioContextを作成
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          sharedAudioContext = new AudioContextClass();
          console.log('新規AudioContextを作成しました');
        } else {
          console.error('AudioContextがサポートされていません');
          return null;
        }
      }
      isAudioInitialized = true;
    }
    
    // 一時停止状態の場合は再開を試みる
    if (sharedAudioContext && sharedAudioContext.state === 'suspended') {
      // 非同期で再開 - ブラウザポリシーによるブロックを避けるため
      sharedAudioContext.resume().catch(error => {
        console.warn('AudioContext の再開に失敗しました:', error);
      });
    }
    
    return sharedAudioContext;
  } catch (error) {
    console.error('AudioContext の取得中にエラーが発生しました:', error);
    return null;
  }
};

// 効果音の設定を更新する関数
export const updateSoundSettings = (warningSound: SoundType, levelChangeSound: SoundType) => {
  console.log(`Updating sound settings - Warning: ${warningSound}, Level Change: ${levelChangeSound}`);
  selectedWarningSound = warningSound;
  selectedLevelChangeSound = levelChangeSound;
};

// ブラインド変更時のサウンド - 無効化（サイレント）
export const playBlindChangeSound = () => {
  // 効果音を鳴らさない - 空の関数
  console.log('ブラインド変更時の効果音は無効化されています');
};

// オーディオ機能を初期化（ユーザーインタラクション後に呼び出す）
export const initAudio = (): boolean => {
  try {
    const context = getAudioContext();
    if (!context) {
      console.error('AudioContextの初期化に失敗しました');
      return false;
    }
    
    // サイレントオシレーターを作成して再生 - これにより多くのブラウザでオーディオ機能がアンロックされる
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    
    // 音量をゼロに設定（無音再生）
    gain.gain.setValueAtTime(0, context.currentTime);
    
    oscillator.connect(gain);
    gain.connect(context.destination);
    
    // 短時間だけ再生して終了
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.001);
    
    console.log('オーディオ機能を初期化しました');
    return true;
  } catch (error) {
    console.error('オーディオ初期化中にエラーが発生しました:', error);
    return false;
  }
};

// タイマー終了時のサウンド
export const playWarningSound = () => {
  console.log(`Playing warning sound: ${selectedWarningSound}`);
  
  try {
    // 再生前にオーディオ初期化を確認
    if (!isAudioInitialized) {
      const initialized = initAudio();
      if (!initialized) {
        console.error('オーディオ初期化に失敗したため、サウンドを再生できません');
        return;
      }
    }
    
    switch (selectedWarningSound) {
      case SoundType.CASINO:
        console.log('Playing CASINO warning sound');
        playCasinoWarningSound();
        break;
      case SoundType.SIMPLE:
        console.log('Playing SIMPLE warning sound');
        playSimpleWarningSound();
        break;
      case SoundType.DIGITAL:
        console.log('Playing DIGITAL warning sound');
        playDigitalWarningSound();
        break;
      default:
        console.log('Playing fallback (CASINO) warning sound');
        playCasinoWarningSound();
    }
  } catch (error) {
    console.error('警告音の再生中にエラーが発生しました:', error);
  }
};

// デフォルトのレベル変更音
const playDefaultLevelChangeSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // サウンドの設定
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5音
  gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);

  // サウンドの再生
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
  oscillator.stop(audioContext.currentTime + 1.2);
};

// シンプルなレベル変更音
const playSimpleLevelChangeSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // シンプルな音
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4音
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

  // サウンドの再生
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
  oscillator.stop(audioContext.currentTime + 0.8);
};

// デジタル風のレベル変更音
const playDigitalLevelChangeSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // 上昇音
  const oscillator1 = audioContext.createOscillator();
  const gainNode1 = audioContext.createGain();
  
  oscillator1.type = 'sawtooth';
  oscillator1.connect(gainNode1);
  gainNode1.connect(audioContext.destination);
  
  oscillator1.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator1.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.2);
  
  gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode1.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator1.start();
  oscillator1.stop(audioContext.currentTime + 0.3);
  
  // ビープ音を追加
  setTimeout(() => {
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    
    oscillator2.type = 'square';
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    
    oscillator2.frequency.setValueAtTime(880, audioContext.currentTime);
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator2.start();
    oscillator2.stop(audioContext.currentTime + 0.2);
  }, 300);
};

// カジノ風のレベル変更音
const playCasinoLevelChangeSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // カードをめくる音
  const playCardSound = (delay: number) => {
    const noise = audioContext.createBufferSource();
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < buffer.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.value = 3000;
    
    noise.buffer = buffer;
    noise.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + delay + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + 0.2);
    
    noise.start(audioContext.currentTime + delay);
    noise.stop(audioContext.currentTime + delay + 0.2);
  };
  
  // チャイム音
  const playChime = (delay: number) => {
    const notes = [659.25, 783.99]; // E5, G5
    
    notes.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + delay + (i * 0.15));
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay + (i * 0.15));
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + delay + 0.05 + (i * 0.15));
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + 0.6 + (i * 0.15));
      
      oscillator.start(audioContext.currentTime + delay + (i * 0.15));
      oscillator.stop(audioContext.currentTime + delay + 0.6 + (i * 0.15));
    });
  };
  
  playCardSound(0);
  playChime(0.25);
};

// シンプルな警告音
const playSimpleWarningSound = () => {
  try {
    const audioContext = getAudioContext();
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 低めの警告音
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(330, audioContext.currentTime); // E4音
    gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);

    oscillator.start();
    gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.6, audioContext.currentTime + 0.3);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
    oscillator.stop(audioContext.currentTime + 0.4);
  } catch (error) {
    console.error('シンプル警告音の再生に失敗しました:', error);
  }
};

// デジタル風の警告音
const playDigitalWarningSound = () => {
  try {
    const audioContext = getAudioContext();
    if (!audioContext) return;
    
    // ビープ音を連続で鳴らす
    for (let i = 0; i < 3; i++) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime + (i * 0.15));
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + (i * 0.15));
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 0.1 + (i * 0.15));
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.11 + (i * 0.15));
      
      oscillator.start(audioContext.currentTime + (i * 0.15));
      oscillator.stop(audioContext.currentTime + 0.11 + (i * 0.15));
    }
  } catch (error) {
    console.error('デジタル警告音の再生に失敗しました:', error);
  }
};

// カジノ/ポーカー風の警告音
const playCasinoWarningSound = () => {
  try {
    const audioContext = getAudioContext();
    if (!audioContext) return;
    
    // 1. チップが落ちる/スタックする音
    const playChipStackSound = () => {
      try {
        // 複数のチップ音を重ねる
        for (let i = 0; i < 3; i++) {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          filter.type = 'bandpass';
          filter.frequency.value = 2500 + (i * 500); // 異なる周波数で金属的な質感を表現
          filter.Q.value = 5;
          
          oscillator.connect(gainNode);
          gainNode.connect(filter);
          filter.connect(audioContext.destination);
          
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(800 + (i * 400), audioContext.currentTime + (i * 0.05));
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime + (i * 0.05));
          gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01 + (i * 0.05));
          gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1 + (i * 0.05));
          
          oscillator.start(audioContext.currentTime + (i * 0.05));
          oscillator.stop(audioContext.currentTime + 0.1 + (i * 0.05));
        }
      } catch (error) {
        console.error('チップ音の再生に失敗しました:', error);
      }
    };
    
    // 2. カードをめくる/シャッフルする音
    const playCardSound = (delay: number) => {
      try {
        const noise = audioContext.createBufferSource();
        const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        // ホワイトノイズを生成してカードの摩擦音を表現
        for (let i = 0; i < buffer.length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        filter.type = 'lowpass';
        filter.frequency.value = 4000;
        
        noise.buffer = buffer;
        noise.connect(gainNode);
        gainNode.connect(filter);
        filter.connect(audioContext.destination);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + delay + 0.02);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + 0.1);
        
        noise.start(audioContext.currentTime + delay);
        noise.stop(audioContext.currentTime + delay + 0.1);
      } catch (error) {
        console.error('カード音の再生に失敗しました:', error);
      }
    };
    
    // 3. 勝利音/ラウンド終了音
    const playVictorySound = (delay: number) => {
      try {
        // 上昇する音階で「ジャーン」という感じ
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6（メジャーコード）
        
        notes.forEach((freq, i) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + delay + (i * 0.08));
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay + (i * 0.08));
          gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + delay + 0.01 + (i * 0.08));
          gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + delay + 0.15 + (i * 0.08));
          gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + delay + 0.3 + (i * 0.08));
          
          oscillator.start(audioContext.currentTime + delay + (i * 0.08));
          oscillator.stop(audioContext.currentTime + delay + 0.3 + (i * 0.08));
        });
      } catch (error) {
        console.error('勝利音の再生に失敗しました:', error);
      }
    };
    
    // サウンドシーケンスを実行
    playChipStackSound();     // チップの音から始まり
    playCardSound(0.2);       // 0.2秒後にカードの音
    playVictorySound(0.4);    // 0.4秒後に勝利音（ラウンド終了）
  } catch (error) {
    console.error('カジノ警告音の再生に失敗しました:', error);
  }
}; 