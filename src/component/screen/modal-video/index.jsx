import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { Box } from "@material-ui/core";
ModalTrailer.propTypes = {
  trailer: PropTypes.string,
};
ModalTrailer.defaultProps = {
  trailer: null,
};

function ModalTrailer(props) {
  const { trailer, onHide } = props;
  return (
    <div>
      <Modal
        size="lg"
        {...props}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Box onClick={onHide} className="close">
            {" "}
            <img src="\img/close/closeFocus.png" alt="close" />
          </Box>
          <iframe
            width="100%"
            height="100%"
            src={trailer + `?autoplay=1`}
            title="s"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </Modal.Header>
      </Modal>
    </div>
  );
}

export default ModalTrailer;
