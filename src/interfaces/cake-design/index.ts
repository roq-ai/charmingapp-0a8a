import { CustomizedCakeInterface } from 'interfaces/customized-cake';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface CakeDesignInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;
  customized_cake?: CustomizedCakeInterface[];
  business?: BusinessInterface;
  _count?: {
    customized_cake?: number;
  };
}

export interface CakeDesignGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  business_id?: string;
}
