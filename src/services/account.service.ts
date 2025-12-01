import { Injectable } from '@angular/core';
import { Account } from '../../srcDB/model/dataModels';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class AccountService extends BaseService<Account> {
	protected override endpoint: string = 'account';
}