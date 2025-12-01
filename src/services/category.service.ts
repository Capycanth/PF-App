import { Injectable } from '@angular/core';
import { Category } from '../../srcDB/model/dataModels';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class CategoryService extends BaseService<Category> {
	protected override endpoint: string = 'category';
}