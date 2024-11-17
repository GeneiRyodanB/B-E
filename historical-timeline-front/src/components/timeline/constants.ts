export const periodStyles = {
    'Pre-Colonial': {
      dot: 'bg-amber-500',
      line: 'bg-amber-200',
      border: 'border-amber-500',
      text: 'text-amber-700',
      cardBorder: 'border-l-amber-500',
      lightBg: 'bg-amber-50',
      hoverBg: 'hover:bg-amber-100',
      icon: 'text-amber-500'
    },
    'Colonial Era': {
      dot: 'bg-blue-500',
      line: 'bg-blue-200',
      border: 'border-blue-500',
      text: 'text-blue-700',
      cardBorder: 'border-l-blue-500',
      lightBg: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100',
      icon: 'text-blue-500'
    },
    'Independence': {
      dot: 'bg-green-500',
      line: 'bg-green-200',
      border: 'border-green-500',
      text: 'text-green-700',
      cardBorder: 'border-l-green-500',
      lightBg: 'bg-green-50',
      hoverBg: 'hover:bg-green-100',
      icon: 'text-green-500'
    }
  } as const
  
  export const eventTypeStyles = {
    diplomatic: {
      icon: 'text-purple-500',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    military: {
      icon: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-200'
    },
    political: {
      icon: 'text-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    economic: {
      icon: 'text-green-500',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    cultural: {
      icon: 'text-yellow-500',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    social: {
      icon: 'text-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-200'
    },
    institutional: {
      icon: 'text-indigo-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200'
    }
  } as const