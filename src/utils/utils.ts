// function that return the state of a validation

export default class Utils {
  static jsonValidationHandler(state: boolean, message: any) {
    const json = {
      success: state,
      message,
    };
    return json;
  }
}
