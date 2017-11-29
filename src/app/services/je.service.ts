import {Injectable, Injector} from '@angular/core';
import { Web3BaseService} from './web3-base.service';
import Contract from 'truffle-contract';
import {LedgerAccount, LedgerAccounts, JE} from '../models/LedgerAccounts';
import jeArtifact from '../../../build/contracts/JE.json';
import {SettingsService} from './settings.service';
@Injectable()
export class JEService  extends Web3BaseService {

  private je = Contract(jeArtifact);

  constructor() {
    super();
    //this.je.setProvider(this.conn.currentProvider);

  }

}
