import { Injectable } from '@angular/core';
import { Budget } from '../../srcDB/model/dataModels';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class BudgetService extends BaseService<Budget> {
	protected override endpoint: string = 'budget';

	protected override deserialize(data: any): Budget {
		return {
			id: data.id,
			name: data.name,
			limitsByCategoryId: this.safeDeserializeNestedMap(data.limitsByCategoryId),
		};
	}

	protected override deserializeMany(data: any[]): Budget[] {
		return data.map(item => this.deserialize(item));
	}
}