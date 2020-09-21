import React, {useState} from 'react';

/**
 * This component is a contact description editing interface.
 * Its props include -"contact" with the data of the selected contact,
 *                   -"save" - a function to pass the changed data to the parent component.
 */
export const SelectContact = ({contact, save}) => {

    /**
     * State initialization using a hook 'useState', stores contact data
     */
    const [state, setState] = useState(contact);
    /**
     * State for displaying information about saving the form
     */
    const [saveResult, setSaveResult] = useState('Save');

    /**
     * Field change handler in the form, saves changes in the component state
     */
    function handleChange(event) {
        let value = event.target.value;
        const arr = event.target.name.split('_');

        /**
         * This function recursively updates the nested properties of the object.
         * Its props include "currentObject" - the object in which to find and change the property,
         *                  "key" - the name of the property to be changed.
         */
        function deepUpdate(currentObject, key){
          if (arr.length === 0){
            currentObject[key] = value;
            return currentObject;
          }

          let new_key = arr.shift();
          let temp = currentObject[key];
          return {...currentObject, [key]:deepUpdate(temp, new_key)};
        }

        let key = arr.shift();
        let update_contact = deepUpdate(state, key);
        setState({...state, ...update_contact});
    }


    /**
     * Form save handler, saves data to localStorage, updates parent with 'save' function
     */
    function handleSubmit(event) {
       event.preventDefault();
       let contact_book = JSON.parse(localStorage.getItem('contact_book'));
       contact_book[state.id] = state;
       localStorage.setItem('contact_book', JSON.stringify(contact_book));
       setSaveResult('Saved!');
       save(state);
    }

    return (
        <form className='select_contact row' onSubmit={handleSubmit}>
            <div className="col-12 ava">
                <img src={state.avatar} className='avatar'
                     onError={(e) => {e.target.onerror = null;  e.target.src="avatar.jpg"}}
                     alt="Avatar" />
            </div>
            <div className="col-12">
                <div>
                    <label className="col-3" htmlFor="name">Name:</label>
                    <input className="col-8" onChange={ handleChange} type="text" name="name" id="name" value={state.name} required/>
                </div>
            </div>
            <div className="col-12">
                <label className="col-3" htmlFor="email">Email:</label>
                <input className="col-8" onChange={ handleChange} type="text" name="email" id="email" value={state.email} required/>
            </div>
            <div className="col-12">
                <label className="col-3" htmlFor="website">Website:</label>
                <input className="col-8" onChange={ handleChange} type="text" name="website" id="website" value={state.website} required/>
            </div>
            <div className="col-12">
                <label className="col-3" htmlFor="phone">Phone:</label>
                <input className="col-8" onChange={ handleChange} type="text" name="phone" id="phone" value={state.phone} required/>
            </div>
            <div className='col-12 company'>
                <h3>Company</h3>
                <p className='company_name'>
                    <label className="col-3" htmlFor="company_name">Name: </label>
                    <input className="col-8" onChange={ handleChange} type="text" name="company_name" value={state.company.name}/>
                </p>
                <p className='company_catchPhrase'>
                    <label className="col-3" htmlFor="company_catchPhrase">Catch Phrase</label>
                    <input className="col-8" onChange={ handleChange} type="text" name="company_catchPhrase" value={state.company.catchPhrase}/>
                </p>
                <p className='company_bs'>
                    <label htmlFor="company_bs"></label>
                    <input className="col-12" onChange={ handleChange} type="text" name="company_bs" value={state.company.bs}/>
                </p>
            </div>
            <div className='col-12 address'>
                <h3>Address</h3>
                <p className='company_state'>
                    <label className="col-3" htmlFor="address_state">State: </label>
                    <input className="col-8" onChange={ handleChange} type="text" name="address_state" value={state.address.state}/>
                </p>
                <p className='address_city'>
                    <label className="col-3" htmlFor="address_city">City: </label>
                    <input className="col-8" onChange={ handleChange} type="text" name="address_city" value={state.address.city}/>
                </p>
                <p className='company_country'>
                    <label className="col-3" htmlFor="address_country">Country: </label>
                    <input className="col-8" onChange={ handleChange} type="text" name="address_country" value={state.address.country}/>
                </p>
                <div className='address_street'>
                    <div>
                        <label className="col-3" htmlFor="address_streetA">streetA: </label>
                        <input className="col-8" onChange={ handleChange} type="text" name="address_streetA" value={state.address.streetA}/>
                    </div>
                    <div>
                        <label className="col-3" htmlFor="address_streetB">streetB: </label>
                        <input className="col-8" onChange={ handleChange} type="text" name="address_streetB" value={state.address.streetB}/>
                    </div>
                    <div>
                        <label className="col-3" htmlFor="address_streetC">streetC: </label>
                        <input className="col-8" onChange={ handleChange} type="text" name="address_streetC" value={state.address.streetC}/>
                    </div>
                    <div>
                        <label className="col-3" htmlFor="address_streetD">streetD: </label>
                        <input className="col-8" onChange={ handleChange} type="text" name="address_streetD" value={state.address.streetD}/>
                    </div>
                </div>
            </div>
            <button type="submit" className="save_form btn-success">{saveResult}</button>
        </form>

    );
};

