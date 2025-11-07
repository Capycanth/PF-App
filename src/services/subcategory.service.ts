import { BaseService } from './base.service';
import { SubCategory } from '../../srcDB/model/dataModels'; import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class SubCategoryService extends BaseService<SubCategory> {
	protected override endpoint: string = 'subcategory';
}