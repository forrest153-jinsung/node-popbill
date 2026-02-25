/**
 * Common API 타입 정의 (공통 API - 포인트 관리, 회원 관리)
 */

// ========================
// Point Management 타입 (정액제/포인트 관리)
// ========================

/**
 * 포인트 결제 정보
 */
export interface PaymentForm {
  settlerName: string;
  settlerEmail?: string;
  notifyHP?: string;
  paymentMethod: string;
  contractCourse?: string;
  settleCost: string;
}

/**
 * 포인트 결제 응답
 */
export interface PaymentResponse {
  code: number;
  message: string;
  settleCode: string;
}

/**
 * 포인트 결제 이력
 */
export interface PaymentHistory {
  productType: string;
  productName: string;
  settleType: string;
  settlerName: string;
  settlerEmail: string;
  settleCost: string;
  settlePonumber: string;
  settleState: number;
  regDT: string;
  stateDT: string;
}

/**
 * 포인트 결제 이력 결과
 */
export interface PaymentHistoryResult {
  code: number;
  total: number;
  perPage: number;
  pageNum: number;
  pageCount: number;
  list: PaymentHistory[];
}

/**
 * 포인트 사용 이력
 */
export interface UseHistory {
  doctype: string;
  docnum: string;
  docdate: string;
  usageAmount: string;
  remainPoint: string;
}

/**
 * 포인트 사용 이력 결과
 */
export interface UseHistoryResult {
  code: number;
  total: number;
  perPage: number;
  pageNum: number;
  pageCount: number;
  list: UseHistory[];
}

/**
 * 환불 신청 정보
 */
export interface RefundForm {
  contactName: string;
  contactEmail?: string;
  contactTEL?: string;
  requestPonumber: string;
  accountBank?: string;
  accountNum?: string;
  accountName?: string;
  reason?: string;
}

/**
 * 환불 응답
 */
export interface RefundResponse {
  code: number;
  message: string;
  refundCode: string;
}

/**
 * 환불 이력
 */
export interface RefundHistory {
  reqDT: string;
  requestPonumber: string;
  accountBank: string;
  accountNum: string;
  accountName: string;
  state: number;
  reason: string;
}

/**
 * 환불 이력 결과
 */
export interface RefundHistoryResult {
  code: number;
  total: number;
  perPage: number;
  pageNum: number;
  pageCount: number;
  list: RefundHistory[];
}

/**
 * 정액제 상태 정보
 */
export interface FlatRateState {
  contractYN: boolean;
  contractState: number;
  useEndDate: string;
  baseDate: number;
}

/**
 * 과금 정보
 */
export interface ChargeInfo {
  unitCost: string;
  chargeMethod: string;
  rateSystem: string;
}

// ========================
// Member Management 타입 (회원 관리)
// ========================

/**
 * 가입 정보
 */
export interface JoinForm {
  LinkID: string;
  CorpNum: string;
  CEOName: string;
  CorpName: string;
  Addr: string;
  BizType: string;
  BizClass: string;
  ContactName: string;
  ContactEmail: string;
  ContactTEL?: string;
  ID: string;
  PWD: string;
}

/**
 * 회사 정보
 */
export interface CorpInfo {
  ceoname: string;
  corpName: string;
  addr: string;
  bizType: string;
  bizClass: string;
}

/**
 * 담당자 정보
 */
export interface ContactInfo {
  id?: string;
  personName: string;
  tel: string;
  email: string;
  regDT?: string;
  searchRole?: number;
  mgrYN?: boolean;
  state?: number;
}

/**
 * 기본 응답
 */
export interface Response {
  code: number;
  message: string;
}

/**
 * 예외 정보
 */
export interface PopbillException {
  code: number;
  message: string;
}
// ========================
// Callback 타입
// ========================

export type SuccessCallback<T = any> = (response: T) => void;
export type ErrorCallback = (error: PopbillException) => void;

// ========================
// Common Service 인터페이스 (모든 서비스에 포함)
// ========================

/**
 * 모든 Popbill 서비스가 상속하는 BaseService 공통 API
 * 실제 구현: lib/BaseService.js
 */
export interface ICommonService {
  // ========================
  // Point 관리 API
  // ========================

