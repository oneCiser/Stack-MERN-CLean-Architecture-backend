export default function format(errors: any) {
  try {
    return errors
      .map((error: any) => Object.values(error?.constraints).toString())
      .toString();
  } catch (error) {
    return errors;
  }
}
