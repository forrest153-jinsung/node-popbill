/**
 * Cashbill (현금영수증) API 타입 정의
 * 공식 문서: https://developers.popbill.com/reference/cashbill/node/api
 */

import {
  Response,
  ChargeInfo,
  PaymentForm,
  PaymentResponse,
  PaymentHistory,
  PaymentHistoryResult,
  UseHistoryResult,
  RefundForm,
  RefundResponse,
  RefundHistory,
  RefundHistoryResult,
  JoinForm,
  CorpInfo,
  ContactInfo,
  SuccessCallback,
  ErrorCallback,
} from "./common";

// ========================
// 발행 (Issue) 타입
// ========================

/**
 * 현금영수증 객체
 */
export interface Cashbill {
  mgtKey: string;
  tradeDate?: string;
  tradeType?: string;
  tradeUsage: string;
  tradeOpt?: string;
  taxationType?: string;
  totalAmount: string;
  supplyCost: string;
  tax: string;
  serviceFee?: string;
  franchiseCorpNum?: string;
  franchiseTaxRegID?: string;
  franchiseCorpName?: string;
  franchiseCEOName?: string;
  franchiseAddr?: string;
  franchiseTEL?: string;
  identityNum: string;
  customerName: string;
  itemName: string;
  orderNumber?: string;
  email?: string;
  hp: string;
  smssendYN?: boolean;
  memo?: string;
  fax?: string;
  // 취소 현금영수증 필드
  orgConfirmNum?: string;
  orgTradeDate?: string;
  isPartCancel?: boolean;
  cancelType?: number;
  tradeDT?: string;
}

/**
 * 발행 응답
 */
export interface IssueResponse {
  code: number;
  message: string;
  confirmNum: string;
  tradeDate: string;
}

/**
 * 초대량 발행 응답
 */
export interface BulkResponse {
  code: number;
  message: string;
  receiptID: string;
}

/**
 * 초대량 발행 결과
 */
export interface BulkCashbillResult {
  code: number;
  message: string;
  submitID: string;
  submitCount: number;
  successCount: number;
  failCount: number;
  txState: number;
  txResultCode: number;
  txStartDT: string;
  txEndDT: string;
  receiptDT: string;
  receiptID: string;
  issueResult: BulkCashbillIssueResult[];
}

/**
 * 초대량 발행 개별 결과
 */
export interface BulkCashbillIssueResult {
  mgtKey: string;
  code: number;
  message: string;
  confirmNum?: string;
  tradeDate?: string;
}

// ========================
// 정보확인 (Info) 타입
// ========================

/**
 * 현금영수증 상태/요약 정보
 */
export interface CashbillInfo {
  itemKey: string;
  mgtKey: string;
  tradeDate: string;
  tradeDT: string;
  tradeType: string;
  tradeUsage: string;
  tradeOpt: string;
  taxationType: string;
  totalAmount: string;
  supplyCost: string;
  tax: string;
  serviceFee: string;
  issueDT: string;
  regDT: string;
  stateMemo: string;
  stateCode: number;
  stateDT: string;
  identityNum: string;
  itemName: string;
  orderNumber: string;
  email: string;
  hp: string;
  customerName: string;
  confirmNum: string;
  orgConfirmNum?: string;
  orgTradeDate?: string;
  ntssendDT: string;
  ntsresultDT: string;
  ntsresultCode: string;
  ntsresultMessage: string;
  printYN: boolean;
  interOPYN: boolean;
}

/**
 * 현금영수증 상세 정보
 */
export interface CashbillDetail {
  mgtKey: string;
  confirmNum: string;
  orgConfirmNum?: string;
  orgTradeDate?: string;
  tradeDate: string;
  tradeDT: string;
  tradeType: string;
  tradeUsage: string;
  tradeOpt: string;
  taxationType: string;
  totalAmount: string;
  supplyCost: string;
  tax: string;
  serviceFee: string;
  franchiseCorpNum: string;
  franchiseTaxRegID: string;
  franchiseCorpName: string;
  franchiseCEOName: string;
  franchiseAddr: string;
  franchiseTEL: string;
  identityNum: string;
  customerName: string;
  itemName: string;
  orderNumber: string;
  email: string;
  hp: string;
  smssendYN: boolean;
  cancelType?: number;
}

/**
 * 현금영수증 검색 결과
 */
export interface CBSearchResult {
  code: string;
  message: string;
  total: string;
  perPage: string;
  pageNum: string;
  pageCount: string;
  list: CashbillInfo[];
}

// ========================
// 부가기능 (Etc) 타입
// ========================

/**
 * 메일 설정
 */
export interface EmailSendConfig {
  emailType: string;
  sendYN: boolean;
}

// ========================
// CashbillService 인터페이스
// ========================

export interface ICashbillService {
  // ========================
  // 발행 (Issue) - 5 methods
  // https://developers.popbill.com/reference/cashbill/node/api/issue
  // ========================

