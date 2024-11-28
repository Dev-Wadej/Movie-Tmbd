type CustomError = {
  data: {
    error: {
      location: string;
      msg: string;
      path: string;
    }[];
    message: string;
  };
};

const handleResponseError = (error: CustomError) => {
  if (error && error.data) {
    const { error: errors, message } = error.data;

    if (message) {
      console.error(message);
      return;
    }

    if (typeof errors === "string") {
      console.error(message);

      return;
    }

    errors.forEach((error) => {
      console.error(error);
    });
  } else {
    console.log(error);
  }
};

export default handleResponseError;
