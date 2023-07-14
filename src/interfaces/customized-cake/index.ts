import { UserInterface } from 'interfaces/user';
import { CakeDesignInterface } from 'interfaces/cake-design';
import { GetQueryInterface } from 'interfaces';

export interface CustomizedCakeInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  user_id?: string;
  cake_design_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  cake_design?: CakeDesignInterface;
  _count?: {};
}

export interface CustomizedCakeGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
  cake_design_id?: string;
}
