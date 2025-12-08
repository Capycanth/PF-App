import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class CategoryService extends BaseService<Category> {
	protected override endpoint: string = 'category';
}