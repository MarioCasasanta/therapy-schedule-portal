
import { supabase } from "@/integrations/supabase/client";

export interface Benefit {
  id: string;
  name: string;
  description?: string;
  type: string;
  audience: 'therapist' | 'client' | 'both';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  plan_type: 'basic' | 'professional' | 'premium';
  benefits?: Benefit[];
  created_at?: string;
  updated_at?: string;
}

export const getTherapistPlans = async (): Promise<SubscriptionPlan[]> => {
  // Fetch therapist plans
  const { data: plans, error: plansError } = await supabase
    .from('therapist_subscription_plans')
    .select('*')
    .order('price');
  
  if (plansError) {
    console.error('Error fetching therapist plans:', plansError);
    return [];
  }

  // Fetch plan benefits relationships
  const plansWithBenefits = await Promise.all(plans.map(async (plan) => {
    const { data: benefitRelations, error: relationsError } = await supabase
      .from('therapist_plan_benefits')
      .select(`
        benefit_id,
        benefits (
          id,
          name,
          description,
          type,
          audience
        )
      `)
      .eq('plan_id', plan.id);

    if (relationsError) {
      console.error('Error fetching plan benefits:', relationsError);
      return { ...plan, benefits: [] };
    }

    // Cast the audience to the correct type
    const benefits = benefitRelations.map(relation => ({
      ...relation.benefits,
      audience: relation.benefits.audience as 'therapist' | 'client' | 'both'
    }));

    return { ...plan, benefits };
  }));

  return plansWithBenefits as SubscriptionPlan[];
};

export const getClientPlans = async (): Promise<SubscriptionPlan[]> => {
  // Fetch client plans
  const { data: plans, error: plansError } = await supabase
    .from('client_subscription_plans')
    .select('*')
    .order('price');
  
  if (plansError) {
    console.error('Error fetching client plans:', plansError);
    return [];
  }

  // Fetch plan benefits relationships
  const plansWithBenefits = await Promise.all(plans.map(async (plan) => {
    const { data: benefitRelations, error: relationsError } = await supabase
      .from('client_plan_benefits')
      .select(`
        benefit_id,
        benefits (
          id,
          name,
          description,
          type,
          audience
        )
      `)
      .eq('plan_id', plan.id);

    if (relationsError) {
      console.error('Error fetching plan benefits:', relationsError);
      return { ...plan, benefits: [] };
    }

    // Cast the audience to the correct type
    const benefits = benefitRelations.map(relation => ({
      ...relation.benefits,
      audience: relation.benefits.audience as 'therapist' | 'client' | 'both'
    }));

    return { ...plan, benefits };
  }));

  return plansWithBenefits as SubscriptionPlan[];
};

export const subscribeToPlan = async (
  userId: string, 
  planId: string, 
  userType: 'therapist' | 'client'
): Promise<{ success: boolean, error?: any }> => {
  const table = userType === 'therapist' ? 'therapist_subscriptions' : 'client_subscriptions';
  
  const { error } = await supabase
    .from(table)
    .insert({
      user_id: userId,
      plan_id: planId,
      status: 'active',
      start_date: new Date().toISOString(),
      // End date would typically be calculated based on subscription period
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    });
  
  if (error) {
    console.error(`Error subscribing to ${userType} plan:`, error);
    return { success: false, error };
  }
  
  return { success: true };
};
