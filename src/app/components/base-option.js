export default {
  type: 'base',
  createOption() {
    return {
      mode: 'hex',
      base: 0,
      rfs: 12,
      dpr: 3,
      unit: 'px',
    };
  },

  createOptionConfig({ mode, base, rfs, dpr, unit }) {
    return {
      type: 'base',
      icon: 'set',
      attr: {
        mode: {
          type: 'select',
          group: ['rgb', 'hex'],
          value: mode,
        },
        base: {
          type: 'number',
          value: base,
        },
        rfs: {
          type: 'number',
          value: rfs,
        },
        dpr: {
          type: 'number',
          value: dpr,
        },
        unit: {
          type: 'select',
          group: ['px', 'dp', 'rem'],
          value: unit,
        },
      },
    };
  },
};

