import './PolicyPage.css';

const policyGroups = [
  {
    title: '일반 개인정보',
    count: 18,
    items: [
      '이름', '나이', '전화번호', '생년월일', '이메일', '국적',
      '주소', '성별', '직업', '주민등록번호', '여권번호',
      '외국인등록번호', '운전면허번호'
    ]
  },
  {
    title: '건강정보',
    count: 6,
    items: ['질병명', '신체장애', '장애등급', '혈액형', 'IQ', '복용약물']
  },
  {
    title: '신용정보',
    count: 7,
    items: ['계좌번호', '금액', '주문번호', '신용등급', 'CVV', '카드 유효기간', '은행명']
  },
  {
    title: '사회적 정보',
    count: 13,
    items: ['학점', '자격증', '학번', '학교명', '병역사항', '군번', '군 계급', '전역유형', '소속기관', '고용형태', '경력', '사원번호', '전과기록']
  },
  {
    title: '기타',
    count: 8,
    items: ['비밀번호', 'IP주소', 'MAC주소', 'URL', '날짜', '기간', '시간']
  }
];

const detectionRules = [
  {
    type: 'Regex',
    desc: '형식이 일정한 정보를 정규식으로 탐지합니다.',
    items: ['주민등록번호', '전화번호', '이메일', '카드번호', '계좌번호', 'IP 주소', '사업자등록번호', '여권번호']
  },
  {
    type: 'NER',
    desc: '문맥을 기반으로 의미 있는 정보를 탐지합니다.',
    items: ['사람 이름', '기관명', '지역명', '학교명', '회사명', '직업', '부서명']
  }
];

function PolicyPage() {
  return (
    <div className="policy-page fade-in">
      <section className="policy-hero">
        <span className="policy-badge">PreSend Guard Policy</span>
        <h1>개인정보 탐지 정책</h1>
        <p>
          사용자가 AI 프롬프트를 전송하기 전에 개인정보와 민감정보를 탐지하고,
          위험도에 따라 경고 또는 마스킹 처리를 제공합니다.
        </p>
      </section>

      <section className="policy-section">
        <div className="section-header">
          <h2>탐지 대상 정보</h2>
            <p>
                현행 개인정보보호법 제2조 제1호의 개인정보 정의를 출발점으로,
                실무에서 식별 가능성이 높은 정보를 중심으로 탐지 대상을 구성했습니다.
            </p>
        </div>

        <div className="policy-card-grid">
          {policyGroups.map((group) => (
            <div className="policy-card" key={group.title}>
              <div className="policy-card-header">
                <h3>{group.title}</h3>
                <span>{group.count}개</span>
              </div>
              <div className="policy-tag-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="policy-section">
        <div className="section-header">
          <h2>탐지 방식</h2>
          <p>정규식 기반 탐지와 문맥 기반 NER 탐지를 함께 사용합니다.</p>
        </div>

        <div className="detection-grid">
          {detectionRules.map((rule) => (
            <div className="detection-card" key={rule.type}>
              <h3>{rule.type}</h3>
              <p>{rule.desc}</p>
              <ul>
                {rule.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="policy-section">
        <div className="section-header">
          <h2>처리 정책</h2>
          <p>탐지 결과에 따라 사용자가 직접 전송 방식을 선택할 수 있습니다.</p>
        </div>

        <div className="action-flow">
          <div>프롬프트 입력</div>
          <span>→</span>
          <div>개인정보 탐지</div>
          <span>→</span>
          <div>위험도 분석</div>
          <span>→</span>
          <div>마스킹 / 원본전송 / 취소</div>
        </div>
      </section>
    </div>
  );
}

export default PolicyPage;