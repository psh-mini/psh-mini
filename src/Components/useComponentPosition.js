const componentPositions = {
    valve: { top: '28%', left: '22%' },
    pump: { top: '84%', left: '22%' },
    generator: { top: '58%', left: '68%' },
    'upper reservoir': { top: '25%', left: '10%' },
    'lower reservoir': { top: '66%', left: '42%' },
  };
  
  export function useComponentPosition(name) {
    return componentPositions[name] || { top: '0%', left: '0%' };
  }
  