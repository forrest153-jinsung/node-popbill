/**
 * EasyFinBank API 타입 정의
 */

import {
  Response,
  ChargeInfo,
  FlatRateState,
  SuccessCallback,
  ErrorCallback,
  ICommonService,
} from "./common";

// ========================
// 계좌 관리 (Manage) 타입
// ========================

/**
 * 계좌 정보
 */
export interface EasyFinBankAccount {
  accountNumber: string;
  bankCode: string;
  accountName: string;
  accountType: string;
  state: number;
  regDT: string;
  contractDT: string;
  useEndDate: string;
  baseDate: number;
  contractState: number;
  closeRequestYN: boolean;
  useRestrictYN: boolean;
  closeOnExpired: boolean;
  unPaidYN: boolean;
  memo: string;
}

/**
 * 계좌 등록 정보
 */
export interface EasyFinBankAccountForm {
  BankCode: string;
  AccountNumber: string;
  AccountPWD: string;
  AccountType: string;
  AccountName?: string;
  IdentityNumber: string;
  BankID?: string;
  FastID?: string;
  FastPWD?: string;
  UsePeriod?: number;
  Memo?: string;
}

/**
 * 계좌 정보 수정 양식
 */
export interface UpdateEasyFinBankAccountForm {
  AccountPWD: string;
  AccountName?: string;
  BankID?: string;
  FastID?: string;
  FastPWD?: string;
  Memo?: string;
}

// ========================
// 거래내역 수집 요청 (Job) 타입
// ========================

/**
 * 거래내역 수집 상태
 */
export interface EasyFinBankJobState {
  jobID: string;
  jobState: string;
  startDate: string;
  endDate: string;
  errorCode: number;
  errorReason: string;
  jobStartDT: string;
  jobEndDT: string;
  regDT: string;
}

// ========================
// 거래내역 확인 (Search) 타입
// ========================

/**
 * 거래내역 검색 응답
 */
export interface EasyFinBankSearchResult {
  code: number;
  message: string;
  total: number;
  perPage: number;
  pageNum: number;
  pageCount: number;
  lastScrapDT: string;
  balance: string;
  list: EasyFinBankSearchDetail[];
}

/**
 * 거래내역 상세 정보
 */
export interface EasyFinBankSearchDetail {
  tid: string;
  trdt: string;
  tram: string;
  trtype: string;
  acctname: string;
  acctnum: string;
  memo: string;
  remark1: string;
  remark2: string;
  remark3: string;
}

/**
 * 거래내역 합계 정보
 */
export interface EasyFinBankSummary {
  count: number;
  cntAccIn: number;
  cntAccOut: number;
  totalAccIn: number;
  totalAccOut: number;
}

// EasyFinBank에서 사용하는 FlatRateState, ChargeInfo는 common.d.ts에서 import

// ========================
// EasyFinBankService 클래스
// ========================

export interface IEasyFinBankService extends ICommonService {
  // 계좌 관리
  registBankAccount(
    corpNum: string,
    bankAccountInfo: EasyFinBankAccountForm,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  registBankAccount(
    corpNum: string,
    bankAccountInfo: EasyFinBankAccountForm,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  updateBankAccount(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    bankAccountInfo: UpdateEasyFinBankAccountForm,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  updateBankAccount(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    bankAccountInfo: UpdateEasyFinBankAccountForm,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  updateBankAccount(
    corpNum: string,
    bankAccountInfo: UpdateEasyFinBankAccountForm & {
      BankCode: string;
      AccountNumber: string;
    },
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  updateBankAccount(
    corpNum: string,
    bankAccountInfo: UpdateEasyFinBankAccountForm & {
      BankCode: string;
      AccountNumber: string;
    },
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  getBankAccountInfo(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    userID: string,
    success: SuccessCallback<EasyFinBankAccount>,
    error: ErrorCallback,
  ): void;
  getBankAccountInfo(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    success: SuccessCallback<EasyFinBankAccount>,
    error: ErrorCallback,
  ): void;

  listBankAccount(
    corpNum: string,
    userID: string,
    success: SuccessCallback<EasyFinBankAccount[]>,
    error: ErrorCallback,
  ): void;
  listBankAccount(
    corpNum: string,
    success: SuccessCallback<EasyFinBankAccount[]>,
    error: ErrorCallback,
  ): void;

  getBankAccountMgtURL(
    corpNum: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getBankAccountMgtURL(
    corpNum: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  closeBankAccount(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    closeType: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  closeBankAccount(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    closeType: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  revokeCloseBankAccount(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  revokeCloseBankAccount(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  deleteBankAccount(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  deleteBankAccount(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  getChargeInfo(
    corpNum: string,
    userID: string,
    success: SuccessCallback<ChargeInfo>,
    error: ErrorCallback,
  ): void;
  getChargeInfo(
    corpNum: string,
    success: SuccessCallback<ChargeInfo>,
    error: ErrorCallback,
  ): void;

  // 거래내역 수집 요청
  requestJob(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    sDate: string,
    eDate: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  requestJob(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    sDate: string,
    eDate: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  getJobState(
    corpNum: string,
    jobID: string,
    userID: string,
    success: SuccessCallback<EasyFinBankJobState>,
    error: ErrorCallback,
  ): void;
  getJobState(
    corpNum: string,
    jobID: string,
    success: SuccessCallback<EasyFinBankJobState>,
    error: ErrorCallback,
  ): void;

  listActiveJob(
    corpNum: string,
    userID: string,
    success: SuccessCallback<EasyFinBankJobState[]>,
    error: ErrorCallback,
  ): void;
  listActiveJob(
    corpNum: string,
    success: SuccessCallback<EasyFinBankJobState[]>,
    error: ErrorCallback,
  ): void;

  // 거래내역 확인
  search(
    corpNum: string,
    jobID: string,
    tradeType: string[],
    searchString: string,
    page: number,
    perPage: number,
    order: string,
    userID: string,
    success: SuccessCallback<EasyFinBankSearchResult>,
    error: ErrorCallback,
  ): void;
  search(
    corpNum: string,
    jobID: string,
    tradeType: string[],
    searchString: string,
    page: number,
    perPage: number,
    order: string,
    success: SuccessCallback<EasyFinBankSearchResult>,
    error: ErrorCallback,
  ): void;

  summary(
    corpNum: string,
    jobID: string,
    tradeType: string[],
    searchString: string,
    userID: string,
    success: SuccessCallback<EasyFinBankSummary>,
    error: ErrorCallback,
  ): void;
  summary(
    corpNum: string,
    jobID: string,
    tradeType: string[],
    searchString: string,
    success: SuccessCallback<EasyFinBankSummary>,
    error: ErrorCallback,
  ): void;

  saveMemo(
    corpNum: string,
    tid: string,
    memo: string,
    userID: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;
  saveMemo(
    corpNum: string,
    tid: string,
    memo: string,
    success: SuccessCallback<Response>,
    error: ErrorCallback,
  ): void;

  // 정액제 관련
  getFlatRatePopUpURL(
    corpNum: string,
    userID: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;
  getFlatRatePopUpURL(
    corpNum: string,
    success: SuccessCallback<string>,
    error: ErrorCallback,
  ): void;

  getFlatRateState(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    userID: string,
    success: SuccessCallback<FlatRateState>,
    error: ErrorCallback,
  ): void;
  getFlatRateState(
    corpNum: string,
    bankCode: string,
    accountNumber: string,
    success: SuccessCallback<FlatRateState>,
    error: ErrorCallback,
  ): void;
}
