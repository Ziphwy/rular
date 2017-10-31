export default {
  type: 'size',
  createOption() {
    return {
      tolerance: 0,
    };
  },
  createOptionConfig({ tolerance }) {
    return {
      type: 'size',
      icon: 'size',
      attr: {
        tolerance: {
          type: 'number',
          value: tolerance,
        },
      },
    };
  },
};

