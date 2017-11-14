export class LedgerAccount{
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
}


export const LedgerAccounts: Array<LedgerAccount> = [
  {name: 'Cash', type: 'Asset', accountNumber: null, balance: 0} ,
  {name: 'Accounts Receivable', type: 'Asset', accountNumber: null, balance: 0} ,
  {name: 'Allowance for Bad Debts', type: 'Contra-Asset', accountNumber: null, balance: 0} ,
  {name: 'Fixed Assets', type: 'Asset', accountNumber: null, balance: 0} ,
  {name: 'Long-term Debt', type: 'Liability', accountNumber: null, balance: 0} ,
  {name: 'Accounts Payable', type: 'Liability', accountNumber: null, balance: 0} ,
  {name: 'Income', type: 'Income', accountNumber: null, balance: 0} ,
  {name: 'Expenses', type: 'Expense', accountNumber: null, balance: 0} ,
  {name: 'Retained Earnings', type: 'Equity', accountNumber: null, balance: 0}
 ];

export  class JE{
  db: number;
  cr: number;
  amount: number;
}
