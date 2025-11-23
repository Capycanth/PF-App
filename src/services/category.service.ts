import { Injectable } from '@angular/core';
import { Category } from '../../srcDB/model/dataModels';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class CategoryService extends BaseService<Category> {
	protected override endpoint: string = 'category';

	protected override deserialize(data: any): Category {
		return {
			id: data.id,
			name: data.name,
			subCategories: this.safeDeserializeArray(data.subCategories),
			type: data.type,
		};
	}

	protected override deserializeMany(data: any[]): Category[] {
		return data.map(item => this.deserialize(item));
	}
}