  /** 승인 현금영수증 즉시발행 */
  registIssue(
    corpNum: string,
    cashbill: Cashbill,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;
  registIssue(
    corpNum: string,
    cashbill: Cashbill,
    memo: string,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;
  registIssue(
    corpNum: string,
    cashbill: Cashbill,
    memo: string,
    userID: string,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;
  registIssue(
    corpNum: string,
    cashbill: Cashbill,
    memo: string,
    userID: string,
    emailSubject: string,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;

  /** 취소 현금영수증 즉시발행 */
  revokeRegistIssue(
    corpNum: string,
    mgtKey: string,
    orgConfirmNum: string,
    orgTradeDate: string,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;
  revokeRegistIssue(
    corpNum: string,
    mgtKey: string,
    orgConfirmNum: string,
    orgTradeDate: string,
    smssendYN: boolean,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;
  revokeRegistIssue(
    corpNum: string,
    mgtKey: string,
    orgConfirmNum: string,
    orgTradeDate: string,
    smssendYN: boolean,
    memo: string,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;
  revokeRegistIssue(
    corpNum: string,
    mgtKey: string,
    orgConfirmNum: string,
    orgTradeDate: string,
    smssendYN: boolean,
    memo: string,
    userID: string,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;
  revokeRegistIssue(
    corpNum: string,
    mgtKey: string,
    orgConfirmNum: string,
    orgTradeDate: string,
    smssendYN: boolean,
    memo: string,
    isPartCancel: boolean,
    cancelType: number,
    supplyCost: string,
    tax: string,
    serviceFee: string,
    totalAmount: string,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;
  revokeRegistIssue(
    corpNum: string,
    mgtKey: string,
    orgConfirmNum: string,
    orgTradeDate: string,
    smssendYN: boolean,
    memo: string,
    userID: string,
    isPartCancel: boolean,
    cancelType: number,
    supplyCost: string,
    tax: string,
    serviceFee: string,
    totalAmount: string,
    emailSubject: string,
    tradeDT: string,
    success: SuccessCallback<IssueResponse>,
    error: ErrorCallback,
  ): void;

  /** 초대량 현금영수증 발행 접수 */
  bulkSubmit(
    corpNum: string,
    submitID: string,
    cashbillList: Cashbill[],
    success: SuccessCallback<BulkResponse>,
    error: ErrorCallback,
  ): void;
  bulkSubmit(
    corpNum: string,
    submitID: string,
    cashbillList: Cashbill[],
    userID: string,
    success: SuccessCallback<BulkResponse>,
    error: ErrorCallback,
  ): void;

  /** 초대량 현금영수증 접수결과 확인 */
  getBulkResult(
    corpNum: string,
    submitID: string,
    success: SuccessCallback<BulkCashbillResult>,
    error: ErrorCallback,
  ): void;
  getBulkResult(
    corpNum: string,
    submitID: string,
    userID: string,
    success: SuccessCallback<BulkCashbillResult>,
    error: ErrorCallback,
  ): void;

  /** 현금영수증 삭제 */
  delete(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  delete(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  // ========================
  // 정보확인 (Info) - 6 methods
  // https://developers.popbill.com/reference/cashbill/node/api/info
  // ========================

  /** 현금영수증 상태/요약 정보 확인 */
  getInfo(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<CashbillInfo>,
    error: ErrorCallback,
  ): void;
  getInfo(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<CashbillInfo>,
    error: ErrorCallback,
  ): void;

  /** 현금영수증 다수건 상태/요약 정보 확인 */
  getInfos(
    corpNum: string,
    mgtKeyList: string[],
    success: SuccessCallback<CashbillInfo[]>,
    error: ErrorCallback,
  ): void;
  getInfos(
    corpNum: string,
    mgtKeyList: string[],
    userID: string,
    success: SuccessCallback<CashbillInfo[]>,
    error: ErrorCallback,
  ): void;

  /** 현금영수증 상세정보 확인 */
  getDetailInfo(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<CashbillDetail>,
    error: ErrorCallback,
  ): void;
  getDetailInfo(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<CashbillDetail>,
    error: ErrorCallback,
  ): void;

  /** 문서번호 사용여부 확인 */
  checkMgtKeyInUse(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<boolean>,
    error: ErrorCallback,
  ): void;
  checkMgtKeyInUse(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<boolean>,
    error: ErrorCallback,
  ): void;

  /** 현금영수증 목록 조회 (전체 파라미터) */
  search(
    corpNum: string,
    dType: string,
    sDate: string,
    eDate: string,
    state: string[],
    tradeType: string[],
    tradeUsage: string[],
    tradeOpt: string[],
    taxationType: string[],
    qString: string,
    order: string,
    page: number,
    perPage: number,
    franchiseTaxRegID: string,
    userID: string,
    success: SuccessCallback<CBSearchResult>,
    error: ErrorCallback,
  ): void;
  /** 현금영수증 목록 조회 (UserID 생략) */
  search(
    corpNum: string,
    dType: string,
    sDate: string,
    eDate: string,
    state: string[],
    tradeType: string[],
    tradeUsage: string[],
    tradeOpt: string[],
    taxationType: string[],
    qString: string,
    order: string,
    page: number,
    perPage: number,
    franchiseTaxRegID: string,
    success: SuccessCallback<CBSearchResult>,
    error: ErrorCallback,
  ): void;
  /** 현금영수증 목록 조회 (FranchiseTaxRegID, UserID 생략) */
  search(
    corpNum: string,
    dType: string,
    sDate: string,
    eDate: string,
    state: string[],
    tradeType: string[],
    tradeUsage: string[],
    tradeOpt: string[],
    taxationType: string[],
    qString: string,
    order: string,
    page: number,
    perPage: number,
    success: SuccessCallback<CBSearchResult>,
    error: ErrorCallback,
  ): void;
  /** 현금영수증 목록 조회 (TradeOpt 생략) */
  search(
    corpNum: string,
    dType: string,
    sDate: string,
    eDate: string,
    state: string[],
    tradeType: string[],
    tradeUsage: string[],
    taxationType: string[],
    qString: string,
    order: string,
    page: number,
    perPage: number,
    success: SuccessCallback<CBSearchResult>,
    error: ErrorCallback,
  ): void;
  /** 현금영수증 목록 조회 (TradeOpt, QString 생략) */
  search(
    corpNum: string,
    dType: string,
    sDate: string,
    eDate: string,
    state: string[],
    tradeType: string[],
    tradeUsage: string[],
    taxationType: string[],
    order: string,
    page: number,
    perPage: number,
    success: SuccessCallback<CBSearchResult>,
    error: ErrorCallback,
  ): void;

  /** 문서함 팝업 URL */
  getURL(
    corpNum: string,
    togo: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getURL(
    corpNum: string,
    togo: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  // ========================
  // 보기/인쇄 (View) - 6 methods
  // https://developers.popbill.com/reference/cashbill/node/api/view
  // ========================

  /** 현금영수증 보기 팝업 URL */
  getPopUpURL(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getPopUpURL(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  /** 현금영수증 보기 URL (보기 전용) */
  getViewURL(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getViewURL(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  /** 현금영수증 인쇄 팝업 URL */
  getPrintURL(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getPrintURL(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  /** 현금영수증 다건 인쇄 팝업 URL */
  getMassPrintURL(
    corpNum: string,
    mgtKeyList: string[],
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getMassPrintURL(
    corpNum: string,
    mgtKeyList: string[],
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  /** 현금영수증 메일링크 URL */
  getMailURL(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getMailURL(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  /** PDF 다운로드 URL */
  getPDFURL(
    corpNum: string,
    mgtKey: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getPDFURL(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  // ========================
  // 부가기능 (Etc) - 6 methods
  // https://developers.popbill.com/reference/cashbill/node/api/etc
  // ========================

  /** 메일 재전송 */
  sendEmail(
    corpNum: string,
    mgtKey: string,
    receiver: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  sendEmail(
    corpNum: string,
    mgtKey: string,
    receiver: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 문자 재전송 */
  sendSMS(
    corpNum: string,
    mgtKey: string,
    sender: string,
    receiver: string,
    contents: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  sendSMS(
    corpNum: string,
    mgtKey: string,
    sender: string,
    receiver: string,
    contents: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 팩스 전송 */
  sendFAX(
    corpNum: string,
    mgtKey: string,
    sender: string,
    receiver: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  sendFAX(
    corpNum: string,
    mgtKey: string,
    sender: string,
    receiver: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 문서번호 할당 */
  assignMgtKey(
    corpNum: string,
    itemKey: string,
    mgtKey: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  assignMgtKey(
    corpNum: string,
    itemKey: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  /** 알림메일 발송설정 목록 조회 */
  listEmailConfig(
    corpNum: string,
    success: SuccessCallback<EmailSendConfig[]>,
    error: ErrorCallback,
  ): void;
  listEmailConfig(
    corpNum: string,
    userID: string,
    success: SuccessCallback<EmailSendConfig[]>,
    error: ErrorCallback,
  ): void;

  /** 알림메일 발송설정 수정 */
  updateEmailConfig(
    corpNum: string,
    emailType: string,
    sendYN: boolean,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  updateEmailConfig(
    corpNum: string,
    emailType: string,
    sendYN: boolean,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  // ========================
  // 공통 API - 포인트 관리 (16 methods)
  // https://developers.popbill.com/reference/cashbill/node/common-api/point
  // ========================

  /** 발행 단가 확인 */
  getUnitCost(
    corpNum: string,
    success: SuccessCallback<number>,
    error: ErrorCallback,
  ): void;

  /** 과금정보 확인 */
  getChargeInfo(
    corpNum: string,
    success: SuccessCallback<ChargeInfo>,
    error: ErrorCallback,
  ): void;
  getChargeInfo(
    corpNum: string,
    userID: string,
    success: SuccessCallback<ChargeInfo>,
    error: ErrorCallback,
  ): void;

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

  // ========================
  // 공통 API - 회원 관리 (12 methods)
  // https://developers.popbill.com/reference/cashbill/node/common-api/member
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

  /** 회사정보 수정 */
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

  /** 담당자 추가 */
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

  /** 담당자 정보 수정 */
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
