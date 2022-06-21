import _ from "lodash";

const capitalizeWords = (str) => {
  return _.startCase(_.lowerCase(str));
};

export default capitalizeWords;
