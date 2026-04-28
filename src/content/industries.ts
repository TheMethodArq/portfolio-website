/**
 * Industries data — placeholder.
 * Industry routes were removed during refactoring.
 */

export interface Industry {
  slug: string;
  name: string;
  icon: string;
  challenge: string;
  status: 'active' | 'exploring' | 'planned';
  possibilities: string[];
}

export const industries: Industry[] = [];
