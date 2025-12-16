import { AdminDocument } from '../../admin/schemas/admin.schema';
import { GalleryItemType } from '../gellery-item.type';

export interface IGalleryItem {
  url: string;
  public_id: string;
  type: GalleryItemType;
  isReel: boolean;
  admin?: AdminDocument;
}
