import { Alert, AlertIcon } from "@chakra-ui/react";
import PropTypes from "prop-types";

interface AlertboxProps {
  message?: string;
}

const Alertbox: React.FC<AlertboxProps> = ({ message }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      {message || "There was an error processing your request"}
    </Alert>
  );
};

Alertbox.propTypes = {
  message: PropTypes.string,
};

export default Alertbox;
