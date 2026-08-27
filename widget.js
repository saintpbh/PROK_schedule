/**
 * PROK Calendar Apple Widget Component
 * 한국기독교장로회 총회 일정 애플 스타일 임베드 위젯
 * (c) 2026 PROK Calendar
 */
(function() {
  'use strict';

  // Default Fallback Schedule Data (2026)
  const FALLBACK_DATA = [
  {
    "id": "csv-05-2026",
    "title": "2026년 5월 일정",
    "rows": [
      {
        "id": "csv_1_bz4sn",
        "date": "05.01(금)",
        "time": "종일일정",
        "title": "근로자의 날",
        "dept": ""
      },
      {
        "id": "csv_2_ujdbz",
        "date": "05.03(일)",
        "time": "종일일정",
        "title": "교회교육주일(어린이·청소년 주일)",
        "dept": ""
      },
      {
        "id": "csv_3_2s0rb",
        "date": "05.04(월)",
        "time": "종일일정",
        "title": "연차휴가 김수용",
        "dept": ""
      },
      {
        "id": "csv_4_tko7v",
        "date": "",
        "time": "종일일정",
        "title": "연차휴가 문경임",
        "dept": ""
      },
      {
        "id": "csv_5_5fmqq",
        "date": "",
        "time": "종일일정",
        "title": "대체휴가 이성훈",
        "dept": ""
      },
      {
        "id": "csv_6_kyfeg",
        "date": "",
        "time": "종일일정",
        "title": "[총무]10:30 유지재단 농촌개발원소위원회",
        "dept": ""
      },
      {
        "id": "csv_7_6xx4t",
        "date": "",
        "time": "오전 09:30 ~ 오후 05:00",
        "title": "목회자 테니스 대회",
        "dept": ""
      },
      {
        "id": "csv_8_xul53",
        "date": "",
        "time": "오후 03:00 ~ 오후 05:00",
        "title": "한종사협정책제안토론회",
        "dept": ""
      },
      {
        "id": "csv_9_t36pb",
        "date": "05.05(화)",
        "time": "종일일정",
        "title": "어린이날",
        "dept": ""
      },
      {
        "id": "csv_10_nwnvz",
        "date": "05.06(수)",
        "time": "오전 11:00 ~ 오후 02:00",
        "title": "직원 아카데미 방문",
        "dept": ""
      },
      {
        "id": "csv_11_57zd1",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회(강사:금창락 목사)",
        "dept": ""
      },
      {
        "id": "csv_12_i0mmj",
        "date": "05.07(목)",
        "time": "종일일정",
        "title": "13시 신임 노회장.서기.회계 간담회(초대교회)",
        "dept": ""
      },
      {
        "id": "csv_13_k5svk",
        "date": "05.08(금)",
        "time": "종일일정",
        "title": "연차휴가 박애은",
        "dept": ""
      },
      {
        "id": "csv_14_c75vt",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:00",
        "title": "총회 목회자 수급 대책 특별위원회 2차 회의",
        "dept": ""
      },
      {
        "id": "csv_15_8k3pj",
        "date": "05.09(토)",
        "time": "종일일정",
        "title": "연무대교회 진중세례식",
        "dept": ""
      },
      {
        "id": "csv_16_093d6",
        "date": "05.11(월)",
        "time": "종일일정",
        "title": "대체휴가 윤치상",
        "dept": ""
      },
      {
        "id": "csv_17_vp5r1",
        "date": "",
        "time": "종일일정",
        "title": "연차휴가 박애은",
        "dept": ""
      },
      {
        "id": "csv_18_0ff7b",
        "date": "",
        "time": "오전 11:00 ~ 오후 12:00",
        "title": "재판국(초대교회)",
        "dept": ""
      },
      {
        "id": "csv_19_82ana",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:00",
        "title": "서울 상소건 재판국 증거조사위원(초대교회)",
        "dept": ""
      },
      {
        "id": "csv_20_zsqvj",
        "date": "",
        "time": "오후 02:00 ~ 오후 03:30",
        "title": "경북 재심건 재판국 증거조사위원(초대교회)",
        "dept": ""
      },
      {
        "id": "csv_21_3tdak",
        "date": "05.12(화)",
        "time": "종일일정",
        "title": "대체휴가 윤치상",
        "dept": ""
      },
      {
        "id": "csv_22_nnk50",
        "date": "",
        "time": "종일일정",
        "title": "[불참] (총회장) 미국 NCKPC 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_23_oilzk",
        "date": "",
        "time": "종일일정",
        "title": "[총회장설교, 총무인사] 여름중간지도자강습회",
        "dept": ""
      },
      {
        "id": "csv_24_q06m7",
        "date": "",
        "time": "오전 11:00 ~ 오후 03:00",
        "title": "여신도회 실행위원회(대회의실)",
        "dept": ""
      },
      {
        "id": "csv_25_4o6mo",
        "date": "05.13(수)",
        "time": "종일일정",
        "title": "[불참] (총회장) 미국 NCKPC 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_26_mrait",
        "date": "",
        "time": "종일일정",
        "title": "[총회장설교, 총무인사] 여름중간지도자강습회",
        "dept": ""
      },
      {
        "id": "csv_27_7i0ct",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회(양청교회 조남형 목사)",
        "dept": ""
      },
      {
        "id": "csv_28_zv299",
        "date": "05.14(목)",
        "time": "종일일정",
        "title": "[불참] (총회장) 미국 NCKPC 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_29_sz2ja",
        "date": "",
        "time": "오전 10:00 ~ 오후 02:00",
        "title": "홍콩 대학생 한국교회 소개",
        "dept": "박성국"
      },
      {
        "id": "csv_30_s5ae5",
        "date": "",
        "time": "오전 10:00 ~ 오전 11:00",
        "title": "공천위원회 4차 임시회",
        "dept": ""
      },
      {
        "id": "csv_31_38ev6",
        "date": "",
        "time": "오후 01:00 ~ 오후 04:30",
        "title": "헌법위원회 소위원(오송 전국장로회연합회 회의실)",
        "dept": ""
      },
      {
        "id": "csv_32_b5jqv",
        "date": "05.15(금)",
        "time": "종일일정",
        "title": "[불참] (총회장) 미국 NCKPC 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_33_oi0m2",
        "date": "",
        "time": "종일일정",
        "title": "COS",
        "dept": "박성국"
      },
      {
        "id": "csv_34_kr9ts",
        "date": "",
        "time": "오후 02:00 ~ 오후 03:30",
        "title": "신도위원회 각신도회임원회 연석회의",
        "dept": ""
      },
      {
        "id": "csv_35_hi6ke",
        "date": "05.16(토)",
        "time": "종일일정",
        "title": "COS",
        "dept": "박성국"
      },
      {
        "id": "csv_36_lewb4",
        "date": "",
        "time": "오후 01:00 ~ 오후 04:30",
        "title": "교회교육전문가과정(익산1)",
        "dept": ""
      },
      {
        "id": "csv_37_xg4db",
        "date": "05.17(일)",
        "time": "종일일정",
        "title": "COS",
        "dept": "박성국"
      },
      {
        "id": "csv_38_nt1rq",
        "date": "",
        "time": "오후 03:00 ~ 오후 09:00",
        "title": "교회교육전문가과정(정읍기본3)",
        "dept": ""
      },
      {
        "id": "csv_39_nnv6z",
        "date": "",
        "time": "오후 04:00 ~ 오후 06:00",
        "title": "5·18민주화운동 46주년 기념예배(전남·광주 5개 노회 주관)",
        "dept": ""
      },
      {
        "id": "csv_40_jkb7t",
        "date": "05.18(월)",
        "time": "종일일정",
        "title": "COS",
        "dept": "박성국"
      },
      {
        "id": "csv_41_u7wu8",
        "date": "",
        "time": "오전 11:00 ~ 오후 12:00",
        "title": "기장 5·18신학화 사업(전남·광주5개노회 주관)",
        "dept": ""
      },
      {
        "id": "csv_42_xvzxf",
        "date": "",
        "time": "오후 02:00 ~ 오후 03:30",
        "title": "5.18민주화운동 46주기 기념예배",
        "dept": ""
      },
      {
        "id": "csv_43_w4yhb",
        "date": "",
        "time": "오후 04:00 ~ 오후 06:00",
        "title": "5.18 민주묘역 참배(총회 임원)",
        "dept": ""
      },
      {
        "id": "csv_44_klvxx",
        "date": "05.19(화)",
        "time": "종일일정",
        "title": "13시 실행위원회(아가페홀)",
        "dept": ""
      },
      {
        "id": "csv_45_0eniw",
        "date": "",
        "time": "종일일정",
        "title": "11시 총회임원 회의(대회의실)",
        "dept": ""
      },
      {
        "id": "csv_46_qm1kf",
        "date": "",
        "time": "오전 11:00 ~ 오후 12:00",
        "title": "서대문선교회관개발사업을 위한 노회장ㆍ장로부총회장 초청 설명회",
        "dept": ""
      },
      {
        "id": "csv_47_b0qwb",
        "date": "",
        "time": "오후 04:00 ~ 오후 06:00",
        "title": "[총회장 총무] ncck 여성위원회 순회간담회",
        "dept": ""
      },
      {
        "id": "csv_48_ifa07",
        "date": "05.20(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "5.18 신학화 사례 발표회(강사:전남광주5개노회)",
        "dept": ""
      },
      {
        "id": "csv_49_u3axi",
        "date": "05.23(토)",
        "time": "오후 01:00 ~ 오후 04:30",
        "title": "교회교육전문가과정(익산2)",
        "dept": ""
      },
      {
        "id": "csv_50_ewkxl",
        "date": "05.24(일)",
        "time": "종일일정",
        "title": "석가탄신일",
        "dept": ""
      },
      {
        "id": "csv_51_rt3d0",
        "date": "05.25(월)",
        "time": "종일일정",
        "title": "석가탄신일 대체 공휴일",
        "dept": ""
      },
      {
        "id": "csv_52_w49ym",
        "date": "",
        "time": "종일일정",
        "title": "UCCP 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_53_7ml1z",
        "date": "05.26(화)",
        "time": "종일일정",
        "title": "UCCP 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_54_a0e03",
        "date": "",
        "time": "오전 11:00 ~ 오후 12:30",
        "title": "[총회장 격려사] 여신도회전국연합회 총회(3층 아가페홀)-11:40",
        "dept": ""
      },
      {
        "id": "csv_55_7na6f",
        "date": "05.27(수)",
        "time": "종일일정",
        "title": "UCCP 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_56_lrgt7",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회(푸른숲성산교회 최임성 목사)",
        "dept": ""
      },
      {
        "id": "csv_57_fai9u",
        "date": "05.28(목)",
        "time": "종일일정",
        "title": "UCCP 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_58_21z5b",
        "date": "",
        "time": "종일일정",
        "title": "선교정책협의회(예정)",
        "dept": ""
      },
      {
        "id": "csv_59_mgefu",
        "date": "",
        "time": "오전 10:00 ~ 오후 06:00",
        "title": "수련과정 수료예식과 파송예배",
        "dept": ""
      },
      {
        "id": "csv_60_0o2hh",
        "date": "05.29(금)",
        "time": "종일일정",
        "title": "선교정책협의회(예정)",
        "dept": ""
      },
      {
        "id": "csv_61_j2bsu",
        "date": "05.30(토)",
        "time": "오후 01:00 ~ 오후 04:30",
        "title": "교회교육전문가과정(익산3)",
        "dept": ""
      }
    ]
  },
  {
    "id": "csv-06-2026",
    "title": "2026년 6월 일정",
    "rows": [
      {
        "id": "csv_62_eao1h",
        "date": "06.01(월)",
        "time": "종일일정",
        "title": "6월 설교문 발송",
        "dept": "강원용"
      },
      {
        "id": "csv_63_6x3lv",
        "date": "06.02(화)",
        "time": "종일일정",
        "title": "구역 가정예배 교재 집필진 공동워크숍 4차",
        "dept": ""
      },
      {
        "id": "csv_64_xztt8",
        "date": "",
        "time": "종일일정",
        "title": "연차휴가 남소현(오후)",
        "dept": ""
      },
      {
        "id": "csv_65_pdja9",
        "date": "",
        "time": "종일일정",
        "title": "대체휴가 남소현(오전)",
        "dept": ""
      },
      {
        "id": "csv_66_0ks5z",
        "date": "06.03(수)",
        "time": "종일일정",
        "title": "지방선거",
        "dept": ""
      },
      {
        "id": "csv_67_swtia",
        "date": "06.04(목)",
        "time": "종일일정",
        "title": "연차휴가 남소현",
        "dept": ""
      },
      {
        "id": "csv_68_dfssi",
        "date": "06.05(금)",
        "time": "종일일정",
        "title": "연차휴가 남소현",
        "dept": ""
      },
      {
        "id": "csv_69_xv3fg",
        "date": "",
        "time": "종일일정",
        "title": "문정은 취임",
        "dept": "박성국"
      },
      {
        "id": "csv_70_7ge5u",
        "date": "06.06(토)",
        "time": "종일일정",
        "title": "현충일",
        "dept": ""
      },
      {
        "id": "csv_71_n72vq",
        "date": "06.08(월)",
        "time": "종일일정",
        "title": "선거후보자 등록",
        "dept": ""
      },
      {
        "id": "csv_72_cy85n",
        "date": "06.09(화)",
        "time": "종일일정",
        "title": "선거후보자 등록",
        "dept": ""
      },
      {
        "id": "csv_73_da9ff",
        "date": "06.10(수)",
        "time": "종일일정",
        "title": "선거후보자 등록",
        "dept": ""
      },
      {
        "id": "csv_74_js3w7",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회(강사:서울대학교병원 이대건 목사)",
        "dept": ""
      },
      {
        "id": "csv_75_dl5ty",
        "date": "06.11(목)",
        "time": "종일일정",
        "title": "총회 임원수련회(목포)",
        "dept": ""
      },
      {
        "id": "csv_76_k83kr",
        "date": "06.12(금)",
        "time": "종일일정",
        "title": "총회 임원수련회(목포)",
        "dept": ""
      },
      {
        "id": "csv_77_3v50d",
        "date": "06.13(토)",
        "time": "종일일정",
        "title": "총회 임원수련회(목포)",
        "dept": ""
      },
      {
        "id": "csv_78_qr3of",
        "date": "",
        "time": "종일일정",
        "title": "Baden Ecumenical Gathering",
        "dept": "박성국"
      },
      {
        "id": "csv_79_np8rt",
        "date": "",
        "time": "오후 01:00 ~ 오후 04:30",
        "title": "교회교육전문가과정(익산4)",
        "dept": ""
      },
      {
        "id": "csv_80_orper",
        "date": "06.14(일)",
        "time": "종일일정",
        "title": "Baden Ecumenical Gathering",
        "dept": "박성국"
      },
      {
        "id": "csv_81_xtgl6",
        "date": "",
        "time": "종일일정",
        "title": "총회 선교주일",
        "dept": ""
      },
      {
        "id": "csv_82_bau03",
        "date": "",
        "time": "종일일정",
        "title": "전국 동시다발 영적대각성집회",
        "dept": ""
      },
      {
        "id": "csv_83_onlkf",
        "date": "06.15(월)",
        "time": "종일일정",
        "title": "Baden Ecumenical Gathering",
        "dept": "박성국"
      },
      {
        "id": "csv_84_vh98x",
        "date": "",
        "time": "오후 03:00 ~ 오후 04:00",
        "title": "수련과정운영위원회",
        "dept": ""
      },
      {
        "id": "csv_85_asv8g",
        "date": "",
        "time": "오후 04:00 ~ 오후 05:00",
        "title": "고시위원회",
        "dept": ""
      },
      {
        "id": "csv_86_w55gc",
        "date": "06.16(화)",
        "time": "종일일정",
        "title": "Baden Ecumenical Gathering",
        "dept": "박성국"
      },
      {
        "id": "csv_87_2majd",
        "date": "",
        "time": "오전 09:30 ~ 오후 04:00",
        "title": "제2차 총회 목사고시",
        "dept": ""
      },
      {
        "id": "csv_88_z9359",
        "date": "06.17(수)",
        "time": "종일일정",
        "title": "Baden Ecumenical Gathering",
        "dept": "박성국"
      },
      {
        "id": "csv_89_6m01u",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "교회 합병 사례 발표회(아름다운상원교회 금은경 목사)",
        "dept": ""
      },
      {
        "id": "csv_90_p5j94",
        "date": "06.18(목)",
        "time": "종일일정",
        "title": "[한기장] 중간관리자 법인교육",
        "dept": ""
      },
      {
        "id": "csv_91_b12v6",
        "date": "",
        "time": "종일일정",
        "title": "[총회장, 총무] 노년교재 세미나(예정)",
        "dept": ""
      },
      {
        "id": "csv_92_cve5v",
        "date": "06.19(금)",
        "time": "종일일정",
        "title": "[한기장] 중간관리자 법인교육",
        "dept": ""
      },
      {
        "id": "csv_93_wjala",
        "date": "06.20(토)",
        "time": "오후 01:00 ~ 오후 04:30",
        "title": "교회교육전문가과정(익산5)",
        "dept": ""
      },
      {
        "id": "csv_94_6vmf2",
        "date": "06.22(월)",
        "time": "오전 11:00 ~ 오후 05:00",
        "title": "교육사기본과정-집필진 모임",
        "dept": ""
      },
      {
        "id": "csv_95_303qk",
        "date": "06.23(화)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_96_t9ovs",
        "date": "",
        "time": "종일일정",
        "title": "구역 가정예배 교재 집필진 공동워크숍 5차",
        "dept": ""
      },
      {
        "id": "csv_97_tvf5s",
        "date": "",
        "time": "종일일정",
        "title": "[총회장,총무]연합신도대회(신도위원회주관)/예정",
        "dept": ""
      },
      {
        "id": "csv_98_juscj",
        "date": "06.24(수)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_99_wuo2v",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회(강사:서울남노회 노숙인학교옹달샘 권영종 목사)",
        "dept": ""
      },
      {
        "id": "csv_100_tj8yx",
        "date": "06.25(목)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_101_vaiat",
        "date": "",
        "time": "종일일정",
        "title": "기장 성경공부 교재 시연 세미나",
        "dept": ""
      },
      {
        "id": "csv_102_g0v7i",
        "date": "06.26(금)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_103_6gb29",
        "date": "06.27(토)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_104_98b2y",
        "date": "06.28(일)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_105_ovr5x",
        "date": "06.29(월)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_106_l6ha0",
        "date": "",
        "time": "종일일정",
        "title": "1차 노회록 검사",
        "dept": ""
      },
      {
        "id": "csv_107_8cny4",
        "date": "",
        "time": "종일일정",
        "title": "7월 설교문 발송",
        "dept": "강원용"
      },
      {
        "id": "csv_108_q4of8",
        "date": "06.30(화)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_109_x4ha5",
        "date": "",
        "time": "종일일정",
        "title": "1차 노회록 검사",
        "dept": ""
      }
    ]
  },
  {
    "id": "csv-07-2026",
    "title": "2026년 7월 일정",
    "rows": [
      {
        "id": "csv_110_syvoq",
        "date": "07.01(수)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_111_ucfk8",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_112_jjyf3",
        "date": "07.02(목)",
        "time": "종일일정",
        "title": "[불참] PC-USA 미국장로교회 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_113_n4lf7",
        "date": "",
        "time": "종일일정",
        "title": "선거후보자 면접",
        "dept": ""
      },
      {
        "id": "csv_114_y6x08",
        "date": "07.07(화)",
        "time": "종일일정",
        "title": "[총회장 설교] 전국장로대회(홍천비발디파크)",
        "dept": ""
      },
      {
        "id": "csv_115_vpcyi",
        "date": "07.08(수)",
        "time": "종일일정",
        "title": "[총회장 설교] 전국장로대회(홍천비발디파크)",
        "dept": ""
      },
      {
        "id": "csv_116_ltsep",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_117_l9f17",
        "date": "07.09(목)",
        "time": "종일일정",
        "title": "[총회장 설교] 전국장로대회(홍천비발디파크)",
        "dept": ""
      },
      {
        "id": "csv_118_dzo7x",
        "date": "",
        "time": "오전 10:00 ~ 오전 11:00",
        "title": "Lianna 귀국",
        "dept": "박성국"
      },
      {
        "id": "csv_119_oyfxb",
        "date": "07.15(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_120_ectes",
        "date": "07.22(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_121_5sae2",
        "date": "07.23(목)",
        "time": "오후 01:30 ~ 오후 03:00",
        "title": "NCCK 3차 실행위원회",
        "dept": ""
      },
      {
        "id": "csv_122_kimd8",
        "date": "07.27(월)",
        "time": "종일일정",
        "title": "8월 설교문 발송",
        "dept": "강원용"
      },
      {
        "id": "csv_123_sgisn",
        "date": "",
        "time": "종일일정",
        "title": "11:00 총회 임원 회의(광주한빛교회)",
        "dept": ""
      },
      {
        "id": "csv_124_3c9kn",
        "date": "",
        "time": "종일일정",
        "title": "13:00 실행위원회(광주한빛교회)",
        "dept": ""
      },
      {
        "id": "csv_125_k33dt",
        "date": "07.29(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      }
    ]
  },
  {
    "id": "csv-08-2026",
    "title": "2026년 8월 일정",
    "rows": [
      {
        "id": "csv_126_pka2m",
        "date": "08.05(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_127_jarw4",
        "date": "08.12(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_128_jbo88",
        "date": "08.15(토)",
        "time": "종일일정",
        "title": "광복절",
        "dept": ""
      },
      {
        "id": "csv_129_zpdg1",
        "date": "08.17(월)",
        "time": "종일일정",
        "title": "광복절 대체공휴일",
        "dept": ""
      },
      {
        "id": "csv_130_p7jum",
        "date": "08.19(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_131_g66xn",
        "date": "08.22(토)",
        "time": "종일일정",
        "title": "제12회 전국 어린이 찬양제",
        "dept": ""
      },
      {
        "id": "csv_132_pjxcd",
        "date": "08.25(화)",
        "time": "종일일정",
        "title": "[총회장] 13:00 목사수련생수련과정 집중교육",
        "dept": ""
      },
      {
        "id": "csv_133_4mcdx",
        "date": "",
        "time": "종일일정",
        "title": "남신도회전국대회(횡성 웰리힐리파크)",
        "dept": ""
      },
      {
        "id": "csv_134_jf7l2",
        "date": "08.26(수)",
        "time": "종일일정",
        "title": "[총회장] 13:00 목사수련생수련과정 집중교육",
        "dept": ""
      },
      {
        "id": "csv_135_nmf03",
        "date": "",
        "time": "종일일정",
        "title": "남신도회전국대회(횡성 웰리힐리파크)",
        "dept": ""
      },
      {
        "id": "csv_136_qim6a",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_137_ecsvq",
        "date": "08.27(목)",
        "time": "종일일정",
        "title": "[총회장] 13:00 목사수련생수련과정 집중교육",
        "dept": ""
      },
      {
        "id": "csv_138_l1ewl",
        "date": "",
        "time": "종일일정",
        "title": "남신도회전국대회(횡성 웰리힐리파크)",
        "dept": ""
      },
      {
        "id": "csv_139_uzuyi",
        "date": "08.28(금)",
        "time": "종일일정",
        "title": "[총회장] 13:00 목사수련생수련과정 집중교육",
        "dept": ""
      },
      {
        "id": "csv_140_6uwie",
        "date": "08.31(월)",
        "time": "종일일정",
        "title": "9월 설교문 발송",
        "dept": "강원용"
      },
      {
        "id": "csv_141_4qfow",
        "date": "",
        "time": "오후 02:00 ~ 오후 05:00",
        "title": "교재집필아카데미1",
        "dept": ""
      }
    ]
  },
  {
    "id": "csv-09-2026",
    "title": "2026년 9월 일정",
    "rows": [
      {
        "id": "csv_142_l4axg",
        "date": "09.02(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_143_wl0fh",
        "date": "09.07(월)",
        "time": "오후 02:00 ~ 오후 05:00",
        "title": "교재집필아카데미2강",
        "dept": ""
      },
      {
        "id": "csv_144_2m2z0",
        "date": "09.09(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_145_28jmq",
        "date": "09.11(금)",
        "time": "종일일정",
        "title": "NCCK Peace Convocation",
        "dept": "박성국"
      },
      {
        "id": "csv_146_b0svo",
        "date": "09.12(토)",
        "time": "종일일정",
        "title": "NCCK Peace Convocation",
        "dept": "박성국"
      },
      {
        "id": "csv_147_d3o42",
        "date": "09.13(일)",
        "time": "종일일정",
        "title": "NCCK Peace Convocation",
        "dept": "박성국"
      },
      {
        "id": "csv_148_s6rbv",
        "date": "09.15(화)",
        "time": "종일일정",
        "title": "제111회 총회",
        "dept": ""
      },
      {
        "id": "csv_149_du16s",
        "date": "09.16(수)",
        "time": "종일일정",
        "title": "제111회 총회",
        "dept": ""
      },
      {
        "id": "csv_150_orfhn",
        "date": "09.17(목)",
        "time": "종일일정",
        "title": "제111회 총회",
        "dept": ""
      },
      {
        "id": "csv_151_rlz0j",
        "date": "09.21(월)",
        "time": "오후 02:00 ~ 오후 05:00",
        "title": "교재집필아카데미3강",
        "dept": ""
      },
      {
        "id": "csv_152_h3bt1",
        "date": "09.25(금)",
        "time": "종일일정",
        "title": "추석",
        "dept": ""
      },
      {
        "id": "csv_153_uj8jn",
        "date": "09.28(월)",
        "time": "종일일정",
        "title": "위르겐 몰트만 탄생 100주년 기념 국제학술 콘퍼런스",
        "dept": ""
      },
      {
        "id": "csv_154_w6v2l",
        "date": "",
        "time": "종일일정",
        "title": "10월 설교문 발송",
        "dept": "강원용"
      },
      {
        "id": "csv_155_qz48m",
        "date": "",
        "time": "오후 02:00 ~ 오후 05:00",
        "title": "교재집필아카데미4강",
        "dept": ""
      },
      {
        "id": "csv_156_f9x62",
        "date": "09.29(화)",
        "time": "종일일정",
        "title": "위르겐 몰트만 탄생 100주년 기념 국제학술 콘퍼런스",
        "dept": ""
      },
      {
        "id": "csv_157_it59v",
        "date": "09.30(수)",
        "time": "종일일정",
        "title": "위르겐 몰트만 탄생 100주년 기념 국제학술 콘퍼런스",
        "dept": ""
      },
      {
        "id": "csv_158_nmqq0",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      }
    ]
  },
  {
    "id": "csv-10-2026",
    "title": "2026년 10월 일정",
    "rows": [
      {
        "id": "csv_159_dubbn",
        "date": "10.01(목)",
        "time": "종일일정",
        "title": "위르겐 몰트만 탄생 100주년 기념 국제학술 콘퍼런스",
        "dept": ""
      },
      {
        "id": "csv_160_0v7rl",
        "date": "10.02(금)",
        "time": "종일일정",
        "title": "위르겐 몰트만 탄생 100주년 기념 국제학술 콘퍼런스",
        "dept": ""
      },
      {
        "id": "csv_161_69wdg",
        "date": "10.03(토)",
        "time": "종일일정",
        "title": "개천절",
        "dept": ""
      },
      {
        "id": "csv_162_m835g",
        "date": "",
        "time": "종일일정",
        "title": "위르겐 몰트만 탄생 100주년 기념 국제학술 콘퍼런스",
        "dept": ""
      },
      {
        "id": "csv_163_zyvkf",
        "date": "10.04(일)",
        "time": "종일일정",
        "title": "위르겐 몰트만 탄생 100주년 기념 국제학술 콘퍼런스",
        "dept": ""
      },
      {
        "id": "csv_164_hji7i",
        "date": "10.05(월)",
        "time": "종일일정",
        "title": "개천절 대체공휴일",
        "dept": ""
      },
      {
        "id": "csv_165_1hptt",
        "date": "",
        "time": "종일일정",
        "title": "위르겐 몰트만 탄생 100주년 기념 국제학술 콘퍼런스",
        "dept": ""
      },
      {
        "id": "csv_166_kawyd",
        "date": "10.07(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_167_p1v34",
        "date": "10.09(금)",
        "time": "종일일정",
        "title": "한글날",
        "dept": ""
      },
      {
        "id": "csv_168_kgc7g",
        "date": "10.12(월)",
        "time": "종일일정",
        "title": "[총회장설교, 총무인사] 2027 신년목회세미나(전북 무주)",
        "dept": ""
      },
      {
        "id": "csv_169_jrvn3",
        "date": "10.13(화)",
        "time": "종일일정",
        "title": "[총회장설교, 총무인사] 2027 신년목회세미나(전북 무주)",
        "dept": ""
      },
      {
        "id": "csv_170_hufkj",
        "date": "10.14(수)",
        "time": "종일일정",
        "title": "[총회장설교, 총무인사] 2027 신년목회세미나(전북 무주)",
        "dept": ""
      },
      {
        "id": "csv_171_do06a",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_172_8ct0q",
        "date": "10.17(토)",
        "time": "오후 01:00 ~ 오후 05:00",
        "title": "강원노회교육사1",
        "dept": ""
      },
      {
        "id": "csv_173_u8p53",
        "date": "10.18(일)",
        "time": "종일일정",
        "title": "baden",
        "dept": "박성국"
      },
      {
        "id": "csv_174_gl16m",
        "date": "10.19(월)",
        "time": "종일일정",
        "title": "baden",
        "dept": "박성국"
      },
      {
        "id": "csv_175_227cs",
        "date": "",
        "time": "종일일정",
        "title": "CCT 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_176_hsd5u",
        "date": "",
        "time": "오후 02:00 ~ 오후 05:00",
        "title": "교재집필아카데미5강",
        "dept": ""
      },
      {
        "id": "csv_177_utekz",
        "date": "10.20(화)",
        "time": "종일일정",
        "title": "baden",
        "dept": "박성국"
      },
      {
        "id": "csv_178_zr5jq",
        "date": "",
        "time": "종일일정",
        "title": "CCT 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_179_hxnqn",
        "date": "10.21(수)",
        "time": "종일일정",
        "title": "baden",
        "dept": "박성국"
      },
      {
        "id": "csv_180_yqxyt",
        "date": "",
        "time": "종일일정",
        "title": "CCT 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_181_nde64",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_182_t2gn6",
        "date": "10.22(목)",
        "time": "종일일정",
        "title": "baden",
        "dept": "박성국"
      },
      {
        "id": "csv_183_e4rnh",
        "date": "",
        "time": "종일일정",
        "title": "CCT 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_184_ndbbs",
        "date": "",
        "time": "오후 01:30 ~ 오후 03:00",
        "title": "NCCK 4차 실행위원회",
        "dept": ""
      },
      {
        "id": "csv_185_lphvl",
        "date": "10.23(금)",
        "time": "종일일정",
        "title": "baden",
        "dept": "박성국"
      },
      {
        "id": "csv_186_6h8mj",
        "date": "",
        "time": "종일일정",
        "title": "CCT 총회",
        "dept": "박성국"
      },
      {
        "id": "csv_187_chq5d",
        "date": "10.24(토)",
        "time": "오후 01:00 ~ 오후 05:00",
        "title": "강원노회교육사2",
        "dept": ""
      },
      {
        "id": "csv_188_owwld",
        "date": "10.26(월)",
        "time": "종일일정",
        "title": "11월 설교문 발송",
        "dept": "강원용"
      },
      {
        "id": "csv_189_r9osz",
        "date": "",
        "time": "오후 02:00 ~ 오후 05:00",
        "title": "교재집필아카데미6강",
        "dept": ""
      },
      {
        "id": "csv_190_vdys8",
        "date": "10.28(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_191_qg5tx",
        "date": "10.31(토)",
        "time": "오후 01:00 ~ 오후 05:00",
        "title": "강원노회교육사3",
        "dept": ""
      }
    ]
  },
  {
    "id": "csv-11-2026",
    "title": "2026년 11월 일정",
    "rows": [
      {
        "id": "csv_192_na1sy",
        "date": "11.02(월)",
        "time": "오후 02:00 ~ 오후 05:00",
        "title": "교재집필아카데미7강",
        "dept": ""
      },
      {
        "id": "csv_193_os6tw",
        "date": "11.04(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_194_1x2j7",
        "date": "11.07(토)",
        "time": "오후 01:00 ~ 오후 05:00",
        "title": "강원노회교육사4",
        "dept": ""
      },
      {
        "id": "csv_195_hf4ef",
        "date": "11.11(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_196_l6tw0",
        "date": "11.14(토)",
        "time": "오후 01:00 ~ 오후 05:00",
        "title": "강원노회교육사5",
        "dept": ""
      },
      {
        "id": "csv_197_6ykr1",
        "date": "11.17(화)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_198_417ue",
        "date": "11.18(수)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_199_3bojl",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_200_pzqpx",
        "date": "11.19(목)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_201_vtzvl",
        "date": "11.20(금)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_202_i0kp7",
        "date": "11.21(토)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_203_1wxef",
        "date": "11.22(일)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_204_0u1n0",
        "date": "11.23(월)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_205_a5um0",
        "date": "",
        "time": "종일일정",
        "title": "[총회장설교. 총무인사] 28기 장로교육(대천)",
        "dept": ""
      },
      {
        "id": "csv_206_flltc",
        "date": "11.24(화)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_207_15w5o",
        "date": "",
        "time": "종일일정",
        "title": "[총회장설교. 총무인사] 28기 장로교육(대천)",
        "dept": ""
      },
      {
        "id": "csv_208_cdopx",
        "date": "11.25(수)",
        "time": "종일일정",
        "title": "WCC 2차 실행위원회 (김서영)",
        "dept": "박성국"
      },
      {
        "id": "csv_209_1p5bn",
        "date": "",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_210_43fpk",
        "date": "11.30(월)",
        "time": "종일일정",
        "title": "12월 설교문 발송",
        "dept": "강원용"
      }
    ]
  },
  {
    "id": "csv-12-2026",
    "title": "2026년 12월 일정",
    "rows": [
      {
        "id": "csv_211_y5qpx",
        "date": "12.02(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_212_rznur",
        "date": "12.09(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_213_p24ys",
        "date": "12.16(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_214_igqx2",
        "date": "12.23(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      },
      {
        "id": "csv_215_tqkvh",
        "date": "12.25(금)",
        "time": "종일일정",
        "title": "크리스마스",
        "dept": ""
      },
      {
        "id": "csv_216_ymc9c",
        "date": "12.30(수)",
        "time": "오후 01:00 ~ 오후 02:30",
        "title": "전도와 양육 사례 발표회",
        "dept": ""
      }
    ]
  }
];

  // Dept Color Palette (Apple pastel tints)
  const DEPT_COLORS = {
    '총회장': { bg: '#fee2e2', text: '#ef4444', dot: '#ef4444' },
    '총회총무': { bg: '#e0e7ff', text: '#4f46e5', dot: '#6366f1' },
    '총무': { bg: '#e0e7ff', text: '#4f46e5', dot: '#6366f1' },
    '교육국': { bg: '#dcfce7', text: '#15803d', dot: '#22c55e' },
    '교재개발출판부': { bg: '#fef3c7', text: '#b45309', dot: '#f59e0b' },
    '인사행정부': { bg: '#f3e8ff', text: '#7e22ce', dot: '#a855f7' },
    '국내선교부': { bg: '#ccfbf1', text: '#0f766e', dot: '#14b8a6' },
    '국제협력선교부': { bg: '#e0f2fe', text: '#0369a1', dot: '#0ea5e9' },
    '재정부': { bg: '#ffedd5', text: '#c2410c', dot: '#f97316' },
    '선교사업국': { bg: '#f1f5f9', text: '#475569', dot: '#64748b' },
    'default': { bg: '#f1f5f9', text: '#3b82f6', dot: '#3b82f6' }
  };

  function getDeptStyle(dept) {
    if (!dept) return DEPT_COLORS.default;
    for (const key in DEPT_COLORS) {
      if (dept.includes(key)) return DEPT_COLORS[key];
    }
    return DEPT_COLORS.default;
  }

  // Parse date strings to comparable format
  function parseItemDate(dateStr, defaultYear = 2026) {
    if (!dateStr) return null;
    // Format: 08.27(목) or 2026-08-27
    const m = dateStr.match(/(\d{1,4})[.\-\/](\d{1,2})[.\-\/]?(\d{1,2})?/);
    if (!m) return null;
    let year = defaultYear;
    let month, day;
    if (m[1].length === 4) {
      year = parseInt(m[1], 10);
      month = parseInt(m[2], 10);
      day = parseInt(m[3] || '1', 10);
    } else {
      month = parseInt(m[1], 10);
      day = parseInt(m[2], 10);
    }
    return { year, month, day, dateObj: new Date(year, month - 1, day) };
  }

  // Format Helper
  const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

  class ProkCalendarWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = {
        view: this.getAttribute('data-view') || 'monthly', // daily | weekly | monthly
        theme: this.getAttribute('data-theme') || 'auto', // light | dark | auto
        dept: this.getAttribute('data-dept') || 'all',
        selectedDate: new Date(),
        activeMonth: new Date(),
        schedules: [],
        isLoading: true
      };
    }

    static get observedAttributes() {
      return ['data-view', 'data-theme', 'data-dept'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (name === 'data-view') this.state.view = newValue;
        if (name === 'data-theme') this.state.theme = newValue;
        if (name === 'data-dept') this.state.dept = newValue;
        this.render();
      }
    }

    connectedCallback() {
      this.loadData();
      // 🌟 실시간 동기화: 60초마다 백그라운드에서 최신 일정 자동 갱신 (수정/추가 즉시 반영)
      this.syncTimer = setInterval(() => {
        this.loadData(true);
      }, 60000);
    }

    disconnectedCallback() {
      if (this.syncTimer) {
        clearInterval(this.syncTimer);
        this.syncTimer = null;
      }
    }

    async loadData(isSilent = false) {
      if (!isSilent && (!this.state.schedules || this.state.schedules.length === 0)) {
        this.state.isLoading = true;
      }

      const targetYear = (this.state.activeMonth || new Date()).getFullYear();
      const cacheBuster = '?t=' + Date.now();

      try {
        // 1. 실시간 Firebase RTDB 연도별 경로 조회 (/shared_schedule_editor/schedules/{year}.json)
        const resYear = await fetch('https://prok-history-default-rtdb.asia-southeast1.firebasedatabase.app/shared_schedule_editor/schedules/' + targetYear + '.json' + cacheBuster, {
          cache: 'no-store'
        });

        if (resYear.ok) {
          const liveData = await resYear.json();
          if (liveData && (Array.isArray(liveData) ? liveData.length > 0 : Object.keys(liveData).length > 0)) {
            this.state.schedules = this.flattenSchedule(liveData, targetYear);
            this.state.isLoading = false;
            this.render();
            return;
          }
        }

        // 2. 실시간 기본 경로 조회 (/shared_schedule_editor/data.json)
        const resData = await fetch('https://prok-history-default-rtdb.asia-southeast1.firebasedatabase.app/shared_schedule_editor/data.json' + cacheBuster, {
          cache: 'no-store'
        });

        if (resData.ok) {
          const liveData = await resData.json();
          if (liveData && (Array.isArray(liveData) ? liveData.length > 0 : Object.keys(liveData).length > 0)) {
            this.state.schedules = this.flattenSchedule(liveData, targetYear);
            this.state.isLoading = false;
            this.render();
            return;
          }
        }
      } catch (e) {
        console.warn('[PROK Widget] Realtime live data sync error:', e);
      }

      // 3. Fallback: 오프라인 / 네트워크 지연 시 내장 2026 일정 사용
      if (!this.state.schedules || this.state.schedules.length === 0) {
        this.state.schedules = this.flattenSchedule(FALLBACK_DATA, targetYear);
      }
      this.state.isLoading = false;
      this.render();
    }

    flattenSchedule(rawData, defaultYear = 2026) {
      const items = [];
      const tables = Array.isArray(rawData) ? rawData : Object.values(rawData || {});
      
      tables.forEach(table => {
        let tableYear = defaultYear;
        if (table.title) {
          const matchY = table.title.match(/(\d{4})년/);
          if (matchY) tableYear = parseInt(matchY[1], 10);
        } else if (table.id) {
          const matchY = table.id.match(/(\d{4})/);
          if (matchY) tableYear = parseInt(matchY[1], 10);
        }

        const rows = Array.isArray(table.rows) ? table.rows : Object.values(table.rows || {});
        let lastDate = '';
        rows.forEach(r => {
          if (!r.title && !r.date && !r.time) return;

          let dateStr = (r.date && r.date.trim()) || lastDate;
          if (r.date && r.date.trim()) lastDate = r.date.trim();

          const parsed = parseItemDate(dateStr, tableYear);
          if (parsed) {
            items.push({
              id: r.id || Math.random().toString(36).substr(2, 9),
              dateStr: dateStr,
              year: parsed.year,
              month: parsed.month,
              day: parsed.day,
              dateKey: `${parsed.year}-${String(parsed.month).padStart(2, '0')}-${String(parsed.day).padStart(2, '0')}`,
              time: r.time || '종일일정',
              title: r.title || '일정',
              dept: r.dept || ''
            });
          }
        });
      });
      return items;
    }

    getFilteredSchedules() {
      if (this.state.dept === 'all' || !this.state.dept) {
        return this.state.schedules;
      }
      return this.state.schedules.filter(s => s.dept && s.dept.includes(this.state.dept));
    }

    // RENDER MAIN
    render() {
      const { view, theme, selectedDate, activeMonth } = this.state;
      const allSchedules = this.getFilteredSchedules();

      // CSS Styles (Apple Widget iOS/macOS Aesthetic)
      const styles = `
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Pretendard", "Apple SD Gothic Neo", sans-serif;
          -webkit-font-smoothing: antialiased;
          --widget-radius: 24px;
          --apple-red: #ff3b30;
          --apple-blue: #007aff;
          --apple-indigo: #5856d6;
        }

        .widget-container {
          position: relative;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          border-radius: var(--widget-radius);
          padding: 18px 20px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          user-select: none;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04);
        }

        /* Light Theme - Apple Frosted Glass */
        .theme-light, .theme-auto {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: #1d1d1f;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.3) inset;
        }
        @media (prefers-color-scheme: dark) {
          .theme-auto {
            background: rgba(30, 30, 35, 0.72);
            backdrop-filter: blur(25px) saturate(190%);
            -webkit-backdrop-filter: blur(25px) saturate(190%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #f5f5f7;
            box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
          }
        }
        /* Dark Theme - Apple Frosted Dark Glass */
        .theme-dark {
          background: rgba(30, 30, 35, 0.75);
          backdrop-filter: blur(25px) saturate(190%);
          -webkit-backdrop-filter: blur(25px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f5f5f7;
          box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
        }

        /* Header */
        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .widget-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.2px;
          color: var(--apple-red);
          text-transform: uppercase;
        }
        .widget-badge .icon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--apple-red);
          box-shadow: 0 0 8px rgba(255, 59, 48, 0.6);
        }
        .widget-title-area {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .widget-title {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }
        .widget-controls {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .icon-btn {
          background: rgba(120, 120, 128, 0.12);
          border: none;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: inherit;
          font-size: 12px;
          transition: background 0.15s;
        }
        .icon-btn:hover {
          background: rgba(120, 120, 128, 0.24);
        }

        /* Mode Switcher Tabs */
        .view-tabs {
          display: flex;
          background: rgba(120, 120, 128, 0.12);
          border-radius: 10px;
          padding: 2px;
          gap: 2px;
          margin-bottom: 14px;
        }
        .tab-btn {
          flex: 1;
          border: none;
          background: transparent;
          color: inherit;
          opacity: 0.7;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: #ffffff;
          opacity: 1;
          color: #000;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .theme-dark .tab-btn.active {
          background: #3a3a3c;
          color: #fff;
        }
        @media (prefers-color-scheme: dark) {
          .theme-auto .tab-btn.active {
            background: #3a3a3c;
            color: #fff;
          }
        }

        /* ──────── DAILY VIEW ──────── */
        .daily-view {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .daily-hero {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(120, 120, 128, 0.16);
        }
        .apple-date-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 54px;
          height: 58px;
          background: rgba(255, 59, 48, 0.08);
          border: 1px solid rgba(255, 59, 48, 0.2);
          border-radius: 16px;
        }
        .apple-date-day {
          font-size: 11px;
          font-weight: 700;
          color: var(--apple-red);
          text-transform: uppercase;
        }
        .apple-date-num {
          font-size: 26px;
          font-weight: 800;
          line-height: 1;
          color: var(--apple-red);
          letter-spacing: -1px;
        }
        .daily-hero-meta h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }
        .daily-hero-meta p {
          margin: 3px 0 0 0;
          font-size: 13px;
          opacity: 0.65;
        }

        /* Event List Items */
        .event-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 240px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .event-list::-webkit-scrollbar {
          width: 4px;
        }
        .event-list::-webkit-scrollbar-thumb {
          background: rgba(120, 120, 128, 0.3);
          border-radius: 4px;
        }
        .event-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 12px;
          background: rgba(120, 120, 128, 0.06);
          border-radius: 14px;
          transition: transform 0.15s, background 0.15s;
        }
        .event-card:hover {
          background: rgba(120, 120, 128, 0.12);
          transform: translateY(-1px);
        }
        .event-bar {
          width: 4px;
          height: 36px;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .event-info {
          flex: 1;
          min-width: 0;
        }
        .event-title {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          opacity: 0.7;
        }
        .dept-tag {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 6px;
          letter-spacing: -0.1px;
        }

        /* Empty State */
        .empty-events {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 10px;
          opacity: 0.6;
          text-align: center;
          font-size: 13px;
          gap: 6px;
        }

        /* ──────── WEEKLY VIEW ──────── */
        .weekly-strip {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
          margin-bottom: 14px;
        }
        .week-day-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 2px;
          border-radius: 12px;
          background: rgba(120, 120, 128, 0.08);
          cursor: pointer;
          transition: all 0.18s;
          border: 1px solid transparent;
        }
        .week-day-chip:hover {
          background: rgba(120, 120, 128, 0.16);
        }
        .week-day-chip.active {
          background: var(--apple-red);
          color: #ffffff !important;
          box-shadow: 0 4px 10px rgba(255, 59, 48, 0.35);
        }
        .week-day-chip.today:not(.active) {
          border-color: var(--apple-red);
        }
        .week-chip-name {
          font-size: 10px;
          font-weight: 600;
          opacity: 0.75;
          margin-bottom: 2px;
        }
        .week-day-chip.active .week-chip-name { opacity: 1; }
        .week-chip-num {
          font-size: 15px;
          font-weight: 700;
        }
        .week-chip-dots {
          display: flex;
          gap: 2px;
          height: 4px;
          margin-top: 3px;
        }
        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--apple-blue);
        }
        .week-day-chip.active .dot {
          background: #ffffff;
        }

        /* ──────── MONTHLY VIEW ──────── */
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          text-align: center;
        }
        .cal-header-cell {
          font-size: 11px;
          font-weight: 600;
          opacity: 0.5;
          padding: 4px 0;
        }
        .cal-day-cell {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          transition: all 0.15s;
          border: 1px solid transparent;
        }
        .cal-day-cell:hover:not(.empty) {
          background: rgba(120, 120, 128, 0.14);
        }
        .cal-day-cell.other-month {
          opacity: 0.25;
        }
        .cal-day-cell.today {
          color: var(--apple-red);
          font-weight: 800;
        }
        .cal-day-cell.selected {
          background: var(--apple-red) !important;
          color: #ffffff !important;
          box-shadow: 0 3px 8px rgba(255, 59, 48, 0.4);
        }
        .cal-dots {
          display: flex;
          gap: 2px;
          position: absolute;
          bottom: 3px;
        }
        .cal-dots .dot {
          width: 3.5px;
          height: 3.5px;
        }
        .cal-day-cell.selected .dot {
          background: #ffffff !important;
        }

        /* Footer */
        .widget-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          padding-top: 10px;
          border-top: 1px solid rgba(120, 120, 128, 0.12);
          font-size: 11px;
          opacity: 0.65;
        }
        .widget-footer a {
          color: inherit;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .widget-footer a:hover {
          text-decoration: underline;
          color: var(--apple-blue);
        }
      `;

      // Active date helpers
      const today = new Date();
      const sel = selectedDate;
      const selKey = `${sel.getFullYear()}-${String(sel.getMonth() + 1).padStart(2, '0')}-${String(sel.getDate()).padStart(2, '0')}`;
      
      const daySchedules = allSchedules.filter(s => s.dateKey === selKey);

      // HTML Template
      let contentHtml = '';

      // TABS
      const tabsHtml = `
        <div class="view-tabs">
          <button class="tab-btn ${view === 'daily' ? 'active' : ''}" data-action="switch-view" data-val="daily">일간</button>
          <button class="tab-btn ${view === 'weekly' ? 'active' : ''}" data-action="switch-view" data-val="weekly">주간</button>
          <button class="tab-btn ${view === 'monthly' ? 'active' : ''}" data-action="switch-view" data-val="monthly">월간</button>
        </div>
      `;

      // 1. DAILY VIEW
      if (view === 'daily') {
        const isToday = sel.toDateString() === today.toDateString();
        const dateDayName = DAY_NAMES[sel.getDay()];

        const eventCards = daySchedules.length > 0 ? daySchedules.map(ev => {
          const style = getDeptStyle(ev.dept);
          return `
            <div class="event-card">
              <div class="event-bar" style="background-color: ${style.dot}"></div>
              <div class="event-info">
                <div class="event-title">${ev.title}</div>
                <div class="event-meta">
                  <span>${ev.time}</span>
                  ${ev.dept ? `<span class="dept-tag" style="background-color: ${style.bg}; color: ${style.text}">${ev.dept}</span>` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('') : `
          <div class="empty-events">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>등록된 일정이 없습니다.</span>
          </div>
        `;

        contentHtml = `
          <div class="daily-view">
            <div class="daily-hero">
              <div class="apple-date-block">
                <span class="apple-date-day">${dateDayName}요일</span>
                <span class="apple-date-num">${sel.getDate()}</span>
              </div>
              <div class="daily-hero-meta">
                <h3>${sel.getFullYear()}년 ${sel.getMonth() + 1}월 ${sel.getDate()}일</h3>
                <p>${isToday ? '오늘의 총회 및 부서 일정' : `${dateDayName}요일 일정 목록`}</p>
              </div>
            </div>
            <div class="event-list">
              ${eventCards}
            </div>
          </div>
        `;
      }

      // 2. WEEKLY VIEW
      else if (view === 'weekly') {
        // Calculate start of week (Sunday or Monday)
        const currentDay = sel.getDay();
        const weekStart = new Date(sel);
        weekStart.setDate(sel.getDate() - currentDay);

        let weekChips = '';
        for (let i = 0; i < 7; i++) {
          const d = new Date(weekStart);
          d.setDate(weekStart.getDate() + i);
          const dKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          const isSelected = d.toDateString() === sel.toDateString();
          const isToday = d.toDateString() === today.toDateString();
          const eventsOnDay = allSchedules.filter(s => s.dateKey === dKey);

          weekChips += `
            <div class="week-day-chip ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''}" data-action="select-date" data-date="${dKey}">
              <span class="week-chip-name">${DAY_NAMES[i]}</span>
              <span class="week-chip-num">${d.getDate()}</span>
              <div class="week-chip-dots">
                ${eventsOnDay.slice(0, 3).map(() => `<span class="dot"></span>`).join('')}
              </div>
            </div>
          `;
        }

        const eventCards = daySchedules.length > 0 ? daySchedules.map(ev => {
          const style = getDeptStyle(ev.dept);
          return `
            <div class="event-card">
              <div class="event-bar" style="background-color: ${style.dot}"></div>
              <div class="event-info">
                <div class="event-title">${ev.title}</div>
                <div class="event-meta">
                  <span>${ev.time}</span>
                  ${ev.dept ? `<span class="dept-tag" style="background-color: ${style.bg}; color: ${style.text}">${ev.dept}</span>` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('') : `
          <div class="empty-events">
            <span>선택한 날짜에 일정이 없습니다.</span>
          </div>
        `;

        contentHtml = `
          <div class="weekly-view">
            <div class="weekly-strip">
              ${weekChips}
            </div>
            <div class="event-list">
              ${eventCards}
            </div>
          </div>
        `;
      }

      // 3. MONTHLY VIEW
      else if (view === 'monthly') {
        const year = activeMonth.getFullYear();
        const month = activeMonth.getMonth(); // 0-indexed

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let gridCells = '';
        // Header
        gridCells += DAY_NAMES.map(d => `<div class="cal-header-cell">${d}</div>`).join('');

        // Blank days
        for (let i = 0; i < firstDayOfMonth; i++) {
          gridCells += `<div class="cal-day-cell empty other-month"></div>`;
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
          const dKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const curDate = new Date(year, month, day);
          const isSelected = curDate.toDateString() === sel.toDateString();
          const isToday = curDate.toDateString() === today.toDateString();
          const eventsOnDay = allSchedules.filter(s => s.dateKey === dKey);

          gridCells += `
            <div class="cal-day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}" data-action="select-date" data-date="${dKey}">
              <span>${day}</span>
              ${eventsOnDay.length > 0 ? `
                <div class="cal-dots">
                  ${eventsOnDay.slice(0, 3).map(e => `<span class="dot" style="background-color: ${getDeptStyle(e.dept).dot}"></span>`).join('')}
                </div>
              ` : ''}
            </div>
          `;
        }

        // Selected Day Details below grid
        const selectedEventItems = daySchedules.length > 0 ? daySchedules.map(ev => {
          const style = getDeptStyle(ev.dept);
          return `
            <div class="event-card" style="padding: 8px 10px;">
              <div class="event-bar" style="height: 28px; background-color: ${style.dot}"></div>
              <div class="event-info">
                <div class="event-title" style="font-size: 13px;">${ev.title}</div>
                <div class="event-meta" style="font-size: 11px;">
                  <span>${ev.time}</span>
                  ${ev.dept ? `<span class="dept-tag" style="background-color: ${style.bg}; color: ${style.text}">${ev.dept}</span>` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('') : `
          <div class="empty-events" style="padding: 10px;">
            <span>${sel.getMonth() + 1}월 ${sel.getDate()}일 일정이 없습니다.</span>
          </div>
        `;

        contentHtml = `
          <div class="monthly-view">
            <div class="calendar-grid">
              ${gridCells}
            </div>
            <div style="margin-top: 12px; border-top: 1px solid rgba(120, 120, 128, 0.12); padding-top: 8px;">
              <div style="font-size: 12px; font-weight: 700; opacity: 0.8; margin-bottom: 6px;">
                ${sel.getMonth() + 1}월 ${sel.getDate()}일 (${DAY_NAMES[sel.getDay()]}) 일정
              </div>
              <div class="event-list" style="max-height: 120px;">
                ${selectedEventItems}
              </div>
            </div>
          </div>
        `;
      }

      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="widget-container theme-${theme}">
          <div class="widget-header">
            <div class="widget-badge">
              <span class="icon"></span>
              <span>${this.getAttribute('data-title') || '총회본부 일정'}</span>
            </div>
            <div class="widget-controls">
              <button class="icon-btn" data-action="prev-month" title="이전">◀</button>
              <span style="font-size: 13px; font-weight: 700;">${activeMonth.getFullYear()}.${String(activeMonth.getMonth() + 1).padStart(2, '0')}</span>
              <button class="icon-btn" data-action="next-month" title="다음">▶</button>
              <button class="icon-btn" data-action="today" title="오늘로 이동">⟳</button>
            </div>
          </div>

          ${tabsHtml}
          ${contentHtml}

          <div class="widget-footer">
            <span>한국기독교장로회 총회</span>
            <a href="https://calendar.prok.or.kr" target="_blank" rel="noopener">전체 일정 보기 ↗</a>
          </div>
        </div>
      `;

      this.attachEvents();
    }

    attachEvents() {
      const root = this.shadowRoot;

      // View Tab Switch
      root.querySelectorAll('[data-action="switch-view"]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.state.view = btn.getAttribute('data-val');
          this.render();
        });
      });

      // Date Select
      root.querySelectorAll('[data-action="select-date"]').forEach(cell => {
        cell.addEventListener('click', () => {
          const dateStr = cell.getAttribute('data-date');
          const [y, m, d] = dateStr.split('-').map(Number);
          this.state.selectedDate = new Date(y, m - 1, d);
          this.render();
        });
      });

      // Prev Month
      const prevBtn = root.querySelector('[data-action="prev-month"]');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          const current = this.state.activeMonth;
          const prevYear = current.getFullYear();
          const nextMonth = new Date(current.getFullYear(), current.getMonth() - 1, 1);
          this.state.activeMonth = nextMonth;
          if (nextMonth.getFullYear() !== prevYear) {
            this.loadData();
          } else {
            this.render();
          }
        });
      }

      // Next Month
      const nextBtn = root.querySelector('[data-action="next-month"]');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const current = this.state.activeMonth;
          const prevYear = current.getFullYear();
          const nextMonth = new Date(current.getFullYear(), current.getMonth() + 1, 1);
          this.state.activeMonth = nextMonth;
          if (nextMonth.getFullYear() !== prevYear) {
            this.loadData();
          } else {
            this.render();
          }
        });
      }

      // Today
      const todayBtn = root.querySelector('[data-action="today"]');
      if (todayBtn) {
        todayBtn.addEventListener('click', () => {
          const now = new Date();
          this.state.selectedDate = now;
          this.state.activeMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          this.render();
        });
      }
    }
  }

  // Register Custom Element
  if (!customElements.get('prok-calendar-widget')) {
    customElements.define('prok-calendar-widget', ProkCalendarWidget);
  }

  // Auto-initialize standard container elements if script loaded as standalone
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#prok-calendar-widget').forEach(el => {
      if (!el.querySelector('prok-calendar-widget')) {
        const widget = document.createElement('prok-calendar-widget');
        if (el.dataset.view) widget.setAttribute('data-view', el.dataset.view);
        if (el.dataset.theme) widget.setAttribute('data-theme', el.dataset.theme);
        if (el.dataset.dept) widget.setAttribute('data-dept', el.dataset.dept);
        el.appendChild(widget);
      }
    });
  });
})();
