import { Injectable } from '@angular/core';
import { Account } from '../../srcDB/model/dataModels';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class AccountService extends BaseService<Account> {
	protected override endpoint: string = 'account';

	protected override deserialize(data: any): Account {
		return {
			id: data.id,
			user: data.user,
			year: data.year,
			transactionsByMonth: this.safeDeserializeMap(data.transactionsByMonth),
			budgetIdsByMonth: this.safeDeserializeMap(data.budgetIdsByMonth),
			icon: data.icon,
		};
	}

	protected override deserializeMany(data: any[]): Account[] {
		return data.map(item => this.deserialize(item));
	}
}