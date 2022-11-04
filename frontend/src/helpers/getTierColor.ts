export const getTierColor = (tier: string): string => {
  if (tier.includes('Diamond')) return 'cyan.300';
  else if (tier.includes('Platinum')) return 'blue.400';
  else if (tier.includes('Gold')) return 'yellow.400';
  else if (tier.includes('Silver')) return 'gray.500';
  else if (tier.includes('Bronze')) return 'brown.400';
  else return 'green.400';
};
