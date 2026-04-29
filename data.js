// v3
window.portfolioData = {
  "profile": {
    "title": "YH’s Experience Lab",
    "description": "하이브리드 인프라·클라우드 전문가, 조영현입니다.<br>온프레미스(HCI/VMware)부터 AWS·Azure·M365까지,<br>다양한 영역을 안정적으로 운영해온 경험을 갖추고 있습니다.",
    "icon": "fas fa-user",
    "imageUrl": "https://ifh.cc/g/xrpMQ3.jpg"
  },
  "about": {
    "paragraph1": "\"불가능이란 노력하지 않는 자들의 변명이다\"\n꾸준한 노력이 곧 성장이라 믿습니다.\n클라우드와 온프레미스를 아우르는 경험을 기반으로 안정적이면서도 혁신적인 IT 인프라를 만들어 가겠습니다.",
    "paragraph2": "네트워크(Juniper), 서버-ERP 관리, 보안 솔루션 운영, 그리고 HCI와 클라우드(AWS, Azure, M365)까지 이어지는 경험을 통해, 안정성과 확장성을 겸비한 하이브리드 인프라 역량을 갖추었습니다."
  },
  "skills": [
    {
      "id": 1,
      "title": "인프라 · 가상화",
      "description": "VMware vSphere/HCI, Hyper-V, AD/DNS/Exchange, Windows/Linux",
      "tags": [
        "HA 운영",
        "표준화"
      ],
      "icon": "fas fa-server"
    },
    {
      "id": 2,
      "title": "클라우드",
      "description": "AWS(EC2/VPC/S3/ELB/RDS/CloudFront/DX/RI), Azure, M365",
      "tags": [
        "비용 최적화",
        "정적 호스팅"
      ],
      "icon": "fas fa-cloud"
    },
    {
      "id": 3,
      "title": "보안 · 계정",
      "description": "DRM, MDM, 문서중앙화, EDR/백신, VPN/방화벽",
      "tags": [
        "감사 대응",
        "접근제어"
      ],
      "icon": "fas fa-shield-alt"
    },
    {
      "id": 4,
      "title": "네트워크",
      "description": "Cisco, Juniper, Routing/Switching, L3 백본 대개체",
      "tags": [
        "전환 다운타임!"
      ],
      "icon": "fas fa-network-wired"
    },
    {
      "id": 5,
      "title": "모니터링",
      "description": "Zabbix, Grafana, Polestar EMS",
      "tags": [
        "가시성",
        "장애 예방"
      ],
      "icon": "fas fa-desktop"
    },
    {
      "id": 6,
      "title": "DR · 백업",
      "description": "Veeam, AWS MGN — On-Prem → Cloud DR PoC",
      "tags": [
        "복구절차",
        "훈련체계"
      ],
      "icon": "fas fa-database"
    }
  ],
  "experience": [
    {
      "id": 1,
      "title": "프로",
      "company": "동화기업",
      "date": "2022.03.02 ~ 재직중",
      "description": "IT인프라(서버,cloud)"
    },
    {
      "id": 2,
      "title": "대리",
      "company": "한국쌀마스타",
      "date": "2016.10.13 ~ 2022.02.28",
      "description": "IT인프라관리"
    },
    {
      "id": 3,
      "title": "AM",
      "company": "아이크래프트",
      "date": "2014.12.08 ~ 2016.03.31",
      "description": "[담당 업무]\n- KT 코넷망 대상 네트워크 장비 운영 및 유지보수 담당\n- 백본(L3) 라우터 대개체 작업 수행 및 현장 기술 지원\n\n[핵심 수행 업무]\n- Juniper 장비 기반 L3 백본 라우터 구성 및 설정\n- KT 주요 국사(혜화, 구로, 행당, 광화문, 수원, 익산, 거제 등) 장비 대개체 작업 수행\n- 작업 계획서, 구성(Config) 문서, 선번장 작성 및 협력사 공유를 통한 작업 절차 정리\n- 현장 회선 테스트 및 사전 컨피그 업로드 수행\n- Cisco 저사양 장비 → Juniper 고사양 장비(T-Series) 업그레이드 작업\n\n[주요 성과]\n- 백본 라우터 대개체 프로젝트 참여를 통해 대규모 네트워크 환경 변경 작업 경험 확보\n- 사전 계획·점검 기반 작업 수행으로 장애 발생 없이 안정적인 전환 완료\n- 네트워크 이론을 현장 환경에 적용하며 실무 중심의 문제 해결 역량 강화"
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "KT 코넷망 라우터 대개체",
      "company": "아이크래프트",
      "period": "2014.08 ~ 2016.01",
      "emoji": "🌐",
      "summary": "Cisco → Juniper L3 백본 라우터 전환, 10개 국소 200Gbps 무중단 대개체",
      "tags": [
        {
          "label": "Juniper",
          "color": "teal"
        },
        {
          "label": "BGP/ISIS"
        },
        {
          "label": "L3"
        }
      ],
      "role": "라우터 대개체 작업을 위한 사전 작업 및 본작업 수행",
      "details": [
        {
          "section": "주요 내용",
          "items": [
            "L3 라우터 벤더 변경 (기존 Cisco → 신규 Juniper) 및 장비 교체 수행",
            "사전 작업 수행 — 설정도, 회선도, 체크리스트, 작업계획서 작성 및 검증",
            "ISIS/BGP/OSPF 기반 트래픽 우회 및 단계적 절체 수행",
            "트래픽 우회 및 라우팅 재연동을 통한 무중단 전환 수행",
            "작업 모니터링 및 Trouble-Shooting 수행"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "KT 코넷 국내외 사업장 총 10개 국소 대개체 작업 완료 (혜화, 구로, 강북, 양재, 거제, 익산, 수원, 모란, 중국프리미엄, 코넷 POP 등)",
            "업링크 트래픽 처리 용량 평균 200Gbps 수준으로 증설",
            "사전 Config 검증 및 단계적 절체를 통해 장애 없이 트래픽 전환 완료",
            "이중화 구조 기반(Active/Standby) 운영으로 장애 발생 시 서비스 영향 최소화"
          ]
        }
      ],
      "what": [
        "L3 라우터 벤더 변경 (Cisco → Juniper) 및 장비 교체 수행",
        "ISIS/BGP/OSPF 기반 트래픽 우회 및 단계적 절체",
        "사전 Config 검증 및 작업계획서 작성"
      ],
      "result": [
        "10개 국소 대개체 작업 장애 없이 완료",
        "업링크 트래픽 처리 용량 평균 200Gbps 증설",
        "Active/Standby 이중화 기반 서비스 영향 최소화"
      ],
      "image": "proj_01_kt_router.png"
    },
    {
      "id": 2,
      "title": "KSM 그룹 전사 IT 인프라 구축",
      "company": "한국씰마스타",
      "period": "2016.12 ~ 2022.01",
      "emoji": "🏢",
      "summary": "전 계열사 서버·네트워크 구축, 물리 서버 30대 → 가상 서버 1대 통합, MES 120대 연동",
      "tags": [
        {
          "label": "AD",
          "color": "blue"
        },
        {
          "label": "Hyper-V"
        },
        {
          "label": "MES"
        }
      ],
      "role": "KSM그룹 전 계열사 서버·네트워크 인프라 구축 및 장애 대응 담당",
      "details": [
        {
          "section": "주요 내용",
          "items": [
            "KSM 그룹 전 계열사 IBM 메인 서버 신규 구축 및 운영",
            "AD(Active Directory) 서버 계정·그룹 정책 설계 및 운영",
            "신규 사업장 전산실 구축 및 운영 (김포 본사, 서울 사무소 등)",
            "MES(제조실행시스템) 도입을 위한 서버·스토리지 인프라 구성",
            "AD · Exchange 하이브리드 업그레이드 추진",
            "노후 물리 서버 가상화 전환 추진",
            "IT관리팀 아웃소싱 운영 체계 구축"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "그룹 계열사 IT 인프라 담당자로 약 5년간 안정적 운영 유지",
            "전 계열사 AD 운영 정책 표준화 관리 체계 정립",
            "안정적 MES 도입으로 약 120대 공정 시스템 네트워크 연동",
            "노후 물리 서버 30대를 가상 서버 1대로 통합 구축",
            "AD · Exchange 하이브리드 구성 업그레이드 완료",
            "아웃소싱 도입으로 저부가가치 업무 분리 및 내부 인력 핵심 업무 집중도 향상"
          ]
        }
      ],
      "what": [
        "전 계열사 IBM 메인 서버 신규 구축 및 AD 운영",
        "MES 도입을 위한 서버·스토리지 인프라 구성",
        "노후 물리 서버 가상화 전환"
      ],
      "result": [
        "물리 서버 30대 → 가상 서버 1대로 통합",
        "MES 도입으로 120대 공정 시스템 네트워크 연동",
        "5년간 안정적 운영 유지"
      ],
      "image": "proj_02_ksm_infra.png"
    },
    {
      "id": 3,
      "title": "전사 보안 솔루션 도입 및 통합 운영",
      "company": "한국씰마스타",
      "period": "2016.12 ~ 2022.01",
      "emoji": "🔒",
      "summary": "1,000대 Endpoint DRM·DLP·EDR 통합 구축 및 3중 백업 구조 설계",
      "tags": [
        {
          "label": "DRM",
          "color": "amber"
        },
        {
          "label": "DLP",
          "color": "amber"
        },
        {
          "label": "MDM"
        }
      ],
      "role": "KSM그룹 전 계열사 보안 솔루션 도입 · 운영 · 정책 수립",
      "details": [
        {
          "section": "주요 내용",
          "items": [
            "백신 운영 체계 구축 — Kaspersky 중앙 관리 서버 구축 및 전사 배포, ESET 전환 수행",
            "문서 보안 강화 — Fasoo DRM 도입 및 문서 암호화 정책 수립·운영",
            "데이터 유출 통제 — Waterwall DLP 기반 반출 통제 정책 설계 및 관리",
            "랜섬웨어 대응 — AppCheck 도입 및 전사 단말 실시간 보호 체계 구축",
            "단말 보안 관리 — MDM 기반 모바일 기기 통제 및 원격 삭제 운영",
            "문서 중앙화 — mCloudoc 도입 및 전 계열사 문서 통합 관리 체계 구축",
            "출력 보안 — PMS 기반 프린터 중앙 관리 및 출력 통제 환경 구축",
            "백업 체계 구축 — ShadowProtect·Carbonite·Acronis 기반 3중 백업 구조 설계 및 운영",
            "보안 운영 체계 — 신규 입사자 교육 및 퇴직자 보안 점검 프로세스 운영"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "전 계열사 1,000대 Endpoint 대상 보안 체계 통합 구축 및 운영 표준화",
            "백신·DRM·DLP 연계를 통한 데이터 유출 통제 체계 확립",
            "랜섬웨어 실시간 탐지·차단 기반 위협 대응 체계 구축",
            "스냅샷·실시간·아카이빙 기반 3계층 백업 구조 설계 및 안정성 확보",
            "퇴직자 보안 점검 프로세스 정립으로 내부 정보 유출 리스크 최소화",
            "중앙 관리 및 라이선스 통합으로 운영 효율 및 비용 최적화"
          ]
        }
      ],
      "what": [
        "Fasoo DRM 도입 및 문서 암호화 정책 수립",
        "Waterwall DLP 기반 반출 통제",
        "AppCheck 랜섬웨어 실시간 보호",
        "3중 백업 구조 설계"
      ],
      "result": [
        "1,000대 Endpoint 보안 체계 통합 구축",
        "데이터 유출 통제 체계 확립",
        "퇴직자 보안 점검 프로세스 정립"
      ],
      "image": "proj_03_security.png"
    },
    {
      "id": 4,
      "title": "보안 침해 사고 대응",
      "company": "동화기업",
      "period": "2024.01 ~ 2024.03",
      "emoji": "🚨",
      "summary": "AD 마비 침해사고 자체 복구, AD 물리 이중화 전환 및 서버 접근제어 구축",
      "tags": [
        {
          "label": "AD"
        },
        {
          "label": "접근제어",
          "color": "red"
        },
        {
          "label": "보안",
          "color": "red"
        }
      ],
      "role": "보안 침해사고 대응 및 재발 방지 인프라 구축 담당",
      "details": [
        {
          "section": "보안 침해 대응 및 서비스 복구",
          "items": [
            "AD 정책 마비로 인한 도메인 PC 통신 장애 및 전사 공정 중단 상황 대응",
            "서버·계정·네트워크 복구를 통한 전사 서비스 정상화"
          ]
        },
        {
          "section": "AD 인프라 구조 개선",
          "items": [
            "주 공격 대상이었던 AD 가상 서버를 물리 서버 기반으로 전환",
            "Active-Active sync 구성으로 이중화 완성",
            "국내/외 사용자 AD 계정 운영 기준 및 가입 가이드 정립"
          ]
        },
        {
          "section": "서버 접근 통제 체계 구축",
          "items": [
            "서버 접근제어 솔루션 신규 도입 및 운영",
            "해킹 경로 분석 및 취약 구조 개선",
            "비인가 접근 차단 체계 구축",
            "인프라·계정·접근 영역 보안 통제 강화 및 재발 방지 프로세스 개선"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "전사 AD 마비 상황에서 자체 대응으로 서비스 정상화 및 생산 공정 복구",
            "외부 공격자 요구 없이 내부 대응만으로 침해사고 완전 복구",
            "AD 인프라 물리 이중화 전환으로 서비스 안정성 및 보안성 확보",
            "서버 접근제어 도입으로 RDP 및 서버 간 비인가 접근 경로 차단",
            "재발 방지 중심의 보안 운영 체계 구축"
          ]
        }
      ],
      "what": [
        "AD 마비 침해사고 자체 대응 및 서비스 복구",
        "AD 물리 서버 Active-Active 이중화 전환",
        "서버 접근제어 솔루션 신규 도입"
      ],
      "result": [
        "내부 대응만으로 침해사고 완전 복구",
        "AD 물리 이중화로 안정성 및 보안성 확보",
        "RDP 비인가 접근 경로 차단"
      ],
      "image": "proj_04_breach.png"
    },
    {
      "id": 5,
      "title": "통합 모니터링 구축",
      "company": "동화기업",
      "period": "2023.01 ~ 2023.06",
      "emoji": "📊",
      "summary": "Zabbix·Grafana·CloudWatch 연동으로 IDC·멀티 클라우드 단일 대시보드 통합",
      "tags": [
        {
          "label": "Zabbix",
          "color": "teal"
        },
        {
          "label": "Grafana",
          "color": "teal"
        },
        {
          "label": "CloudWatch"
        }
      ],
      "role": "동화그룹 IDC 및 클라우드 통합 모니터링 환경 구축·운영",
      "details": [
        {
          "section": "모니터링 환경 통합",
          "items": [
            "Zabbix 서버 버전 업그레이드 (v4.4.5 → v6.0.4)",
            "IDC 서버·네트워크 통합 관제 구성"
          ]
        },
        {
          "section": "시각화 및 클라우드 관제",
          "items": [
            "Grafana와 Zabbix·CloudWatch 연동 통합 대시보드 구축",
            "AWS CloudWatch·Azure를 Grafana와 연동하여 멀티 클라우드 통합 관제 구현",
            "Azure AD와 Grafana 연동으로 단일 계정 관리 체계 구축"
          ]
        },
        {
          "section": "알람 체계 개선",
          "items": [
            "Zabbix 기반 Teams·메일 알람 구성 (포스타 SMS 서비스 대체)",
            "Zabbix 템플릿·Grafana 대시보드 튜닝으로 필수 알람만 수신",
            "알람 최적화로 노이즈 제거 및 장애 초기 대응 속도 향상"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "IDC·네트워크·클라우드 분산 관제 환경을 단일 Grafana 대시보드로 통합",
            "AWS·Azure 멀티 클라우드 통합 관제로 전체 현황 즉시 확인 가능",
            "알람 튜닝을 통한 노이즈 제거로 장애 초기 대응 속도 향상"
          ]
        }
      ],
      "what": [
        "Zabbix v4→v6 업그레이드, IDC 통합 관제",
        "Grafana + CloudWatch·Azure 멀티 클라우드 대시보드",
        "Teams·메일 알람 구성 및 튜닝"
      ],
      "result": [
        "IDC·클라우드 단일 대시보드 통합",
        "알람 튜닝으로 장애 초기 대응 속도 향상"
      ],
      "image": "proj_05_monitoring.png"
    },
    {
      "id": 6,
      "title": "AWS MGN DR 구성",
      "company": "동화기업",
      "period": "2022.03 ~ 2022.08",
      "emoji": "☁️",
      "summary": "IDC-AWS 하이브리드 DR 설계, 서버 6대 무중단 복제 및 절체 검증",
      "tags": [
        {
          "label": "AWS MGN",
          "color": "blue"
        },
        {
          "label": "VPN",
          "color": "blue"
        },
        {
          "label": "EC2",
          "color": "blue"
        }
      ],
      "role": "IDC-AWS 하이브리드 DR 환경 설계 및 구축 담당",
      "details": [
        {
          "section": "DR 환경 설계 및 구성",
          "items": [
            "IDC-AWS 하이브리드 구조 기반 DR 아키텍처 설계",
            "AWS MGN을 활용한 온프레미스 서버 복제 및 클라우드 전환 구성",
            "총 6대(개발 2 + 운영 4) DR 환경 구성",
            "DR 절체 테스트 시나리오 수립 및 검증 수행"
          ]
        },
        {
          "section": "네트워크 구성",
          "items": [
            "Site-to-Site VPN 기반 IDC-AWS 간 네트워크 연결",
            "보안 그룹 및 라우팅 테이블 설계"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "IDC-AWS 하이브리드 DR 환경 구성으로 비즈니스 연속성 확보",
            "DR 절체 테스트 수행 및 복구 절차 표준화로 장애 대응 체계 수립",
            "AWS MGN 활용으로 온프레미스 환경 무중단 복제 및 전환 완료"
          ]
        }
      ],
      "what": [
        "IDC-AWS 하이브리드 DR 아키텍처 설계",
        "AWS MGN으로 서버 6대 복제 및 DR 환경 구성",
        "Site-to-Site VPN 기반 네트워크 연결"
      ],
      "result": [
        "비즈니스 연속성 확보",
        "DR 절체 테스트 수행 및 복구 절차 표준화",
        "무중단 복제 및 전환 완료"
      ],
      "image": "proj_06_aws_mgn.png"
    },
    {
      "id": 7,
      "title": "S4HANA 고도화 AWS 인프라 지원",
      "company": "동화기업",
      "period": "2022.03 ~ 재직중",
      "emoji": "🗄️",
      "summary": "SAP ERP 전환 AWS 인프라 지원, EC2 스냅샷 백업·복구 자동화",
      "tags": [
        {
          "label": "EC2",
          "color": "blue"
        },
        {
          "label": "RDS Aurora",
          "color": "blue"
        },
        {
          "label": "SAP"
        }
      ],
      "role": "SAP ERP 고도화 프로젝트 AWS 인프라 지원 담당",
      "details": [
        {
          "section": "인프라 지원",
          "items": [
            "S4HANA 고도화 전환 기간 중 AWS 인프라 지원 및 안정화",
            "ERP 관통 테스트 환경 구성 및 반복 테스트 지원"
          ]
        },
        {
          "section": "백업·복구 체계 구축",
          "items": [
            "테스트용 EC2 이미지 백업·복구 프로세스 수립",
            "EC2 스냅샷 정책 설계 및 관리 자동화"
          ]
        },
        {
          "section": "DB 운영 지원",
          "items": [
            "RDS Aurora PostgreSQL 운영 및 성능 모니터링",
            "테스트 환경 DB 복제 및 초기화 프로세스 운영"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "S4HANA 고도화 프로젝트 인프라 지원으로 ERP 전환 안정성 기여",
            "EC2 스냅샷 기반 백업·복구 체계 구축으로 테스트 환경 신속 복원 가능",
            "반복 테스트 환경 자동화로 테스트 사이클 단축 및 운영 효율화"
          ]
        }
      ],
      "what": [
        "S4HANA 고도화 AWS 인프라 지원 및 안정화",
        "EC2 스냅샷 정책 설계 및 자동화",
        "RDS Aurora PostgreSQL 운영"
      ],
      "result": [
        "ERP 전환 안정성 기여",
        "테스트 환경 신속 복원",
        "반복 테스트 사이클 단축"
      ],
      "image": "proj_07_s4hana.png"
    },
    {
      "id": 8,
      "title": "ITSM AWS 인프라 아키텍처 구성",
      "company": "동화기업",
      "period": "2022.03 ~ 재직중",
      "emoji": "⚙️",
      "summary": "ECS·ALB·Aurora 기반 DEV/PRD 분리 구성, CodePipeline CI/CD 자동화",
      "tags": [
        {
          "label": "ECS",
          "color": "blue"
        },
        {
          "label": "CodePipeline",
          "color": "blue"
        },
        {
          "label": "Docker"
        }
      ],
      "role": "신규 ITSM 시스템 AWS 인프라 설계 및 구축 담당",
      "details": [
        {
          "section": "인프라 아키텍처 설계",
          "items": [
            "ECS/EC2, ALB, Aurora PostgreSQL, S3, Amplify, CodePipeline 활용 아키텍처 설계",
            "고가용성 및 확장성을 고려한 멀티 레이어 구조 구성"
          ]
        },
        {
          "section": "환경 분리 및 CI/CD 구성",
          "items": [
            "DEV/PRD 환경 분리 구성 및 배포 파이프라인 구축",
            "CodePipeline 기반 CI/CD 자동화 구성"
          ]
        },
        {
          "section": "컨테이너 환경 구성",
          "items": [
            "ECS EC2 및 Fargate 기반 컨테이너 운영 환경 구축",
            "Docker 이미지 빌드·배포 프로세스 표준화"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "ITSM DEV/PRD 인프라 아키텍처 설계 및 구성 완료",
            "CodePipeline 기반 CI/CD 자동화로 배포 프로세스 표준화 및 운영 효율화",
            "ECS Fargate 도입으로 인프라 관리 부담 절감 및 컨테이너 환경 안정화"
          ]
        }
      ],
      "what": [
        "ECS·ALB·Aurora 기반 아키텍처 설계",
        "DEV/PRD 분리 및 CodePipeline CI/CD",
        "ECS Fargate 컨테이너 환경 구축"
      ],
      "result": [
        "CI/CD 자동화로 배포 프로세스 표준화",
        "ECS Fargate 도입으로 인프라 관리 부담 절감"
      ],
      "image": "proj_08_itsm.png"
    },
    {
      "id": 9,
      "title": "AWS Direct Connect 전환",
      "company": "동화기업",
      "period": "2022.03 ~ 재직중",
      "emoji": "🔗",
      "summary": "VPN → DX 무중단 전환, BGP 재구성 및 이중화 네트워크 구현",
      "tags": [
        {
          "label": "Direct Connect",
          "color": "blue"
        },
        {
          "label": "BGP"
        },
        {
          "label": "VGW"
        }
      ],
      "role": "IDC-AWS 간 네트워크 Direct Connect 전환 담당",
      "details": [
        {
          "section": "DX 전환 설계",
          "items": [
            "기존 Site-to-Site VPN에서 Direct Connect로 전환 아키텍처 설계",
            "무중단 전환을 위한 이중화 전환 절차 수립"
          ]
        },
        {
          "section": "네트워크 재구성",
          "items": [
            "VGW·BGP 재구성 및 라우팅 테이블 전환",
            "IDC-AWS 간 전용선 기반 안정적 네트워크 연결 구성"
          ]
        },
        {
          "section": "전환 검증",
          "items": [
            "전환 후 네트워크 성능·안정성 테스트 수행",
            "Failover 시나리오 기반 이중화 검증 수행"
          ]
        },
        {
          "section": "핵심 성과",
          "items": [
            "DX 전환으로 클라우드 네트워크 안정성 및 전용선 기반 대역폭 확보",
            "BGP 재구성을 통한 라우팅 최적화 및 네트워크 이중화 구현",
            "무중단 전환 절차 수립 및 수행으로 서비스 영향 없이 전환 완료"
          ]
        }
      ],
      "what": [
        "VPN → Direct Connect 전환 아키텍처 설계",
        "VGW·BGP 재구성 및 라우팅 테이블 전환",
        "Failover 시나리오 기반 검증"
      ],
      "result": [
        "전용선 기반 네트워크 안정성 확보",
        "라우팅 최적화 및 이중화 구현",
        "서비스 영향 없이 전환 완료"
      ],
      "image": "proj_09_dx.png"
    }
  ],
  "contact": {
    "email": "joy8256@naver.com",
    "phone": "010-0000-0000",
    "location": "대한민국",
    "github": "https://www.saramin.co.kr",
    "linkedin": "https://rememberapp.co.kr/",
    "twitter": "https://www.jobkorea.co.kr/"
  }
};
