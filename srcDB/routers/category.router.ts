import { Category } from '../model/dataModels';
import { createBaseRouter } from './factory.router';

export default createBaseRouter('category', (data: any | any[]): Category[] => {
    if (Array.isArray(data)) {
        return data.map(item => parseCategory(item))
    } else {
        return [parseCategory(data)]
    }
});

function parseCategory(data: any): Category {
    return {
        id: data.id,
        name: data.name,
        type: data.type,
        subCategories: JSON.parse(data.subCategories) ?? [],
    };
}