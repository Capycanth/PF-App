import { BaseService } from './base.service';
import { Account } from '../../srcDB/model/dataModels';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class AccountService extends BaseService<Account> {
	protected override endpoint: string = 'account';
}