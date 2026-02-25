/**
 * Cashbill (현금영수증) API 타입 정의
 */

import { Response, PopbillException } from "./common";

// ========================
// Issue (발행) 타입
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
// Info (정보확인) 타입
// ========================

/**
 * 현금영수증 정보 (요약)
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
// View (보기/인쇄) 타입
// ========================

/**
 * 메일 설정
 */
export interface EmailSendConfig {
  emailType: string;
  sendYN: boolean;
}

// ========================
// Callback 타입
// ========================

export type SuccessCallback<T = any> = (response: T) => void;
export type ErrorCallback = (error: PopbillException) => void;

// ========================
// CashbillService 인터페이스
// ========================

export interface ICashbillService {
  // Issue (발행)
  registIssue(
    corpNum: string,
    cashbill: Cashbill,
    memo: string,
    userID: string,
    emailSubject: string,
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

  bulkSubmit(
    corpNum: string,
    submitID: string,
    cashbillList: Cashbill[],
    userID: string,
    success: SuccessCallback<BulkResponse>,
    error: ErrorCallback,
  ): void;

  getBulkResult(
    corpNum: string,
    submitID: string,
    userID: string,
    success: SuccessCallback<BulkCashbillResult>,
    error: ErrorCallback,
  ): void;

  delete(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  // Info (정보확인)
  getInfo(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<CashbillInfo>,
    error: ErrorCallback,
  ): void;

  getInfos(
    corpNum: string,
    mgtKeyList: string[],
    userID: string,
    success: SuccessCallback<CashbillInfo[]>,
    error: ErrorCallback,
  ): void;

  getDetailInfo(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<CashbillDetail>,
    error: ErrorCallback,
  ): void;

  checkMgtKeyInUse(
    corpNum: string,
    mgtKey: string,
    userID: string,
    success: SuccessCallback<boolean>,
    error: ErrorCallback,
  ): void;

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

  getURL(
    corpNum: string,
    togo: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  // View (보기/인쇄)
  getPopUpURL(
    corpNum: string,
    mgtKey: string,
    userID: string,
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

  getPrintURL(
    corpNum: string,
    mgtKey: string,
    userID: string,
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

  getMailURL(
    corpNum: string,
    mgtKey: string,
    userID: string,
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

  // Etc (부가기능)
  sendEmail(
    corpNum: string,
    mgtKey: string,
    receiver: string,
    userID: string,
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

  sendFAX(
    corpNum: string,
    mgtKey: string,
    sender: string,
    receiver: string,
    userID: string,
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

  listEmailConfig(
    corpNum: string,
    userID: string,
    success: SuccessCallback<EmailSendConfig[]>,
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
}
