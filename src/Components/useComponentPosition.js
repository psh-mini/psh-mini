const componentPositions = {
    valve: { top: '18%', left: '29%' },
    pump: { top: '40%', left: '9%' },
    generator: { top: '40%', left: '22%' },
    'upper reservoir': { top: '18%', left: '13.5%' },
    'lower reservoir': { top: '40%', left: '15.5%' },
    flowrate: { top: '30%', left: '60%' },
    current: { top: '60%', left: '80%' },
  };
  
  export function useComponentPosition(name) {
    return componentPositions[name] || { top: '0%', left: '0%' };
  }
  