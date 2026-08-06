import { supabase } from '@/config';

export class UserRepository {
  async findAll() {
    return supabase
      .from('users')
      .select('*');
  }

  async findById(id: string) {
    return supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
  }
}