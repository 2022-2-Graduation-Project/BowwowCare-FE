export const en2koDictEmotionVerb = {
  HAPPY: "행복해하고",
  RELAXED: "안정감을 느끼고",
  SAD: "슬퍼하고",
  ANGRY: "화나",
};

export const questions = {
    "SAD": [
        {
            id: "1",
            question:"보호자와 떨어져 혼자 남겨지거나 낯선 장소에 있을 때 였나요?",
            options: ['아니요', '예']
        },
        {
            id: "2",
            question:"혼날 때 였나요?",
            options: ['아니요', '예']
        },
        {
            id: "3",
            question:"차에 타 있을 때 였나요?",
            options: ['아니요', '예']
        },
        {
            id: "4",
            question:"빗질/발톱깎기/목욕 등 위생 관리를 할 때였나요?",
            options: ['아니요', '예']
        },
        {
            id: "5",
            question:"낯선 소리가 나거나 낯선 사람을 봤을 때 였나요?",
            options: ['아니요', '예']
        }    
    ],
    "HAPPY": [

    ]
};

export const solutions = {
    "SAD": [
        {
            id: "1",
            question:"떨어져있었어요",
            solution: "보호자의 향이 담긴 옷이나 담요를 덮어주세요."
        },
        {
            id: "2",
            question:"혼났어요",
            solution: "강아지는 소리보다 손짓에 더 민감하므로 격한 제스처는 줄여주세요"
        },
        {
            id: "3",
            question:"차에 탔어요",
            solution: "TTouch 마사지를 해보세요"
        },
        {
            id: "4",
            question:"위생관리할 때 였어요",
            solution: "목욕을 싫어하지 않도록 먼저 샴푸를 쓰지 않는 목욕을 목표로 도전해보세요"
        },
        {
            id: "5",
            question:"낯선 소리가 나거나 낯선 상황이었어요",
            solution: "교육(앉아, 기다려)이 필요하고 교육을 잘 받으면 보상으로 간식을 주세요"
        }
    ],
    "HAPPY": [

    ]
};

export const behaviorType = [
    "행동 준비 단계 : 스트레스 반응", 
    "행동 준비 단계 : 집중하기", 
    "극단적 행동 단계 : 방어준비"
];

export const colorVariants = {
    text0: 'text-aggression0',
    bg0: 'bg-aggression0',
    border0: 'border-aggression0',
    text1: 'text-aggression1',
    bg1: 'bg-aggression1',
    border1: 'border-aggression1',
    text2: 'text-aggression2',
    bg2: 'bg-aggression2',
    border2: 'border-aggression2',
    textprimary:'text-primary-theme',
    textsecondary:'text-secondary-theme',
    textthird:'text-third-theme',
    bgprimary:'bg-primary-theme',
    bgprimarys:'bg-primary-theme-s',
    bgsecondary:'bg-secondary-theme',
    bgsecondarys:'bg-secondary-theme-s',
    bgthird:'bg-third-theme',
    bgthirds:'bg-third-theme-s',
    borderprimary:'border-primary-theme',
    bordersecondary:'border-secondary-theme',
    borderthird:'border-third-theme',
    ringprimary:'ring-primary-theme',
    ringsecondary:'ring-secondary-theme',
    ringthird:'ring-third-theme',
    accentprimary:'accent-primary-theme',
    accentsecondary:'accent-secondary-theme',
    accentthird:'accent-third-theme'
}
