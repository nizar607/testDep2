
import React from 'react';
import { Modal, Button } from 'react-bootstrap';



function DeletePlayerModal(props) {
    return (
        <Modal>
            <Modal.Header>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this player?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">
                    No
                </Button>
                <Button variant="primary">
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletePlayerModal;