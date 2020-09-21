
import React, {Fragment, useState} from 'react';
import {OneContact} from "./OneContact";

/**
 * This component is a list of contacts. Its props only include "contacts".
 */
export const Contacts = ({contacts}) => {
    let groups;
    /**
     * State controls sorting direction
     */
    const [direction, setDirection] = useState('down');
    /**
     * State controls grouping
     */
    const [isGroups, setIsGroup] = useState(false);
    /**
     * State controls filtering by favorites
     */
    const [isFavorite, setIsFavorite] = useState(false);

    let localContactBookJson = localStorage.getItem('contact_book');
    let localContacts = JSON.parse(localContactBookJson);
    let propsContactsIds = contacts.map(contact => contact.id);
    let actualContacts = localContacts.filter(contact => propsContactsIds.includes(contact.id));
    if (isFavorite) actualContacts = actualContacts.filter(contact => contact.favorite);


    /**
     * This fragment groups contacts by the first letter
     */
    if(isGroups){
        groups = actualContacts.reduce((r, a) => {
          r[a.name[0]] = r[a.name[0]] || [];
          r[a.name[0]].push(a);
          return r;
        }, {});
    }
    contacts = actualContacts;

    function sortContact(a, b){
        if (direction === 'up'){
            return a.name > b.name ? -1 : 1;
        }
        else if (direction === 'down'){
            return a.name < b.name ? -1 : 1;
        }
    }

    return (
        <div id='contacts' className='col-12 justify-content-center '>
            <p><small>Total {contacts.length} contacts.</small></p>
            <div className="row justify-content-center panel_contacts">

                <div className='direction' onClick={() => direction === 'up' ? setDirection('down') : setDirection('up')}>
                    Sort: <i className={`fa fa-long-arrow-${direction}`} aria-hidden="true"></i>
                </div>
                <button type="button" className={`btn ${isGroups ? 'btn-success': 'btn-info'}`} onClick={() => setIsGroup(!isGroups) }>Group</button>
                <button type="button" className={`btn ${isFavorite ? 'btn-success': 'btn-info'}`}
                        onClick={() => setIsFavorite(!isFavorite)}>Favorite</button>
            </div>

            {contacts.length===0 && <p>The list is empty.</p>}

            {groups && <nav className='navbar_groups row'>
                        {Object.keys(groups).map(nameGroup => <a className='nav_group col' href={`#${nameGroup}`}>{nameGroup}</a>)}
                      </nav>
            }

            {groups ?
                 <Fragment>
                    {Object.entries(groups).map(([nameGroup, contacts]) =>
                        <Fragment key={'nameGroup_'+nameGroup}>
                            <p className='name_group' id={nameGroup} >{nameGroup}</p>
                            <Fragment>
                                {contacts.sort(sortContact).map((contact, ind) =>
                                    <Fragment key={contact.id}>
                                        <span className='number_contact'>{ind+1}</span>
                                        <OneContact contact={contact}  />
                                    </Fragment>
                                )}
                            </Fragment>
                        </Fragment>
                    )}
                </Fragment>

                : <Fragment>
                    {contacts.sort(sortContact).map((contact, ind) =>
                        <Fragment key={contact.id}>
                            <span className='number_contact'>{ind+1}</span>
                            <OneContact contact={contact}   />
                        </Fragment>
                    )}
                </Fragment>
            }
        </div>
    );
};