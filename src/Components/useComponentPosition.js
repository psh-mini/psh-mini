const componentPositions = {
  'upper reservoir': { top: '30%', left: '15%' },
    valve: { top: '30%', left: '45%' },
    'valve button': { top: '38%', left: '45%' },
    generator: { top: '60%', left: '75%' },
    'lower reservoir': { top: '60%', left: '45%' },
    pump: { top: '60%', left: '15%' },
    'pump button': { top: '68%', left: '15%' },
  };
  
  export function useComponentPosition(name) {
    return componentPositions[name] || { top: '0%', left: '0%' };
  }
  