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
 * 모든 Popbill 서비스가 포함해야 할 공통 API
 */
export interface ICommonService {
  // ========================
  // Point 관리 API
  // ========================

  /**
   * 포인트 잔액 조회
   */
  getBalance(
    corpNum: string,
    success: SuccessCallback<number>,
    error: ErrorCallback,
  ): void;

  /**
   * 포인트 결제 이력 조회
   */
  getPaymentHistory(
    corpNum: string,
    pageNum: number,
    pageSize: number,
    success: SuccessCallback<PaymentHistoryResult>,
    error: ErrorCallback,
  ): void;

  /**
   * 포인트 사용 이력 조회
   */
  getUseHistory(
    corpNum: string,
    pageNum: number,
    pageSize: number,
    success: SuccessCallback<UseHistoryResult>,
    error: ErrorCallback,
  ): void;

  /**
   * 환불 신청
   */
  requestRefund(
    corpNum: string,
    refundForm: RefundForm,
    success: SuccessCallback<RefundResponse>,
    error: ErrorCallback,
  ): void;

  /**
   * 환불 이력 조회
   */
  getRefundHistory(
    corpNum: string,
    pageNum: number,
    pageSize: number,
    success: SuccessCallback<RefundHistoryResult>,
    error: ErrorCallback,
  ): void;

  /**
   * 정액제 상태 조회
   */
  getFlatRateState(
    corpNum: string,
    success: SuccessCallback<FlatRateState>,
    error: ErrorCallback,
  ): void;

  /**
   * 과금 정보 조회
   */
  getChargeInfo(
    corpNum: string,
    success: SuccessCallback<ChargeInfo>,
    error: ErrorCallback,
  ): void;

  // ========================
  // Member 관리 API
  // ========================

  /**
   * 회사 정보 조회
   */
  getCorpInfo(
    corpNum: string,
    success: SuccessCallback<CorpInfo>,
    error: ErrorCallback,
  ): void;

  /**
   * 담당자 정보 목록 조회
   */
  getContactInfoList(
    corpNum: string,
    success: SuccessCallback<ContactInfo[]>,
    error: ErrorCallback,
  ): void;

  /**
   * 담당자 정보 등록
   */
  registContact(
    corpNum: string,
    contactInfo: ContactInfo,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /**
   * 담당자 정보 수정
   */
  updateContact(
    corpNum: string,
    contactInfo: ContactInfo,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /**
   * 담당자 정보 삭제
   */
  deleteContact(
    corpNum: string,
    contactID: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
}