import { Injectable } from '@angular/core';
import { Goal } from '../../srcDB/model/dataModels';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class GoalService extends BaseService<Goal> {
	protected override endpoint: string = 'goal';

	protected override deserialize(data: any): Goal {
		return {
			id: data.id,
			name: data.name,
			total_cost: data.total_cost,
			saved: data.saved,
			accountId: data.accountId,
			categoryId: data.categoryId,
			subCategory: data.subCategory,
		};
	}

	protected override deserializeMany(data: any[]): Goal[] {
		return data.map(item => this.deserialize(item));
	}
}