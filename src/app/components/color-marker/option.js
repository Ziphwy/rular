export default {
  type: 'color',
  createOption() {
    return {
      bgColor: '',
    };
  },
  createOptionConfig({ bgColor }) {
    return {
      type: 'color',
      icon: 'color',
      attr: {
        bgColor: {
          type: 'text',
          value: bgColor,
        },
      },
    };
  },
};
