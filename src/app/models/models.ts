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

export class Wallet {
  account: string;
  name: string;
  passPhrase: string;
  user: string;
}