  /** 연동회원 잔여포인트 확인 */
  getBalance(
    corpNum: string,
    success: SuccessCallback<number>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 포인트 충전 팝업 URL */
  getChargeURL(
    corpNum: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getChargeURL(
    corpNum: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 무통장 입금신청 */
  paymentRequest(
    corpNum: string,
    paymentForm: PaymentForm,
    success: SuccessCallback<PaymentResponse>,
    error: ErrorCallback,
  ): void;
  paymentRequest(
    corpNum: string,
    paymentForm: PaymentForm,
    userID: string,
    success: SuccessCallback<PaymentResponse>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 무통장 입금신청 정보확인 */
  getSettleResult(
    corpNum: string,
    settleCode: string,
    success: SuccessCallback<PaymentHistory>,
    error: ErrorCallback,
  ): void;
  getSettleResult(
    corpNum: string,
    settleCode: string,
    userID: string,
    success: SuccessCallback<PaymentHistory>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 포인트 결제내역 확인 */
  getPaymentHistory(
    corpNum: string,
    sDate: string,
    eDate: string,
    page: number,
    perPage: number,
    success: SuccessCallback<PaymentHistoryResult>,
    error: ErrorCallback,
  ): void;
  getPaymentHistory(
    corpNum: string,
    sDate: string,
    eDate: string,
    page: number,
    perPage: number,
    userID: string,
    success: SuccessCallback<PaymentHistoryResult>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 포인트 결제내역 팝업 URL */
  getPaymentURL(
    corpNum: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getPaymentURL(
    corpNum: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 포인트 사용내역 확인 */
  getUseHistory(
    corpNum: string,
    sDate: string,
    eDate: string,
    page: number,
    perPage: number,
    order: string,
    success: SuccessCallback<UseHistoryResult>,
    error: ErrorCallback,
  ): void;
  getUseHistory(
    corpNum: string,
    sDate: string,
    eDate: string,
    page: number,
    perPage: number,
    order: string,
    userID: string,
    success: SuccessCallback<UseHistoryResult>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 포인트 사용내역 팝업 URL */
  getUseHistoryURL(
    corpNum: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getUseHistoryURL(
    corpNum: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 포인트 환불신청 */
  refund(
    corpNum: string,
    refundForm: RefundForm,
    success: SuccessCallback<RefundResponse>,
    error: ErrorCallback,
  ): void;
  refund(
    corpNum: string,
    refundForm: RefundForm,
    userID: string,
    success: SuccessCallback<RefundResponse>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 포인트 환불내역 확인 */
  getRefundHistory(
    corpNum: string,
    page: number,
    perPage: number,
    success: SuccessCallback<RefundHistoryResult>,
    error: ErrorCallback,
  ): void;
  getRefundHistory(
    corpNum: string,
    page: number,
    perPage: number,
    userID: string,
    success: SuccessCallback<RefundHistoryResult>,
    error: ErrorCallback,
  ): void;

  /** 환불 신청 상태 조회 */
  getRefundInfo(
    corpNum: string,
    refundCode: string,
    success: SuccessCallback<RefundHistory>,
    error: ErrorCallback,
  ): void;
  getRefundInfo(
    corpNum: string,
    refundCode: string,
    userID: string,
    success: SuccessCallback<RefundHistory>,
    error: ErrorCallback,
  ): void;

  /** 환불 가능 포인트 조회 */
  getRefundableBalance(
    corpNum: string,
    success: SuccessCallback<number>,
    error: ErrorCallback,
  ): void;
  getRefundableBalance(
    corpNum: string,
    userID: string,
    success: SuccessCallback<number>,
    error: ErrorCallback,
  ): void;

  /** 파트너 잔여포인트 확인 */
  getPartnerBalance(
    corpNum: string,
    success: SuccessCallback<number>,
    error: ErrorCallback,
  ): void;

  /** 파트너 포인트 충전 팝업 URL */
  getPartnerURL(
    corpNum: string,
    togo: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  // ========================
  // Member 관리 API
  // ========================

  /** 연동회원 가입여부 확인 */
  checkIsMember(
    corpNum: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 아이디 중복 확인 */
  checkID(
    id: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 신규가입 */
  joinMember(
    joinForm: JoinForm,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 연동회원 탈퇴 */
  quitMember(
    corpNum: string,
    quitReason: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  quitMember(
    corpNum: string,
    quitReason: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 회사정보 확인 */
  getCorpInfo(
    corpNum: string,
    success: SuccessCallback<CorpInfo>,
    error: ErrorCallback,
  ): void;
  getCorpInfo(
    corpNum: string,
    userID: string,
    success: SuccessCallback<CorpInfo>,
    error: ErrorCallback,
  ): void;

  /** 회사정보 수정 - 주의: BaseService 실제 시그니처는 (CorpNum, UserID, CorpInfo, s, e) */
  updateCorpInfo(
    corpNum: string,
    corpInfo: CorpInfo,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  updateCorpInfo(
    corpNum: string,
    userID: string,
    corpInfo: CorpInfo,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 담당자 추가 - 주의: BaseService 실제 시그니처는 (CorpNum, UserID, ContactInfo, s, e) */
  registContact(
    corpNum: string,
    contactInfo: ContactInfo,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  registContact(
    corpNum: string,
    userID: string,
    contactInfo: ContactInfo,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 담당자 정보 확인 */
  getContactInfo(
    corpNum: string,
    contactID: string,
    success: SuccessCallback<ContactInfo>,
    error: ErrorCallback,
  ): void;
  getContactInfo(
    corpNum: string,
    contactID: string,
    userID: string,
    success: SuccessCallback<ContactInfo>,
    error: ErrorCallback,
  ): void;

  /** 담당자 목록 확인 */
  listContact(
    corpNum: string,
    success: SuccessCallback<ContactInfo[]>,
    error: ErrorCallback,
  ): void;
  listContact(
    corpNum: string,
    userID: string,
    success: SuccessCallback<ContactInfo[]>,
    error: ErrorCallback,
  ): void;

  /** 담당자 정보 수정 - 주의: BaseService 실제 시그니처는 (CorpNum, UserID, ContactInfo, s, e) */
  updateContact(
    corpNum: string,
    contactInfo: ContactInfo,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  updateContact(
    corpNum: string,
    userID: string,
    contactInfo: ContactInfo,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 담당자 삭제 */
  deleteContact(
    corpNum: string,
    targetUserID: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 팝빌 로그인 팝업 URL */
  getAccessURL(
    corpNum: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getAccessURL(
    corpNum: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
}
