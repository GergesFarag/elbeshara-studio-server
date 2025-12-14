import { AdminDocument } from 'src/modules/admin/schemas/admin.schema';
import { GalleryItemType } from '../gellery-item.type';

export interface IGalleryItem {
  title: string;
  url: string;
  public_id: string;
  type: GalleryItemType;
  admin?: AdminDocument;
}
