// ==========================================
// 게임 상태
// ==========================================
let gameState = {
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    killCount: 0,
    totalDamage: 0,
    inBattle: false,
    monster: null
};

// ==========================================
// 몬스터 데이터
// ==========================================
const monsterData = [
    { name: '알고몬', image: 'img/monsters/algomon.png' },
    { name: '리즘몬', image: 'img/monsters/rithmmon.png' },
    { name: '데베몬', image: 'img/monsters/dabamon.png' },
    { name: '자료몬', image: 'img/monsters/datamon.png' },
    { name: '구조몬', image: 'img/monsters/structmon.png' },
    { name: '자바몬', image: 'img/monsters/javamon.png' },
    { name: '씨쁠몬', image: 'img/monsters/cppmon.png' },
    { name: '인활몬', image: 'img/monsters/inhwalmon.png' }
];

// ==========================================
// 초기화
// ==========================================
window.onload = function() {
    loadGame();
    updateUI();
};

// ==========================================
// 게임 저장/로드
// ==========================================
function saveGame() {
    const saveData = {
        level: gameState.level,
        exp: gameState.exp,
        killCount: gameState.killCount,
        totalDamage: gameState.totalDamage
    };
    localStorage.setItem('textRPG_save', JSON.stringify(saveData));
}

function loadGame() {
    const saved = localStorage.getItem('textRPG_save');
    if (saved) {
        const data = JSON.parse(saved);
        gameState.level = data.level;
        gameState.exp = data.exp;
        gameState.killCount = data.killCount;
        gameState.totalDamage = data.totalDamage;
        
        addLog('💾 저장된 게임을 불러왔습니다!', 'info');
    }
}

function resetGame() {
    if (confirm('정말로 게임을 초기화하시겠습니까?')) {
        localStorage.removeItem('textRPG_save');
        gameState = {
            level: 1,
            exp: 0,
            expToNextLevel: 100,
            killCount: 0,
            totalDamage: 0,
            inBattle: false,
            monster: null
        };
        
        // 로그 초기화
        const logContainer = document.getElementById('logContainer');
        logContainer.innerHTML = `
            <div class="log-message welcome">🎮 게임이 초기화되었습니다!</div>
            <div class="log-message info">탐험을 시작하여 몬스터를 처치하세요.</div>
        `;
        
        updateUI();
        hideMonster();
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('attackBtn').disabled = true;
    }
}

// ==========================================
// UI 업데이트
// ==========================================
function updateUI() {
    // 플레이어 상태 업데이트
    document.getElementById('playerLevel').textContent = gameState.level;
    document.getElementById('expText').textContent = `${gameState.exp} / ${gameState.expToNextLevel}`;
    document.getElementById('killCount').textContent = gameState.killCount;
    document.getElementById('totalDamage').textContent = gameState.totalDamage.toLocaleString();
    
    // 경험치 바
    const expPercentage = (gameState.exp / gameState.expToNextLevel) * 100;
    document.getElementById('expBar').style.width = expPercentage + '%';
    
    // 몬스터 상태 업데이트
    if (gameState.monster) {
        updateMonsterUI();
    }
}

function updateMonsterUI() {
    const monster = gameState.monster;
    
    document.getElementById('monsterImage').src = monster.image;
    document.getElementById('monsterName').textContent = monster.name;
    document.getElementById('monsterCurrentHp').textContent = monster.currentHp;
    document.getElementById('monsterMaxHp').textContent = monster.maxHp;
    document.getElementById('monsterHpText').textContent = `${monster.currentHp} / ${monster.maxHp}`;
    
    // HP 바
    const hpPercentage = (monster.currentHp / monster.maxHp) * 100;
    document.getElementById('monsterHpBar').style.width = hpPercentage + '%';
}

// ==========================================
// 로그 추가
// ==========================================
function addLog(message, type = 'info') {
    const logContainer = document.getElementById('logContainer');
    const logMessage = document.createElement('div');
    logMessage.className = `log-message ${type}`;
    logMessage.textContent = message;
    
    logContainer.appendChild(logMessage);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// ==========================================
// 탐험 시작
// ==========================================
function startAdventure() {
    if (gameState.inBattle) {
        addLog('⚠️ 이미 전투 중입니다!', 'info');
        return;
    }
    
    // 랜덤 몬스터 선택
    const randomMonster = monsterData[Math.floor(Math.random() * monsterData.length)];
    gameState.monster = {
        name: randomMonster.name,
        image: randomMonster.image,
        maxHp: 100,
        currentHp: 100
    };
    
    gameState.inBattle = true;
    
    // UI 업데이트
    showMonster();
    addLog(`🎯 반야관에서 ${randomMonster.name}이(가) 나타났다!`, 'new-monster');
    
    // 버튼 상태 변경
    document.getElementById('startBtn').disabled = true;
    document.getElementById('attackBtn').disabled = false;
}

// ==========================================
// 공격
// ==========================================
function attack() {
    if (!gameState.inBattle || !gameState.monster) {
        return;
    }
    
    const monster = gameState.monster;
    
    // 랜덤 데미지 (1~50)
    const damage = Math.floor(Math.random() * 50) + 1;
    monster.currentHp -= damage;
    gameState.totalDamage += damage;
    
    // 데미지 로그
    addLog(`⚔️ ${monster.name}에게 ${damage} 데미지를 입혔다!`, 'attack');
    
    if (monster.currentHp <= 0) {
        monster.currentHp = 0;
        defeatMonster();
    }
    
    updateUI();
    saveGame();
}

// ==========================================
// 몬스터 처치
// ==========================================
function defeatMonster() {
    const monster = gameState.monster;
    
    // 랜덤 경험치 (1~10)
    const expGain = Math.floor(Math.random() * 10) + 1;
    gameState.exp += expGain;
    gameState.killCount++;
    
    addLog(`💀 ${monster.name}을(를) 처치했다! (경험치 +${expGain})`, 'defeat');
    
    // 레벨업 체크
    if (gameState.exp >= gameState.expToNextLevel) {
        levelUp();
    }
    
    // 전투 종료
    gameState.inBattle = false;
    gameState.monster = null;
    
    // UI 업데이트
    hideMonster();
    updateUI();
    
    // 버튼 상태 변경
    document.getElementById('startBtn').disabled = false;
    document.getElementById('attackBtn').disabled = true;
    
    saveGame();
}

// ==========================================
// 레벨업
// ==========================================
function levelUp() {
    if (gameState.level >= 100) {
        addLog('🎊 최고 레벨에 도달했습니다!', 'levelup');
        return;
    }
    
    const oldLevel = gameState.level;
    
    while (gameState.exp >= gameState.expToNextLevel && gameState.level < 100) {
        gameState.exp -= gameState.expToNextLevel;
        gameState.level++;
    }
    
    const levelGain = gameState.level - oldLevel;
    
    addLog(`✨ 레벨 업! Lv.${oldLevel} → Lv.${gameState.level}`, 'levelup');
    
    if (gameState.level === 100) {
        addLog('🎉 축하합니다! 최고 레벨에 도달했습니다!', 'levelup');
    }
}

// ==========================================
// 몬스터 표시/숨김
// ==========================================
function showMonster() {
    document.getElementById('monsterDisplay').style.display = 'none';
    document.getElementById('monsterInfo').style.display = 'block';
    updateMonsterUI();
}

function hideMonster() {
    document.getElementById('monsterDisplay').style.display = 'flex';
    document.getElementById('monsterInfo').style.display = 'none';
}