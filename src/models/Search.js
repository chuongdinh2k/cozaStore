import React, { useState } from 'react';
import './SearchModel.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { modalState$ } from '../redux/selector';
import { showQickView } from '../redux/actions';
import {useSelector,useDispatch} from 'react-redux';
const Search = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const modalState = useSelector(modalState$);
  console.log(modalState);
  const toggle = () => dispatch(showQickView());
  

  return (
    <div className="Search">
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modalState.isShowQickView} toggle={toggle} className="CartModel">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            
          </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Search;