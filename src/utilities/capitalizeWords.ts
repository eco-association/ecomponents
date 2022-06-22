import _ from "lodash";

const capitalizeWords = (str: string) => {
  return _.startCase(_.lowerCase(str));
};

export default capitalizeWords;
