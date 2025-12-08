import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from '../../shared/model/base.model';

@Injectable({ providedIn: 'any' })
export abstract class BaseService<T extends Base> {
	protected abstract endpoint: string;
	protected baseUrl: string = 'http://localhost:3000/api';

	constructor(protected http: HttpClient) { }

	public getAll(): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
	}

	public getById(id: string): Observable<T> {
		return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
	}

	public getByIdList(ids: string[]): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}?ids=${ids.join(',')}`);
	}

	public post(data: T): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, data);
	}

	public put(data: T): Observable<T> {
		return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${data.id}`, data);
	}

	public delete(id: string): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
	}
}