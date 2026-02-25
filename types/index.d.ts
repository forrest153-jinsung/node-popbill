/**
 * Popbill SDK main type definitions
 */

import { IEasyFinBankService } from "./easyfinbank";
import { ICashbillService } from "./cashbill";

export * from "./easyfinbank";
export * from "./cashbill";
export * from "./common";

/**
 * 팝빌 SDK 설정
 */
export interface PopbillConfig {
  LinkID: string;
  SecretKey: string;
  IsTest?: boolean;
  UseStaticIP?: boolean;
  UseGAIP?: boolean;
  IPRestrictOnOff?: boolean;
  UseLocalTimeYN?: boolean;
}

/**
 * 팝빌 SDK 메인 모듈
 */
export interface IPopbill {
  config(config: PopbillConfig): void;
  EasyFinBankService(): IEasyFinBankService;
  CashbillService(): ICashbillService;
  TaxinvoiceService(): any;
  StatementService(): any;
  MessageService(): any;
  KakaoService(): any;
  FaxService(): any;
  HTTaxinvoiceService(): any;
  HTCashbillService(): any;
  ClosedownService(): any;
  BizInfoCheckService(): any;
  AccountCheckService(): any;
  MgtKeyType: {
    SELL: string;
    BUY: string;
    TRUSTEE: string;
  };
  MessageType: {
    SMS: string;
    LMS: string;
    MMS: string;
  };
  KakaoType: {
    ATS: string;
    FTS: string;
    FMS: string;
  };
}

declare const popbill: IPopbill;
export default popbill;
