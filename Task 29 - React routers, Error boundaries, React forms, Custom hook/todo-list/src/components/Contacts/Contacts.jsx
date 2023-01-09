import c from './Contacts.module.css';

const Contacts = (props) => {
    return (
        <div className={c.contacts}>
            <ul className={c.contact_list}>
                <li className={c.contact_list_item}>Contact 1</li>
                <li className={c.contact_list_item}>Contact 2</li>
                <li className={c.contact_list_item}>Contact 3</li>
                <li className={c.contact_list_item}>Contact 4</li>
                <li className={c.contact_list_item}>Contact 5</li>
            </ul>
        </div>
    )
}

export default Contacts;