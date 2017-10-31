export default {
  type: 'distance',
  createOption() {
    return {
      direct: 'x',
      range: 2,
      tolerance: 0,
    };
  },
  createOptionConfig({ direct, range, tolerance }) {
    return {
      type: 'distance',
      icon: 'distance',
      attr: {
        direct: {
          type: 'select',
          group: ['x', 'y'],
          value: direct,
        },
        range: {
          type: 'number',
          value: range,
        },
        tolerance: {
          type: 'number',
          value: tolerance,
        },
      },
    };
  },
};
