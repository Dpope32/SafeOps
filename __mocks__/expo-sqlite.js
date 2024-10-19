export const openDatabase = jest.fn(() => ({
  transaction: jest.fn((callback) => {
    const tx = {
      executeSql: jest.fn((query, params, successCallback) => {
        successCallback();
      }),
    };
    callback(tx);
  }),
}));
