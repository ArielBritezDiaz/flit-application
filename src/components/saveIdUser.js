import React, { useState, createContext, useContext } from 'react';

const shareContext = createContext(null);

export default saveIdUser = (id_user) => {
    console.log("id_user from saveIdUser component", id_user)
    const [id_user_save, setId_User] = useState(0)
    setId_User(id_user)

    const sharedData = useContext(id_user_save)

    return (
        <shareContext.Provider value={id_user_save}>
        </shareContext.Provider>
    )

    function sendDataBetweenSections() {
        const sharedData = useContext(id_user_save);
        return (
            sharedData.isClicked && <div>it is clicked</div>
        )
    }
}