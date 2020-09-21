import React, {Fragment, useState} from "react";
import Modal from "./Modal";
import {SelectContact} from "./SelectContact";


/**
 * Component displays one contact and allows changing contact the property 'favorite'
 */
export const OneContact = ({contact:props_contact}) => {

    /**
     * State manages contact details
     */
    const [contact, setContact] = useState(props_contact);

    /**
     * The state controls the display of the modal window from the interfaces for changing the contact description
     */
    const [select_contact, setSelectContact] = useState(false);

    /**
     * This function changing contact the property 'favorite' and save contact in localStorage
     */
    function toggleFavorite() {
        let localContactBook = localStorage.getItem('contact_book');
        let new_contacts = JSON.parse(localContactBook);
        new_contacts[contact.id].favorite = !new_contacts[contact.id].favorite;
        localStorage.setItem('contact_book', JSON.stringify(new_contacts));
        setContact(new_contacts[contact.id]);
    }

    return(
        <Fragment>
            <div className='one_contact '  >
                <div className="row align-items-center">
                    <div className="col-sm-auto col-3 m-0 p-0 row align-items-center" >
                        <div className="order-2 order-sm-1">
                            <span><i onClick={()=> toggleFavorite()} className={`fa fa-star${contact.favorite ? '' : '-o'}`} aria-hidden="true"></i></span>
                            <i className="fa fa-2 fa-pencil-square" onClick={() => setSelectContact(contact)} aria-hidden="true"></i>
                        </div>

                        <img src={contact.avatar}
                             onClick={() => setSelectContact(contact)}
                             className='avatar order-1 order-sm-2'
                             onError={(e) => {e.target.onerror = null;  e.target.src="avatar.jpg"}}
                             alt="Avatar" />
                    </div>
                    <div className="col-9 m-0 p-0  row align-items-center justify-content-start" onClick={() => setSelectContact(contact)}>
                        <div className="col-md-4 col-sm-3 col-12">{contact.name}</div>
                        <div className="col-md-5 col-sm-6 col-12 text_ellipsis">{contact.email}</div>
                        <div className="col-md-3 col-sm-6 col-12">{contact.phone}</div>
                    </div>

                </div>

            </div>

            {select_contact &&
                <Modal>
                    <div className="modal_background">
                        <div className="modal_body">
                            <SelectContact contact={contact} save={setContact}/>
                            <div className="fa fa-times"
                             onClick={() => setSelectContact(false)}></div>
                        </div>
                    </div>
                </Modal>
            }
        </Fragment>
    )
};