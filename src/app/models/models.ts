import {ItreeNode} from '../uihelpers/tree/tree.component';

export class UserModel  {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}
export class NavTreeNode implements ItreeNode {
  text: string;
  children: any[];
  hide: boolean;
  path: string;
}

export class Account {
  _id: string;
  name: string;
  address: string;
  privateKey: string;
  user: string;
  balance: number;
  xBalance: number;
}

export class Transact{
  timestamp: number;
  fromAddress: string;
  toAddress: string;
  value: number;
  receipt: string;
  user: string;
}


export class Consignment {
  timestamp: number;
  contractAddress: string;
  fromAddress: string;
  Price: number;
  location: string;
  user: string;
  description: string;
  state: string;
  receipt: string;

}
