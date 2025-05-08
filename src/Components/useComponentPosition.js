const componentPositions = {
    valve: { top: '18%', left: '19%' },
    pump: { top: '70%', left: '22%' },
    generator: { top: '50%', left: '75%' },
    flowrate: { top: '30%', left: '60%' },
    current: { top: '60%', left: '80%' },
  };
  
  export function useComponentPosition(name) {
    return componentPositions[name] || { top: '0%', left: '0%' };
  }
  