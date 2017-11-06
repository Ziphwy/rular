export default {
  type: 'distance',
  createOption() {
    return {
      direct: 'x',
      range: 0,
      tolerance: 10,
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
