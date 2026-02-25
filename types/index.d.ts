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
 * Popbill SDK 메인 클래스
 */
export interface IPopbillSDK {
  EasyFinBankService(configs: PopbillConfig): IEasyFinBankService;
  CashbillService(configs: PopbillConfig): ICashbillService;
}

/**
 * EasyFinBankService 생성자
 */
export interface EasyFinBankServiceConstructor {
  new (configs: PopbillConfig): IEasyFinBankService;
}

/**
 * CashbillService 생성자
 */
export interface CashbillServiceConstructor {
  new (configs: PopbillConfig): ICashbillService;
}

/**
 * 팝빌 서비스 목록
 */
export interface PopbillServices {
  EasyFinBankService: EasyFinBankServiceConstructor;
  CashbillService: CashbillServiceConstructor;
}
